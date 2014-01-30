/* global require: false */
/* global module: false */
/* global _: false */
/* global $: false */

var _ = require("underscore");
var $ = require("jquery");

module.exports = function (id) {
    return _.template($("#" + id).html());
};