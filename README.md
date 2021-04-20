# Aeness / ckeditor5-insert-image
This package implements a image feature for CKEditor 5 V24.0.0. It allows the user to insert images with http/https url.

Since the v22.0.0, CKEditor has its own feature "ImageInsert" for inserting image via URL.
But the feature needs ImageUpload to work properly.

Aeness / ckeditor5-insert-image doed not need ImageUpload and can works with AutoImage.

## Test it

Run (or [Download it](https://github.com/Aeness/ckeditor5-build/archive/refs/tags/v24.0.0.zip) **and unzip**)
```
git clone --depth 1 --branch v24.0.0 https://github.com/Aeness/ckeditor5-build.git
```

 and open ckeditor5-build\sample\index.html (french) or ckeditor5-build\sample\index_en.html in a browser.


##  CKEditor 5

CKEditor 5 is an open source rich text editors : https://github.com/ckeditor/ckeditor5.

##  ckeditor5-insert-image

It is a feature for CKEditor 5, that allow the user to insert images with http/https url.

It is available with :
- [Classic editor](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/overview.html#classic-editor)

CKEditor 5 does not allow to add plugins/features to CKEditor 5 build (https://github.com/ckeditor/ckeditor5/issues/667).
You have to build your own editor with the plugin/feature ckeditor5-insert-image.

### Complete example - Adding a plugin to a build - Customize (bundled) editor build

You can see the official doc [here](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/installing-plugins.html#adding-a-plugin-to-a-build).

Clone and install the build repository
```
git clone -b v24.0.0 https://github.com/ckeditor/ckeditor5
cd ckeditor5/packages/ckeditor5-build-classic
npm install
```

Install the plugin package 'ckeditor5-insert-image' :
```
npm install --save-dev @aeness/ckeditor5-insert-image@24.0.0
```

Edit the src/ckeditor.js file to replace ImageUpload by InsertImage.

```JavaScript
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
// remove import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';

// Add InsertImage
import InsertImage from '@aeness/ckeditor5-insert-image/src/insertimage';

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	CKFinder,
	EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	InsertImage, // replace ImageUpload
	Indent,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	TextTransformation
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'|',
			'indent',
			'outdent',
			'|',
			'insertImage', // Replace 'imageUpload',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'undo',
			'redo'
		]
	},
	image: {
		toolbar: [
			'imageStyle:full',
			'imageStyle:side',
			'|',
			'imageTextAlternative'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};
```

Build the new editor.
```
npm run build
```

Open sample\index.html in a browser to see the result.

### Complete exemple - Adding a plugin to an editor (from source)

You can see :
- the official doc that show you how to [initialize CKEditor 5 rich-text editor from source](https://ckeditor.com/docs/ckeditor5/latest/framework/guides/quick-start.html)
- the official doc that show you how to [add a plugin to a editor from source](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/installing-plugins.html#adding-a-plugin-to-an-editor).

Create the project, run
```
npm init
```
with default argument except for license : 'GPL-2.0-or-later'

Prepare the build project.
```
npm install --save postcss-loader@3 raw-loader@3 style-loader@1 webpack@4 webpack-cli@3
```

Change package.json to have
```
  "scripts": {
    "build": "webpack --mode development"
  },
```

Add the minimale configuration
```
npm install --save @ckeditor/ckeditor5-dev-utils @ckeditor/ckeditor5-editor-classic@24.0.0 @ckeditor/ckeditor5-essentials@24.0.0 @ckeditor/ckeditor5-paragraph@24.0.0 @ckeditor/ckeditor5-theme-lark@24.0.0
```

Install the plugin package 'ckeditor5-insert-image' :
```
npm install --save @aeness/ckeditor5-insert-image@24.0.0
```

Add the file webpack.config.js
```JavaScript
'use strict';

const path = require( 'path' );
const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );

module.exports = {
    // https://webpack.js.org/configuration/entry-context/
    entry: './index.js',

    // https://webpack.js.org/configuration/output/
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,

                use: [ 'raw-loader' ]
            },
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,

                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag',
                            attributes: {
                                'data-cke': true
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: styles.getPostCssConfig( {
                            themeImporter: {
                                themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                            },
                            minify: true
                        } )
                    }
                ]
            }
        ]
    },

    // Useful for debugging.
    devtool: 'source-map',

    // By default webpack logs warnings if the bundle is bigger than 200kb.
    performance: { hints: false }
};
```

Add the file index.js
```JavaScript
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import Image from '@ckeditor/ckeditor5-image/src/image';
import InsertImage from '@aeness/ckeditor5-insert-image/src/insertimage';

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ Essentials, Paragraph, Image, InsertImage ],
        toolbar: [ 'insertImage' ]
    } )
    .then( editor => {
        console.log( 'Editor was initialized', editor );
    } )
    .catch( error => {
        console.error( error.stack );
    } );
```

Add the file sample/index.html
```HTML
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>CKEditor 5 Framework – Quick start with insert-image</title>
    </head>
    <body>
        <div id="editor">
            <p>Editor content goes here.</p>
			<p>Try to add an image with an URL.</p>
        </div>

        <script src="../dist/bundle.js"></script>
    </body>
</html>
```

Build the new editor.
```
npm run build
```

Open sample\index.html in a browser to see the result.

## Common error

After build the new editor the following error appears :
```
Uncaught CKEditorError: ckeditor-duplicated-modules: Some CKEditor 5 modules are duplicated.
```

### Check the version

Aeness/ckeditor5-insert-image, @ckeditor/ckeditor5-editor-classic, @ckeditor/ckeditor5-essentials, @ckeditor/ckeditor5-paragraph and @ckeditor/ckeditor5-theme-lark must have the same version.

### Check sub node_module

The error appends when npm create sub node_module in \node_module\@ckeditor\\* directories, when packages were duplicated in node_modules.

https://ckeditor.com/docs/ckeditor5/latest/framework/guides/support/error-codes.html#error-ckeditor-duplicated-modules :
> We recommend checking if any of the steps listed below help:
>
> rm -rf node_modules && npm install to make sure you have a clean node_modules/ directory. This step is known to help in most cases.
>
>If you use yarn.lock or package-lock.json, remove it before npm install.
Check whether all CKEditor 5 packages are up to date and reinstall them if you changed anything (rm -rf node_modules && npm install). [...]

