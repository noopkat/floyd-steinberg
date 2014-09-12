var floydSteinberg = require('../floyd-steinberg');
var pngparse = require('pngparse');
var fs = require('fs');
var PNG = require('pngjs').PNG;

fs.createReadStream(__dirname + '/icecream.png')
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function() {
      var image = this;
      floydSteinberg(this, function(err, image) {
        console.log('floyd done');
    });
       this.pack().pipe(fs.createWriteStream(__dirname + '/mono.png'));
    });

// pngparse.parseFile(__dirname + '/icecream.png', function(err, image) {
//   if (err) {
//       return cb(err);
//     }

//     floydSteinberg(image, function(err, monoimage) {
//         for (i=0; i < monoimage.data.length; i++) {
//           console.log(monoimage.data[i]);
//         }
//        
//     });

// });