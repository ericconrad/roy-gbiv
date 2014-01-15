var ColorConverter = function (options) { 
    this.options = options;
};

ColorConverter.prototype.rgbInit = function (rgb) {
    if (typeof rgb === "string") { rgb = rgb.split(","); }
    this.rgb = rgb.map(function (val) {
        return parseInt(val, 10) / 255;
    });
    this.max = Math.max.apply(null, this.rgb);
    this.maxIndex = this.rgb.indexOf(this.max);
    this.min = Math.min.apply(null, this.rgb);
    this.range = this.max - this.min;
};

ColorConverter.prototype.getHue = function () {
    var hueprime, hue;
    if (this.range === 0) {
        // All values equal, neutral grey has no hue
        hueprime = 0;
    } else if (this.maxIndex === 0) {
        // Red is largest
        hueprime = (this.rgb[1] - this.rgb[2]) / this.range;
    } else if (this.maxIndex === 1) {
        // Green is largest
        hueprime = ((this.rgb[2] - this.rgb[0]) / this.range) + 2;
    } else {
        // Blue is largest
        hueprime = ((this.rgb[0] - this.rgb[1]) / this.range) + 4;
    }
    
    hue = 60 * hueprime;
    
    if (hue < 0) {
        hue = 360 + hue;
    }
    
    return Math.round(hue);
};

ColorConverter.prototype.getHslSaturation = function (lightness) {
  //1 - abs(2L - 1)
  return this.range / (1 - Math.abs((2 * lightness) - 1));
};

ColorConverter.prototype.getLightness = function () {
  return (this.max + this.min) / 2;
};

ColorConverter.prototype.percentify = function (value) {
    return Math.round(value * 100);
};

ColorConverter.prototype.rgbToHsl = function (rgb) {
    var hue, saturation, lightness;
    this.rgbInit(rgb);
    
    hue = this.getHue();
    lightness = this.getLightness();
    saturation = this.getHslSaturation(lightness);
    
    return [hue, this.percentify(saturation) + "%", this.percentify(lightness) + "%"];
};

ColorConverter.prototype.rgbToHsv = function (rgb) {
    
};