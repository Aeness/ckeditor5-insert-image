import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

import clickOutsideHandler from '@ckeditor/ckeditor5-ui/src/bindings/clickoutsidehandler';

import InsertImageAenessCommand from './insertimagecommand';

import InsertImageForm from './insertimageform';

import { createFakeVisualSelection, renderFakeVisualSelection } from './utils';

export default class InsertImage extends Plugin {
    // Call before SubPlugin init
    constructor( editor ) {
        super( editor );

        this._command = new InsertImageAenessCommand( editor );

        // Add the ImageInsertCommand to the editor
        // Is not the same name than Image Plugin (ImageInsert)
        // ImageEditing use 'imageInsert' to save the command (it not the same but very close...)
        editor.commands.add( 'imageinsert', this._command );
    }

    /**
     * destroy() is calling after destroy on SubPlugin
     * and call stopListening (backbone)
     */

    static get requires() {
        return [ InsertImageForm ];
    }

    static get pluginName() {
        return 'InsertImage';
    }

    // Call after SubPlugin init
    init() {
        // TODO : make sure that ImageEditing.init() allow attributes 'src', 'srcset'
        // and init conversion downcast and upcast
        const editor = this.editor;
        const t = editor.t;

        this._form = editor.plugins.get( InsertImageForm );

        // Create CkEditor toolbar buttons.
        // ImageInsertUI use 'imageInsert'
        editor.ui.componentFactory.add( 'insertImage', locale => {
            const button = new ButtonView( locale );

            button.set( {
                // Translation in official image plugin
                label: t ('Insert image'),
                icon: imageIcon,
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

            // Init interaction when button.element and form.element exists
            this.listenTo( button, 'render', () => {
                this.listenTo( this._form.formView, 'render', () => {
                    this._initUserInteractionsFromEditor(button);
                });
            });

            renderFakeVisualSelection(editor)

            return button;
        } );
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