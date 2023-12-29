import test from 'ava';
import  { floydSteinberg } from '../floyd-steinberg';
import pngparse from 'pngparse';

test('should return expected image object', async (t) => {
  const image = await pngparse.parseFile(__dirname + '/png/test0.png');
  const testDither = floydSteinberg(image);

  t.is(typeof testDither.width, 'number');
  t.is(typeof testDither.height, 'number');
  t.is(typeof testDither.data, 'object');
});

test('should return monochrome pixels', async (t) => {
  const image = await pngparse.parseFile(__dirname + '/png/test1.png');
  const testDither = floydSteinberg(image);
  const imageData = testDither.data;

  const redPixel = imageData[0];
  t.is(imageData[1], redPixel);
  t.is(imageData[2], redPixel);
});