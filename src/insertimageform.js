import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ClickObserver from '@ckeditor/ckeditor5-engine/src/view/observer/clickobserver';
import ContextualBalloon from '@ckeditor/ckeditor5-ui/src/panel/balloon/contextualballoon';

import clickOutsideHandler from '@ckeditor/ckeditor5-ui/src/bindings/clickoutsidehandler';

import InsertImageFormView from './ui/insertimageformview';

import { getSelectedImageWidget, isImageWidget } from '@ckeditor/ckeditor5-image/src/image/utils';

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
        
        this.formView = new InsertImageFormView( editor.locale );
    }

    static get requires() {
        return [ ContextualBalloon ];
    }

    static get pluginName() {
        return 'InsertImageForm';
    }

    init() {
       const editor = this.editor;

        editor.editing.view.addObserver( ClickObserver );

        this._initUserInteractionsFromFormView();

        this._balloon = editor.plugins.get( ContextualBalloon );

        this._initUserInteractionsFromEditor();
    }

    /**
     * Init user interaction when form view is focused.
     * Do only once on the action form init.
     */
    _initUserInteractionsFromFormView() {
        // Hide the panel after clicking the "Save" button.
        this.listenTo( this.formView, 'submit', () => {
            this._hideUI();//_closeFormView();
        } );

        // Hide the panel after clicking the "Cancel" button.
        this.listenTo( this.formView, 'cancel', () => {
            this._hideUI();
        } );

        // Close the panel on esc key press when the **form has focus**.
        this.formView.keystrokes.set( 'Esc', ( data, cancel ) => {
            this._hideUI();
        } );
    }

    /**
     * Init user interaction on form view and the balloon from outside.
     * Do only once on the action form init.
     */
    _initUserInteractionsFromEditor() {
        // Close the panel on the Esc key press when the editable has focus and the balloon is visible.
        this.editor.keystrokes.set( 'Esc', ( data, cancel ) => {
            if ( this._isFormVisible ) {
                this._hideUI();
            }
        } );

        // Close on click outside of balloon panel element.
        clickOutsideHandler( {
            emitter: this.formView,
            activator: () => this._isFormInBalloon,
            contextElements: [ this._balloon.view.element ],
            callback: () => this._hideUI()
        } );
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
            this.formView.urlInputView.select(); // TODO or focus ?
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
            this.formView.saveButtonView.focus();

            this._balloon.remove( this.formView );

            // Because the form has an input which has focus, the focus must be brought back
            // to the editor. Otherwise, it would be lost.
            this.editor.editing.view.focus();
        }
    }

    /**
     * Call from outside when the balloon and the form view need to be show.
     * Check if the action can be done, and eventualy show the form.
     */
    showUI() {
        if ( !this._getSelectedImageWidgetElement() ) {
            // New start
            this.formView.resetValues();

            this._addFormView();
        }
    }

    /**
     * Call when the balloon and the form view need to be hide.
     * Check if the action can be done, and eventualy hide the form.
     */
    _hideUI() {
        if ( !this._isFormInBalloon ) {
            return;
        }

        // Make sure the focus always gets back to the editable _before_ removing the focused form view.
        // Doing otherwise causes issues in some browsers.
        // See https://github.com/ckeditor/ckeditor5-link/issues/193.
        this.editor.editing.view.focus();

        // Remove form because it's on top of the stack.
        this._removeFormView();
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

    /**
     * Returns an image widget editing view element 
     * if one is selected in the editor.
     */
    _getSelectedImageWidgetElement() {
        return getSelectedImageWidget(
            this.editor.editing.view.document.selection
        );
    }
}