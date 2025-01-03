# Aeness / ckeditor5-insert-image


This package implements a feature for inserting image for the open source rich text editors [CKEditor 5](https://ckeditor.com/ckeditor-5/demo/) v31.1.0. It allows the user to insert images with http/https url.

Since the v22.0.0, CKEditor has its own feature "ImageInsert" for inserting image via URL.
But the feature needs that "ImageUpload" is activated to work properly.

Aeness / ckeditor5-insert-image does not need "ImageUpload" and can work with AutoImage.

With Aeness / ckeditor5-insert-image you can insert an image :

![Example 1](https://github.com/Aeness/ckeditor5-insert-image/blob/v31.0.0/docs/doc-example1.jpg?raw=true)

![Example 2](https://github.com/Aeness/ckeditor5-insert-image/blob/v31.0.0/docs/doc-example2.jpg?raw=true)

![Example 3](https://github.com/Aeness/ckeditor5-insert-image/blob/v31.0.0/docs/doc-example3.jpg?raw=true)

![Example 4](https://github.com/Aeness/ckeditor5-insert-image/blob/v31.0.0/docs/doc-example4.jpg?raw=true)

You can also update the image URL :

![Example 5](https://github.com/Aeness/ckeditor5-insert-image/blob/v31.0.0/docs/doc-example5.jpg?raw=true)

## Table of contents

* [Test the plugin](#test-the-plugin)
* [How use ckeditor5-insert-image](#how-use-ckeditor5-insert-image)
   * [Complete example - Adding a plugin to an existing build (customization and rebuild)](#complete-example---adding-a-plugin-to-an-existing-build-customization-and-rebuild)
   * [Complete example - Adding a plugin to your own editor (from source)](#complete-example---adding-a-plugin-to-your-own-editor-from-source)
   * [Example - Adding a plugin to an existing build with DLL](#example---adding-a-plugin-to-an-existing-build-with-DLL)
* [Common error](#common-error)

## Test the plugin

Run (or [Download it](https://github.com/Aeness/ckeditor5-build/archive/refs/tags/v30.0.0.zip) **and unzip**)
```
git clone --depth 1 --branch v30.0.0 https://github.com/Aeness/ckeditor5-build.git
```

 and open ckeditor5-build\sample\index.html (french) or ckeditor5-build\sample\index_en.html in a browser.


##  How use ckeditor5-insert-image

It is a feature for CKEditor 5, that allow the user to insert images with http/https url.

It is available with :
- [Classic editor](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/overview.html#classic-editor)

### Complete example - Adding a plugin to an existing build (customization and rebuild)

It also possible to customize and rebuild an editor with the plugin/feature ckeditor5-insert-image.

You can see the official doc [here](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/installing-plugins.html#adding-a-plugin-to-a-build).

Clone and install the build repository
```
git clone -b v30.0.0 https://github.com/ckeditor/ckeditor5
cd ckeditor5/packages/ckeditor5-build-classic
npm install
```

Install the plugin package 'ckeditor5-insert-image' :
```
npm install --save @aeness/ckeditor5-insert-image@29.0.0
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
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';

// Add (Only)InsertImage
import OnlyInsertImage from '@aeness/ckeditor5-insert-image/src/onlyinsertimage';

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
	CloudServices,
	EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
    OnlyInsertImage, // Add OnlyInsertImage
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
			'outdent',
			'indent',
			'|',
			'onlyInsertImage', // Replace 'uploadImage',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'undo',
			'redo'
		]
	},
	image: {
		toolbar: [
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side',
			'|',
			'toggleImageCaption',
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

### Complete example - Adding a plugin to your own editor (from source)

It also possible to build your own editor with the plugin/feature ckeditor5-insert-image.

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
npm install --save @ckeditor/ckeditor5-dev-utils @ckeditor/ckeditor5-dev-webpack-plugin @ckeditor/ckeditor5-editor-classic@29.0.0 @ckeditor/ckeditor5-essentials@29.0.0 @ckeditor/ckeditor5-paragraph@29.0.0 @ckeditor/ckeditor5-theme-lark@29.0.0
```

Install the plugin package 'ckeditor5-insert-image' :
```
npm install --save @aeness/ckeditor5-insert-image@29.0.0
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
import OnlyInsertImage from '@aeness/ckeditor5-insert-image/src/onlyinsertimage';

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ Essentials, Paragraph, Image, OnlyInsertImage ],
        toolbar: [ 'onlyInsertImage' ]
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

### Example - Adding a plugin to an existing build with DLL

Since the v26.0.0, CKEditor 5 allow to add plugins/features to an editor build without having to rebuild (recompile) the build itself.

You can see the official doc [here](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/development/dll-builds.html).

Currently, CKEditor 5 does not come with a ready-to-use DLL build.
However, you can find a (english) dll for @aeness/ckeditor5-insert-image in the build\@aeness directory.

You have to put this dll in your projet, and load-it like :
```HTML
<script src="../../build/@aeness/ckeditor5-insert-image.js"></script>
```

And to use the plugin you need
```JavaScript
 const config = {
        plugins: [
            CKEditor5.basicStyles.Bold,
            CKEditor5.basicStyles.Italic,
            CKEditor5.autoformat.Autoformat,
            CKEditor5.blockQuote.BlockQuote,
            CKEditor5.essentials.Essentials,
            CKEditor5.heading.Heading,
            CKEditor5.image.Image,
            CKEditor5.image.ImageCaption,
            CKEditor5.image.ImageStyle,
            CKEditor5.image.ImageToolbar,
            CKEditor5.image.ImageUpload,
            CKEditor5["@aeness/ckeditor5InsertImage"].OnlyInsertImage,
            // ...
        ],
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
                'outdent',
                'indent',
                '|',
                'onlyInsertImage',
                // ....
            ]
        },
        // ...
    };
```

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

