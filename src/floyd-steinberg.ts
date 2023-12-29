/*
 * floyd-steinberg
 *
 * Using 2D error diffusion formula published by Robert Floyd and Louis Steinberg in 1976
 *
 * Javascript implementation of Floyd-Steinberg algorithm thanks to Forrest Oliphant @forresto and @meemoo 
 * via iFramework https://github.com/meemoo/iframework/blob/master/src/nodes/image-monochrome-worker.js
 *
 * Accepts an object that complies with the HTML5 canvas imageData spec https://developer.mozilla.org/en-US/docs/Web/API/ImageData
 * In particular, it makes use of the width, height, and data properties
 *
 * License: MIT
*/

export function floydSteinberg(image: ImageData){
  const imageData = image.data;
  const imageDataLength = imageData.length;
  const  width = image.width;

    // Precalculate luminance values using a typed array for efficiency
    const luminanceCoefficients = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
      luminanceCoefficients[i] = Math.floor(i * 0.299 + i * 0.587 + i * 0.114);
    }
  
    // Combine greyscaling and dithering in a single loop for efficiency
    for (let i = 0; i < imageDataLength; i += 4) {
      const red = imageData[i];
      const green = imageData[i + 1];
      const blue = imageData[i + 2];
  
      const luminance = luminanceCoefficients[red] + luminanceCoefficients[green] + luminanceCoefficients[blue];
      const newPixel = luminance < 150 ? 0 : 255;
      const err = Math.floor((luminance - newPixel) / 23);
  
      imageData[i] = newPixel; // Set red
      imageData[i + 1] = newPixel; // Set green
      imageData[i + 2] = newPixel; // Set blue
  
      // Distribute error to neighboring pixels
      if (i + 4 < imageDataLength) imageData[i + 4] += err * 7;
      if (i >= width * 4) imageData[i - width * 4] += err * 3;
      if (i >= width * 4) imageData[i - width * 4 + 4] += err * 5;
      if (i + width * 4 + 4 < imageDataLength) imageData[i + width * 4 + 4] += err * 1;
    }
  
    return image;
}


export function atkinsonDithering(image:ImageData) {
  const imageData = image.data;
  const imageDataLength = imageData.length;
  const w = image.width;

  // Precalculate luminance lookup table
  const luminanceLookup = new Uint8Array(256);
  for (let i = 0; i < 256; i++) {
    luminanceLookup[i] = Math.floor(i * 0.299 + i * 0.587 + i * 0.114);
  }

  // Greyscale conversion using lookup table
  for (let i = 0; i <= imageDataLength; i += 4) {
    imageData[i] = luminanceLookup[imageData[i]];
  }

  // Dithering using simplified array access
  for (let currentPixel = 0; currentPixel <= imageDataLength; currentPixel += 4) {
    const currentR = imageData[currentPixel];
    const nextPixel = currentPixel + 4;
    const nextRow = currentPixel + 4 * w;

    const newPixel = currentR < 129 ? 0 : 255;
    const err = Math.floor((currentR - newPixel) / 8);

    imageData[currentPixel] = newPixel;
    imageData[nextPixel] += err;
    imageData[nextPixel + 4] += err;
    imageData[nextRow - 4] += err;
    imageData[nextRow] += err;
    imageData[nextRow + 4] += err;
    imageData[nextRow + w * 4] += err;

    // Set g and b values equal to r
    imageData[currentPixel + 1] = imageData[currentPixel + 2] = newPixel;
  }

  return image;
}
