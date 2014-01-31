/* global require: false */
/* global module: false */

var $ = require("../../vendor/jquery"),
    Backbone = require("backbone");

Backbone.$ = $;

var Models = { Filter: require("../models/Filter") };


/**
 * Collections.FilterSet
 *
 * A group of filters
 * 
 */

module.exports = Backbone.Collection.extend({
    model: Models.Filter
});