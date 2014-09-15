var test = require('tape');
var floydSteinberg = require('../floyd-steinberg');
var pngparse = require('pngparse');

test('should return expected image object', function(t) {
  pngparse.parseFile(__dirname + '/png/test0.png', function(err, image) {
    var testDither = floydSteinberg(image);
    t.equal(typeof testDither.width, 'number');
    t.equal(typeof testDither.height, 'number');
    t.equal(typeof testDither.data, 'object');

    t.end();
  });
});

test('should return monochrome pixels', function(t) {
  pngparse.parseFile(__dirname + '/png/test1.png', function(err, image) {
    var testDither = floydSteinberg(image);
    var imageData = testDither.data;
    var imageDataLen = testDither.data.length;

    // test first pixel to see if it's grey/black/white
    var redPixel = imageData[0];
    t.equal(imageData[1], redPixel);
    t.equal(imageData[2], redPixel);

    t.end();
  });
});