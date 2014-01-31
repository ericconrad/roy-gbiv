/* global require: false */
/* global module: false */

var _ = require("underscore");
var $ = require("../vendor/jquery");

module.exports = function (id) {
    return _.template($("#" + id).html());
};