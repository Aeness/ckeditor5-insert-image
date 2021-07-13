// The editor creator to use.
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';

import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize.js';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js';
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';


// For testing translation
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';

// For testing balloon
import Link from '@ckeditor/ckeditor5-link/src/link';

// For testing link on Image
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';

import OnlyInsertImage from '../../../src/onlyinsertimage';

export default class BalloonEditor extends BalloonEditorBase {}

// Plugins to include in the build.

BalloonEditor.builtinPlugins = [
    BlockToolbar,
    Essentials,
    Bold,
	Image,
    OnlyInsertImage,
	ImageResize,
	ImageStyle,
	ImageToolbar,
    AutoImage,
    LinkImage,
	Link,
    Paragraph
];

// Editor configuration.
BalloonEditor.defaultConfig = {
	blockToolbar: [ 'bold', '|', 'link', '|', 'onlyInsertImage' ],
	toolbar: {
        items: [ 'bold', '|', 'link', '|', 'onlyInsertImage' ]
    },
	image: {
		toolbar: [
            'imageStyle:inline',
            '|',
			'imageStyle:alignLeft',
			'imageStyle:block',
			'imageStyle:alignRight',
            '|',
            'linkImage',
            '|', 'onlyInsertImage'
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