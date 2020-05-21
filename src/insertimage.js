import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

import ImageInsertCommand from '@ckeditor/ckeditor5-image/src/image/imageinsertcommand';

import InsertImageForm from './insertimageform';

export default class InsertImage extends Plugin {
    // Call before SubPlugin init
    constructor( editor ) {
        super( editor );

        this._command = new ImageInsertCommand( editor );

        // Add the ImageInsertCommand to the editor
        // Is not the same name than Image Plugin (ImageInsert)
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
            this.listenTo( button, 'execute', () => this._form.showUI( true ) );

            // Active the button when images are allowed
            button.bind( 'isEnabled' ).to( this._command, 'isEnabled' );

            return button;
        } );
    }
}
