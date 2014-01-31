/* global require: false */
/* global module: false */

var $ = require("../../vendor/jquery"),
    Backbone = require("backbone");

Backbone.$ = $;

var Models = { Color: require("../models/Color") };


/**
 * Collections.Palette
 *
 * A collection of colors that can be arranged
 * in various ways, such as a color wheel
 * 
 */

module.exports = Backbone.Collection.extend({

    model: Models.Color,
    url: "/colorData.json",

    initialize: function () {
       this.filtersOn = {};
    }

});