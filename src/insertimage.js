import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

import InsertImageForm from './insertimageform';

export default class InsertImage extends Plugin {
    // Call before SubPlugin init
    constructor( editor ) {
        super( editor );
    }

    static get requires() {
        return [ InsertImageForm ];
    }

    static get pluginName() {
        return 'InsertImage';
    }

    // Call after SubPlugin init
    init() {
        console.log('InsertImage init');
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

            return button;
        } );
    }
}
