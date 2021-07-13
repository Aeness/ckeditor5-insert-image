import { Command } from 'ckeditor5/src/core';
import { logWarning } from 'ckeditor5/src/utils';

export default class OnlyInsertImageCommand extends Command {

	/**
	 * @inheritDoc
	 */
	constructor( editor ) {
        super(editor);
        if ( !editor.plugins.has( 'ImageUtils' ) ) {
            logWarning( 'image-utils-plugin-required' );
        }
		this.set( 'isImageSelected', false );

    }

	/**
	 * @inheritDoc
	 */
	refresh() {
        const selectedElement = this.editor.model.document.selection.getSelectedElement();
        const imageUtils = this.editor.plugins.get( 'ImageUtils' );
		this.isEnabled = imageUtils.isImageAllowed( this.editor.model ) || imageUtils.isImage( selectedElement );
		this.isImageSelected = imageUtils.isImage( selectedElement );
	}

	/**
	 * Executes the command.
	 *
	 * @fires execute
	 * @param {Object} options Options for the executed command.
	 * @param {String|Array.<String>} options.source The image source to insert.
	 */
	execute( options ) {
		const model = this.editor.model;
        const selectedElement = model.document.selection.getSelectedElement();
        const imageUtils = this.editor.plugins.get( 'ImageUtils' );

        this.editor.editing.view.focus();

        // OnlyInsertImageCommand can't have an array of images...
        const src = options.source;
        if ( this.isEnabled ) {
            if ( imageUtils.isImage( selectedElement ) ) {
                this.updateImage( src, selectedElement )
            } else {
                const selectionAttributes = Object.fromEntries( model.document.selection.getAttributes() );
                imageUtils.insertImage( { src, ...selectionAttributes }, model.document.selection);
            }
        }
    }

    updateImage( url, selectedElement ) {
        this.editor.model.change( writer => {
            writer.setAttribute( 'src', url, selectedElement );
            writer.removeAttribute( 'srcset', selectedElement );
            writer.removeAttribute( 'sizes', selectedElement );
        } );
    }

}

