# CropNow
Plain Javascript Plugin to Crop Image instantly (without uploading to server)

## Code Example

```javascript
var file = window.document.getElementById('file'),
    image = window.document.getElementById('img'),
    previewImage = window.document.getElementById('preview-img');

/**
 * Using CropNow
 */
var cropNow = new CropNow({
	file: file,
    image: img,
    previewImage: previewImage,
    ratio: {width: 1, height: 1},
    resize: {width: 400, height: 400},
    onCrop: function(base64String) {
    	console.log('Image Cropped. Base64 String: ', base64String);
    }
});

/**
 * Call "getBase64" method to get cropped base64 image URI string
 */
var base64URI = cropNow.getBase64();
```

## Doc

Params         	| Type 			|  Description
--------       	| --------------|-------------
*file*         	|DOM Element	| `file` element from which image needs to be loaded
*image*    		|DOM Element 	| `img` element where cropping should happen
*previewImage* 	|DOM Element 	| `img` element for showing the preview image
*ratio*			|Object 		| `{width: 16, height: 9}`
*resize*		|Object 		| `{width: 160, height: 90}`
*onCrop* 		|Function 		| Will be invoked when crop event happens

Methods
```javascript
var cropNow = new CropNow(params);
...
var croppedBase64String = cropNow.getBase64();
```