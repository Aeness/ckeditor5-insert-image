# Aeness / ckeditor5-insert-image
This package implements a image feature for CKEditor 5. It allows for inserting images into the edited content.

##  CKEditor 5

CKEditor 5 is an open source rich text editors : https://github.com/ckeditor/ckeditor5.

##  ckeditor5-insert-image

It is a feature for CKEditor 5, that allow the user to insert images with http/https url.

It is available with :
- [Classic editor](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/overview.html#classic-editor)

CKEditor 5 does not allow to add plugins/features to CKEditor 5 build (https://github.com/ckeditor/ckeditor5/issues/667).
You have to build your own editor with the plugin/feature ckeditor5-insert-image. 

### Exemple - Adding a plugin to a build

See the official doc [here](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/installing-plugins.html#adding-a-plugin-to-a-build).

After cloning and installing the build repository, install the plugin package :
```
npm install --save-dev https://github.com/Aeness/ckeditor5-insert-image.git#beta
```
Edit the src/ckeditor.js file to add your plugin. Here the minimal exemple :

```JavaScript
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Image from '@ckeditor/ckeditor5-image/src/image';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import InsertImage from '@aeness/ckeditor5-insert-image/src/insertimage';

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	Image,
	InsertImage,
	Paragraph
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [ 'insertImage' ]
	}
};
```

### Exemple - Adding a plugin to an editor

See the official doc [here](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/installing-plugins.html#adding-a-plugin-to-an-editor).

**TO TRY**
