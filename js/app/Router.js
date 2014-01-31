/* global require: false */
/* global module: false */

var $ = require("../vendor/jquery"),
    Backbone = require("backbone");

Backbone.$ = $;

var Views = { 
    Home: require("./views/Home"),
    ColorsHome: require("./views/ColorsHome") 
};

/**
 * Main Application Router
 * 
 */

module.exports = Backbone.Router.extend({

    routes: {
        "": "home",
        "colors": "colorsHome",
        "colors/:name": "colorInfo"
    },

    home: function () {
        new Views.Home();
    },

    colorsHome: function () {
        new Views.ColorsHome();
    },

    colorInfo: function (name) {

    }

});