import { Plugin } from 'ckeditor5/src/core';
import { ClickObserver } from 'ckeditor5/src/engine';
import { ContextualBalloon } from 'ckeditor5/src/ui';

import OnlyInsertImageFormView from './ui/onlyinsertimageformview';

import { hideFakeVisualSelection } from './utils';

/**
 * Use the "main" stack of the ContextualBalloon with only one view (added and removed by this
 * action form).
 */
export default class InsertImageForm extends Plugin {

    /**
     * Create the action form (Plugin) and the form view.
     */
    constructor( editor ) {
        super( editor );

        this.set( 'isActiveView', false );

        this.formView = new OnlyInsertImageFormView( editor.locale );
    }

    static get requires() {
        return [ ContextualBalloon ];
    }

    static get pluginName() {
        return 'InsertImageForm';
    }

    get viewElement() {
        return this.formView.element;
    }

    init() {
       const editor = this.editor;

        editor.editing.view.addObserver( ClickObserver );

        this._initUserInteractionsFromFormView(editor);

        this._balloon = editor.plugins.get( ContextualBalloon );
    }

    /**
     * Init user interaction when form view is focused.
     * Do only once on the action form init.
     */
    _initUserInteractionsFromFormView(editor) {
        // Excute the command and hide the panel after clicking the "Save" button.
        this.listenTo( this.formView, 'submit', () => {
            if ( 0 != this.formView.urlInputView.fieldView.element.value != null && this.formView.urlInputView.fieldView.element.value.trim().length ) {
                editor.execute(
                    'imageinsert',
                    { source: this.formView.urlInputView.fieldView.element.value }
                );
                this.hideUI();
            }
        } );

        // Hide the panel after clicking the "Cancel" button.
        this.listenTo( this.formView, 'cancel', () => {
            this.hideUI();
        } );

        // Close the panel on esc key press when the **form has focus**.
        this.formView.keystrokes.set( 'Esc', ( /* data, cancel */ ) => {
            this.hideUI();
        } );
    }

    /**
     * Calling after destroy on SubPlugin
     */
    destroy() {
        // call stopListening (backbone)
        super.destroy();

        // Destroy created UI components as they are not automatically destroyed (see ckeditor5#1341).
        // Destroy main View and its children
        this.formView.destroy();
    }

    /**
     * Add form view to the balloon context.
     */
    _addFormView() {
        if ( this._isFormInBalloon ) {
            return;
        }

        // Adds a new view to the stack (here 'main')
        // and makes it visible if the current stack (here 'main') is visible
        this._balloon.add( {
            view: this.formView,
            position: this._getBalloonPositionData()
        } );

        // Select input when form view is currently visible
        // (here if the current stack is main).
        if ( this._balloon.visibleView === this.formView ) {
            this.formView.urlInputView.fieldView.select();
        }
        // What happen with two stacks ??
    }

    /**
     * Remove form view to the balloon context.
     */
    _removeFormView() {
        if ( this._isFormInBalloon ) {
            // Blur the input element before removing it from DOM to prevent issues in some browsers.
            // See https://github.com/ckeditor/ckeditor5/issues/1501.
            // TODO : use this.formView._focusTracker instead ?
            this.formView.saveButtonView.focus();

            this._balloon.remove( this.formView );

            // Because the form has an input which has focus, the focus must be brought back
            // to the editor. Otherwise, it would be lost.
            this.editor.editing.view.focus();

			hideFakeVisualSelection(this.editor.model);
        }
    }

    /**
     * Call when the balloon and the form view need to be show.
     * Check if the action can be done, and eventualy show the form.
     */
    _showUI() {

        if ( !this.editor.plugins.get( 'ImageUtils' ).isImage(this.editor.model.document.selection.getSelectedElement()) ) {
            // New start
            this.formView.resetFormForInsert();
        } else {
            // New start
            const selectedElement = this.editor.model.document.selection.getSelectedElement();
            this.formView.resetFormForUpdate(selectedElement.getAttribute( 'src' ));
        }

        this._addFormView();
        this.isActiveView = true;
    }

    /**
     * Call when the balloon and the form view need to be hide.
     * Check if the action can be done, and eventualy hide the form.
     */
    hideUI() {
        if ( !this._isFormInBalloon ) {
            return;
        }

        // Make sure the focus always gets back to the editable _before_ removing the focused form view.
        // Doing otherwise causes issues in some browsers.
        // See https://github.com/ckeditor/ckeditor5-link/issues/193.
        // TODO : why we are doing this twice (with _removeFormView) ?
        this.editor.editing.view.focus();

        // Remove form because it's on top of the stack.
        this._removeFormView();

        this.isActiveView = false;
    }

    /**
     * Call from outside when the other only want to switch between show and hide.
     */
    swapUI() {
        if ( this.isActiveView ) {
            this.hideUI();
        } else {
            this._showUI();
        }
    }

    /**
     * Returns `true` when form view is in the balloon.
     */
    get _isFormInBalloon() {
        return this._balloon.hasView( this.formView );
    }

    /**
     * Returns `true` when form view is visible.
     */
    get _isFormVisible() {
        const visibleView = this._balloon.visibleView;

        return visibleView == this.formView;
    }

    /**
     * Returns the position for the balloon
     * (when the selection is not an image)
     * Do not use getBalloonPositionData from image\ui\utils.
     */
    _getBalloonPositionData() {
        const view = this.editor.editing.view;
        const viewDocument = view.document;

        const target = view.domConverter.viewRangeToDom( viewDocument.selection.getFirstRange() );

        return { target };
    }
}