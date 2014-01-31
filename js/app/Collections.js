/* global require: false */
/* global module: false */
/* global vent: false */

var $ = require("../vendor/jquery"),
    _ = require("underscore"),
    Backbone = require("backbone");

Backbone.$ = $;

var Models = require("./Models");


/**
 * Collections.FullPalette
 *
 */

module.exports.FullPalette = Backbone.Collection.extend({

    model: Models.Color,
    url: "/colorData.json",

    initialize: function () {
       this.filtersOn = {};
    }

});


/**
 * Collections.FilterSet
 *
 */

module.exports.FilterSet = Backbone.Collection.extend({
    model: Models.Filter
});