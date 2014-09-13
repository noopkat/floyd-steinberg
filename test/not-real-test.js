var floydSteinberg = require('../floyd-steinberg');
var pngparse = require('pngparse');
var fs = require('fs');
var PNG = require('pngjs').PNG;

// piping to file test
fs.createReadStream(__dirname + '/cats.png')
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function() {
      var image = this;
      floydSteinberg(this);
       this.pack().pipe(fs.createWriteStream(__dirname + '/mono.png'));
    });

// passing imagedata obj to var for lcd use test
// var monoimage;  
// pngparse.parseFile(__dirname + '/icecream.png', function(err, image) {
//   if (err) {
//       return cb(err);
//     }

//     monoimage = floydSteinberg(image);
//     console.log(monoimage);

// });