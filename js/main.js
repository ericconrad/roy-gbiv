/* global require: false */
/* global vent: false */

var Backbone = require("backbone");
var $ = require("./vendor/jquery");
var _ = require("underscore");

Backbone.$ = $;

var Views = {
    Master: require("./app/views/Master")
};

/* Global event pub/sub object */
vent = _.extend({}, Backbone.Events);


/**
 * Application init
 * 
 */

$(document).ready(function () {
    new Views.Master();
});
