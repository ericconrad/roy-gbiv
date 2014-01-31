/* global require: false */
/* global vent: true */

var Backbone = require("backbone"),
    $ = require("./vendor/jquery"),
    _ = require("underscore");

Backbone.$ = $;

var AppRouter = require("./app/Router");

/* Global event pub/sub object */
vent = _.extend({}, Backbone.Events);


/**
 * Application init
 * 
 */

$(document).ready(function () {
    new AppRouter();
    Backbone.history.start();
});
