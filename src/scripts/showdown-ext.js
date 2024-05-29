// var myext = {
//   type: 'lang',
//   regex: /markdown/g,
//   replace: 'showdown'
// };

// var myext = {
//   type: 'lang',
//   filter: function (text, converter, options) {
//      // ... do stuff to text ...
//      return text;
//   }
// };

// var x = 0;
// var myext = {
//   type: 'lang',
//   filter: function (text, converter) {
//     if (x < 3) {
//       ++x;
//       someSubText = converter.makeHtml(someSubText);
//     }
//   } 
// };


// actual extension
var customExt = function() {
  var hot_color_swapping = {
    type: "lang",
    regex: /color="(.+)"/g,
    replace: "style='color: $1;'",
  };
  return [hot_color_swapping];
};

// loader
(function (extension) {
  if (typeof showdown !== 'undefined') {
    // global (browser or nodejs global)
    extension(showdown);
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['showdown'], extension);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = extension(require('showdown'));
  } else {
    // showdown was not found so we throw
    throw Error('Could not find showdown library');
  }
}(function (showdown) {
  // loading extension into shodown
  showdown.extension('customExt', customExt);
}));