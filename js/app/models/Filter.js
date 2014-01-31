/* global require: false */
/* global module: false */

var $ = require("../../vendor/jquery"),
    Backbone = require("backbone");

Backbone.$ = $;


/**
 * Models.Filter
 *
 * @views Filter
 *
 * @property name
 * 
 */

module.exports = Backbone.Model.extend({
    defaults: { active: false }
});