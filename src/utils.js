export const VISUAL_SELECTION_MARKER_NAME = 'only-insert-image';

/**
 * Create a fake visual selection when the contextual balloon is displayed.
 *
 * This adds a 'only-insert-image' marker into the document that is rendered as a highlight on selected text fragment.
 */
export function  createFakeVisualSelection(model) {
    model.change( writer => {
        const range = model.document.selection.getFirstRange();

        // Markers in empty elements (range.start.isAtEnd == true)
        // can cause unexpected errors
        // https://github.com/ckeditor/ckeditor5/issues/8092

        if ( model.markers.has( VISUAL_SELECTION_MARKER_NAME ) ) {
            // markers should not exist.
            if ( range.start.isAtEnd ) {
                console.log("updateMarker range.start.isAtEnd")
                const startPosition = range.start.getLastMatchingPosition(
                    ( { item } ) => !model.schema.isContent( item ),
                    { boundaries: range }
                );

                writer.updateMarker( VISUAL_SELECTION_MARKER_NAME, {
                    range: writer.createRange( startPosition, range.end )
                } );
            } else {
                console.log("updateMarker other")
                writer.updateMarker( VISUAL_SELECTION_MARKER_NAME, { range } );
            }
        } else {
            if ( range.start.isAtEnd ) {
                console.log("addMarker range.start.isAtEnd")
                const startPosition = range.start.getLastMatchingPosition(
                    ( { item } ) => !model.schema.isContent( item ),
                    { boundaries: range }
                );

                writer.addMarker( VISUAL_SELECTION_MARKER_NAME, {
                    usingOperation: false,
                    affectsData: false,
                    range: writer.createRange( startPosition, range.end )
                } );
            } else {
                writer.addMarker( VISUAL_SELECTION_MARKER_NAME, {
                    usingOperation: false,
                    affectsData: false,
                    range
                } );
            }
        }
    } );
}

/**
 * Render the fake visual selection created in {@link #createFakeVisualSelection}.
 */
export function renderFakeVisualSelection(editor) {
    // Renders a fake visual selection marker on an expanded selection.
    editor.conversion.for( 'editingDowncast' ).markerToHighlight( {
        model: VISUAL_SELECTION_MARKER_NAME,
        view: {
            classes: [ 'ck-fake-only-insert-image-selection' ]
        }
    } );

    // Renders a fake visual selection marker on a collapsed selection.
    editor.conversion.for( 'editingDowncast' ).markerToElement( {
        model: VISUAL_SELECTION_MARKER_NAME,
        view: {
            name: 'span',
            classes: [ 'ck-fake-only-insert-image-selection', 'ck-fake-only-insert-image-selection_collapsed' ]
        }
    } );
}


/**
 * Hides the fake visual selection created in {@link #createFakeVisualSelection}.
 */
export function hideFakeVisualSelection(model) {

    if ( model.markers.has( VISUAL_SELECTION_MARKER_NAME ) ) {
        model.change( writer => {
            writer.removeMarker( VISUAL_SELECTION_MARKER_NAME );
        } );
    }
}