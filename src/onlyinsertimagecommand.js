import { Command } from 'ckeditor5/src/core';
import { insertImage, isImageAllowed, isImage } from '@ckeditor/ckeditor5-image/src/image/utils';
import toArray from '@ckeditor/ckeditor5-utils/src/toarray';

export default class OnlyInsertImageCommand extends Command {

	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
        super(editor);
		this.set( 'Selected', false );

    }

	/**
	 * @inheritDoc
	 */
	refresh() {
        const selectedElement = this.editor.model.document.selection.getSelectedElement();
		this.isEnabled = isImageAllowed( this.editor.model ) || isImage( selectedElement );
		this.isImageSelected = isImage( selectedElement );
	}

	/**
	 * Executes the command.
	 *
	 * @fires execute
	 * @param {Object} options Options for the executed command.
	 * @param {String|Array.<String>} options.source The image source or an array of image sources to insert.
	 */
	execute( options ) {
		const model = this.editor.model;
        const selectedElement = model.document.selection.getSelectedElement();
        this.editor.editing.view.focus();
		for ( const src of toArray( options.source ) ) {
            if ( this.isEnabled ) {
                if ( isImage( selectedElement ) ) {
                    updateImage( model, src, selectedElement )
                } else {
                    insertImage( model, { src }, model.document.selection);
                }
            }
		}
	}
}


function updateImage( model, url, selectedElement ) {
	model.change( writer => {
        writer.setAttribute( 'src', url, selectedElement );
        writer.removeAttribute( 'srcset', selectedElement );
        writer.removeAttribute( 'sizes', selectedElement );
	} );
}