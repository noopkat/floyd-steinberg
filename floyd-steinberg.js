/*
Floyd-Steinberg implementation thanks to Forrest Oliphant @forresto and @meemo via iFramework https://github.com/meemoo/iframework/blob/master/src/nodes/image-monochrome-worker.js
*/
module.exports = floyd_steinberg;

function floyd_steinberg(image) {
  var imageData = image.data;
  var imageDataLength = imageData.length;
  var w = image.width;
  var lumR = [],
      lumG = [],
      lumB = [],
      error;

  for (var i = 0; i < 256; i++) {
    lumR[i] = i * 0.299;
    lumG[i] = i * 0.587;
    lumB[i] = i * 0.114;
  }

  // Greyscale luminance (sets r pixels to luminance of rgb)
  for (var i = 0; i <= imageDataLength; i += 4) {
    imageData[i] = Math.floor(lumR[imageData[i]] + lumG[imageData[i+1]] + lumB[imageData[i+2]]);
  }

  var newPixel, err;

  for (var currentPixel = 0; currentPixel <= imageDataLength; currentPixel+=4) {
    // Floyd–Steinberg dithering algorithm
    newPixel = imageData[currentPixel] < 129 ? 0 : 255;
    err = Math.floor((imageData[currentPixel] - newPixel) / 16);
    imageData[currentPixel] = newPixel;
    imageData[currentPixel + 4         ] += err * 7;
    imageData[currentPixel + 4 * w - 4 ] += err * 3;
    imageData[currentPixel + 4 * w     ] += err * 5;
    imageData[currentPixel + 4 * w + 4 ] += err * 1;
    // Set g and b pixels equal to r
    imageData[currentPixel + 1] = imageData[currentPixel + 2] = imageData[currentPixel];
  }

  return image;
}