import { Plugin } from 'ckeditor5/src/core';

import { ButtonView } from 'ckeditor5/src/ui';

import { icons } from 'ckeditor5/src/core';

import { clickOutsideHandler } from 'ckeditor5/src/ui';

import OnlyInsertImageCommand from './onlyinsertimagecommand';

import OnlyInsertImageForm from './onlyinsertimageform';

import { createFakeVisualSelection, renderFakeVisualSelection } from './utils';

export default class OnlyInsertImage extends Plugin {
    // Call before SubPlugin init
    constructor( editor ) {
        super( editor );

        // @aeness/InsertImage has its own commande
        this._command = new OnlyInsertImageCommand( editor );

        // ImageEditing uses 'imageInsert' to save the command (it not the same but very close...)
        editor.commands.add( 'imageinsert', this._command );
    }

    /**
     * destroy() is calling after destroy on SubPlugin
     * and call stopListening (backbone)
     */

    static get requires() {
        return [ OnlyInsertImageForm ];
    }

    static get pluginName() {
        // Official ImageInsert use 'ImageInsert'
        return 'OnlyInsertImage';
    }

    // Call after SubPlugin init
    init() {
        // TODO : make sure that ImageEditing.init() allow attributes 'src', 'srcset'
        // and init conversion downcast and upcast
        const editor = this.editor;
        const t = editor.t;

        this._form = editor.plugins.get( OnlyInsertImageForm );

        const componentFactoryFunction = locale => {
            const button = new ButtonView( locale );

            button.set( {
                // Translation in official image plugin
                label: t ('Insert image'),
                icon: icons.image,
                tooltip: true,
                isEnabled: true
            } );

            // Show the panel on button click.
            // this listen to 'excute" on button (backbone)
            this.listenTo( button, 'execute', () => {
                createFakeVisualSelection(this.editor.model);
                this._form.swapUI()
            });

            // Active the button when images are allowed
            button.bind( 'isEnabled' ).to( this._command, 'isEnabled' );
            button.bind( 'isOn' ).to( this._command, 'isImageSelected' );
            button.listenTo( this._command, 'change:isImageSelected', () => {
                if (this._command.isImageSelected) {
                    button.label = t( 'Update image URL' );
                } else {
                    button.label = t ('Insert image');
                }
            } );

            // Init interaction when button.element and form.element exists
            this.listenTo( button, 'render', () => {
                this.listenTo( this._form.formView, 'render', () => {
                    this._initUserInteractionsFromEditor(button);
                });
            });

            renderFakeVisualSelection(editor)

            return button;
        }

        // Create CkEditor toolbar buttons
        editor.ui.componentFactory.add( 'onlyInsertImage', componentFactoryFunction );
    }

    /**
     * Init user interaction on the form from outside of the form.
     * Do only once on the init, this interactions are always
     * enable, never disable.
     */
    _initUserInteractionsFromEditor(button) {
        // Close the panel on the Esc key press when the editable has focus and the balloon is visible.
        // TODO : stop interaction/listen when the form is not active ?
        this.editor.keystrokes.set( 'Esc', ( /* data, cancel */ ) => {
            if ( this.isActiveView ) {
                this.hideUI();
            }
        } );

        // Close on click outside of the form and the menu button.
        // TODO : stop interaction/listen when the form is not active ?
        // TODO : change the emitter
        // TODO : replace clickOutsideHandler with a methode that has View parameter instead of View.element
        // so you don't need to listenTo render before
        clickOutsideHandler( {
            emitter: this._form.formView, // Must be a view
            activator: () => this._form.isActiveView,
            contextElements: [ this._form.viewElement, button.element ],
            callback: () => this._form.hideUI()
        } );
    }
}
