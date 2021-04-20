export const VISUAL_SELECTION_MARKER_NAME = 'aeness-insert-image';

/**
 * Create a fake visual selection when the contextual balloon is displayed.
 *
 * This adds a 'aeness-insert-image' marker into the document that is rendered as a highlight on selected text fragment.
 */
export function  createFakeVisualSelection(model) {
    model.change( writer => {
        const range = model.document.selection.getFirstRange();

        if ( model.markers.has( VISUAL_SELECTION_MARKER_NAME ) ) {
            writer.updateMarker( VISUAL_SELECTION_MARKER_NAME, { range } );
        } else {
            writer.addMarker( VISUAL_SELECTION_MARKER_NAME, {
                usingOperation: false,
                affectsData: false,
                range
            } );
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
            classes: [ 'ck-fake-insert-image-aeness-selection' ]
        }
    } );

    // Renders a fake visual selection marker on a collapsed selection.
    editor.conversion.for( 'editingDowncast' ).markerToElement( {
        model: VISUAL_SELECTION_MARKER_NAME,
        view: {
            name: 'span',
            classes: [ 'ck-fake-insert-image-aeness-selection', 'ck-fake-insert-image-aeness-selection_collapsed' ]
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