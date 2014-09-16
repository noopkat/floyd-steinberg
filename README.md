#floyd-steinberg

Dithering for the Node.js

##Install
```
npm install floyd-steinberg
```

##Floyd-What?
The Floyd-Steinberg dithering algorithm was published by Robert Floyd and Louis Steinberg in 1976. Dithering is a method of diffusing pixels in order to avoid harsh edges or banding where the colours in an image contrast with each other. Its obvious use is in converting high depth images to a limited colour palette (256 or less). There are many dithering algorithms out there, and Floyd-Steinberg is one of the most well known.

##How do I use this module?
This module expects a PNG format image object to be passed in as a single argument. This image object must comply with the same format as the HTML5 canvas imageData spec (see [https://developer.mozilla.org/en-US/docs/Web/API/ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData)). There are several node packages out there that can parse/decode PNG files into this format. Try pngparse or pngjs from the [npmjs.org](http://npmjs.org) repository.

##Example

example use:
```
var floydSteinberg = require('floyd-steinberg');

var ditherImage = floydSteinberg(imageData);
console.log(ditherImage);

```

and the result:
```
ditherImage = {
  height: int,
  width: int,
  data: [...]
}

```

From there, you may pipe this into a PNG file output solution, or use the object to manipulate/use in your project.

##How does it look?
Current file output of this module:
 
![lena-floyd](https://raw.githubusercontent.com/noopkat/floyd-steinberg/master/test/png/test2-mono.png)

![mandrill](https://raw.githubusercontent.com/noopkat/floyd-steinberg/master/test/png/test1-mono.png)

![peppers](https://raw.githubusercontent.com/noopkat/floyd-steinberg/master/test/png/test0-mono.png)

## Credit
The base algorithm is a modified version from the [iFramework](https://github.com/meemoo/iframework/blob/master/src/nodes/image-monochrome-worker.js) project by [Forrest Oliphant](https://github.com/forresto) and [meemoo](https://github.com/meemoo).  
I then tweaked it further to remove artifacts and improve contrast in the image.