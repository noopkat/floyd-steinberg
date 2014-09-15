var floydSteinberg = require('../floyd-steinberg');
var pngparse = require('pngparse');
var fs = require('fs');
var PNG = require('pngjs').PNG;

// piping to file test
fs.createReadStream(__dirname + '/parrot-tiny.png')
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function() {
      var image = this;
      console.log('HERE', image.data, image.width);
      floydSteinberg(this);
       this.pack().pipe(fs.createWriteStream(__dirname + '/mono.png'));
    });

// passing imagedata obj to var for lcd use test
// var monoimage;  
// pngparse.parseFile(__dirname + '/parrot-tiny.png', function(err, image) {
//   if (err) {
//       return cb(err);
//     }

//     monoimage = floydSteinberg(image);
//     console.log(monoimage);
//     fs.writeFile('haha.png', image.data, function(){console.log('done')});
// });

// test('should return monochrome pixels', function(t) {
//   var testDither = floydSteinberg(__dirname + '/png/test1.png');
//   var imageData = testDither.data;
//   var imageDataLen = testDither.data.length;

//   for (var i = 0; i < imageDataLen; i += 4) {
//     var redPixel = imageData[i];
//     t.equal(imageData[i+1], redPixel);
//     t.equal(imageData[i+2], redPixel);
//   }

//   t.end();

// });