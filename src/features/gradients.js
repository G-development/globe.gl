export function makeGradients(mat, Rainbow, fColor, sColor) {
  var numberOfItems = mat.length;
  var rainbow = new Rainbow();
  var gradients = [];
  if (mat.length > 1) {
    rainbow.setNumberRange(1, numberOfItems);
    // rainbow.setSpectrum("red", "black");
    rainbow.setSpectrum(fColor, sColor);
    for (var i = 1; i <= numberOfItems; i++) {
      var hexColour = rainbow.colourAt(i);
      gradients.push("rgb(" + hexToRgb(hexColour) + ")");
    }
  } else {
    var hexColour = rainbow.colourAt(0);
    gradients.push("rgb(" + hexToRgb(hexColour) + ")");
  }
  // console.log("Gradients:", gradients);
  return gradients;
}

function hexToRgb(hex) {
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return r + "," + g + "," + b;
}
