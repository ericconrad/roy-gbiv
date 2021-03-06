/* global require: false */
/* global module: false */

var _ = require("underscore"),
    wheeler = require("./wheeler");

var Maker = function (baseHue, options) {

    var defaults = {
        n: 3,
        differ: function (a, b) {
            return Math.abs(b - a);
        }
    };

    this.options = _.extend({}, defaults, options);
    this.base = baseHue;

};

Maker.prototype.compute = function (options) {
    options = _.extend({}, this.options, options);
    var adjustedHue = wheeler.moveGValueOnYWheel(this.base, options.angle);

    if (!options.universe) {
        return adjustedHue;
    }

    return this.closest(adjustedHue, options);
};

Maker.prototype.closest = function (hue, options) {

    if (!options.universe) {
        throw new Error("Closest needs a universe of colors to compare against");
    }

    var diffed = _.map(options.universe, function (color, i) {
        return {
            color: color,
            diff: options.differ(hue, color)
        };
    });

    diffed.sort(function (a, b) {
        return a.diff > b.diff ? 1 : -1;
    });

    return diffed.slice(0, options.n);
};


Maker.prototype.Analagous = function (n) {
    
    n = n ? n + 1 : 6;

    var result = this.compute({ n: n, angle: 0 });

    // Remove first result because it's the base color
    return result.slice(1);
};

Maker.prototype.Complementary = function (n) {

};

Maker.prototype.SplitComplementary = function (n) {

};

Maker.prototype.Triad = function (n) {

};

Maker.prototype.Square = function () {

};

Maker.prototype.TetradicPositive = function () {

};

Maker.prototype.TetradicNegative = function () {

};


module.exports = Maker;