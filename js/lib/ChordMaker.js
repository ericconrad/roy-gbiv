/* global require: false */
/* global module: false */

var _ = require("underscore");

var Collections = { Palette: require("../app/collections/Palette") };

/**
 * So this is not a good way to be doing this, so I'm stopping for now.
 *
 * TODO:
 *
 * Change this class so that it accepts an HSL base and a list of
 * possible color objects, along with a 'find' function to locate
 * the HSL value in each object passed in, so that the compare logic
 * can return a set of objects that have the correct HSL values without
 * having to be totally coupled to the Backbone system in any way.
 * 
 */

var Maker = function (options) {

    var defaults = {
        tolerance: 60,
        n: 3,
        angle: 180,

    };

    this.options = _.extend({}, defaults, options);
    this.base = this.options.color.get("values").hsl;
    this.possibles = this.options.masterPalette;
};

Maker.prototype.pluckHue = function (color) {
    return color.get("values").hsl[0]
};

Maker.prototype.compute = function (options) {
    var options = _.extend({}, this.options, options);
    

};



Maker.prototype.Analagous = function (options) {

};

Maker.prototype.Complementary = function (options) {

};

Maker.prototype.Triad = function (options) {

};

Maker.prototype.Square = function () {

};

Maker.prototype.TetradicPositive = function () {

};

Maker.prototype.TetradicNegative = function () {

};



module.exports = Maker;