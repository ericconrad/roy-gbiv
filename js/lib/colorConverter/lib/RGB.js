/* global module: false */

var RGB = function (rgb) {

    if (typeof rgb === "string") { rgb = rgb.split(","); }
    
    this.values = rgb;
    this.ratios = rgb.map(function (val) {
        return parseInt(val, 10) / 255;
    });
    this.max = Math.max.apply(null, this.ratios);
    this.maxIndex = this.ratios.indexOf(this.max);
    this.min = Math.min.apply(null, this.ratios);
    this.range = this.max - this.min;

    this.ratios = {
        red: this.ratios[0],
        green: this.ratios[1],
        blue: this.ratios[2]
    };

};

/**
 * HSL Conversion
 */

RGB.prototype.getHslHue = function () {

    var hueprime, hue;

    if (this.range === 0) {
        // All values equal, neutral grey has no hue
        hueprime = 0;

    } else if (this.maxIndex === 0) {
        // Red is largest
        hueprime = (this.ratios.green - this.ratios.blue) / this.range;

    } else if (this.maxIndex === 1) {
        // Green is largest
        hueprime = ((this.ratios.blue - this.ratios.red) / this.range) + 2;

    } else {
        // Blue is largest
        hueprime = ((this.ratios.red - this.ratios.green) / this.range) + 4;
    }
    
    hue = 60 * hueprime;
    
    if (hue < 0) {
        hue = 360 + hue;
    }
    
    return Math.round(hue);
};

RGB.prototype.getHslSaturation = function (lightness) {
  //1 - abs(2L - 1)
  return this.range / (1 - Math.abs((2 * lightness) - 1));
};

RGB.prototype.getHslLightness = function () {
  return (this.max + this.min) / 2;
};

/**
 * Hexadecimal conversion
 */

RGB.prototype.getHexRed = function () {
    return this.values[0].toString(16);
};

RGB.prototype.getHexGreen = function () {
    return this.values[1].toString(16);
};

RGB.prototype.getHexBlue = function () {
    return this.values[2].toString(16);
};

/**
 * CMYK conversion
 * Formula source: http://www.rapidtables.com/convert/color/rgb-to-cmyk.htm
 */

RGB.prototype.getCmykBlack = function () {
    return 1 - this.max;
};

RGB.prototype.getCmykCyan = function (k) {
    return (1 - this.ratios.red - k) / (1 - k);
};

RGB.prototype.getCmykMagenta = function (k) {
    return (1 - this.ratios.green - k) / (1 - k);
};

RGB.prototype.getCmykYellow = function (k) {
    return (1 - this.ratios.blue - k) / (1 - k);
};

module.exports = RGB;