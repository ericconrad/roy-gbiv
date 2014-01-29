/* global require */
/* global $ */
/* global _ */
/* global Backbone */

var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");

var App = Backbone.View.extend({
    id: "container",

    initialize: function () {
        console.log('initializing');
        this.render().$el.append($('<p>').text('An app emerges...'));
    }
});

var colorApp = new App();
// colorApp.render().