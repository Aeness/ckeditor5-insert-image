import InsertImageCommand from '@ckeditor/ckeditor5-image/src/image/insertimagecommand';
import { insertImage } from '@ckeditor/ckeditor5-image/src/image/utils';
import toArray from '@ckeditor/ckeditor5-utils/src/toarray';

export default class InsertImageAenessCommand extends InsertImageCommand {

	/**
	 * Executes the command.
	 *
	 * @fires execute
	 * @param {Object} options Options for the executed command.
	 * @param {String|Array.<String>} options.source The image source or an array of image sources to insert.
	 */
	execute( options ) {
		const model = this.editor.model;
        this.editor.editing.view.focus();
		for ( const src of toArray( options.source ) ) {
            if ( this.isEnabled ) {
                insertImage( model, { src }, this.editor.model.document.selection);
            }
		}
	}
}