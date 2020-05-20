// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize.js';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';

// For testing translation
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';

// For testing balloon
import Link from '@ckeditor/ckeditor5-link/src/link';

import InsertImage from '../../src/insertimage';

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
    Essentials,
    Bold,
	Image,
    InsertImage,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	Link,
    Paragraph
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
        items: [ 'bold', '|', 'link', '|', 'insertImage' ]
    },
	image: {
		toolbar: [
			'imageStyle:alignLeft',
			'imageStyle:full',
			'imageStyle:alignRight'
		],
		styles: [
			// This option is equal to a situation where no style is applied.
			'full',

			// This represents an image aligned to the left.
			'alignLeft',

			// This represents an image aligned to the right.
			'alignRight'
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'fr'
};
