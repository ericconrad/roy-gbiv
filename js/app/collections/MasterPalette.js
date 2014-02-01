/* global require: false */
/* global module: false */

var $ = require("../../vendor/jquery"),
    Backbone = require("backbone"),
    ChordMaker = require("../../lib/ChordMaker");

Backbone.$ = $;

// var Models = { Color: require("../models/Color") };
var Collections = { Palette: require("./Palette") };


/**
 * Collections.MasterPalette
 *
 * Full range of colors
 * 
 */

module.exports = Collections.Palette.extend({
    
    url: "/colorData.json",

    initialize: function () {
        this.filtersOn = {};

        this.on("add", function (color) {
            // console.log(color);
            // console.log(this.toJSON());
            // console.log(" --- ");
            
            var chords = new ChordMaker(color, this.toJSON());

            color.set("chords", {
                analagous: new Collections.Palette(chords.analagous(5)),

            });
        });
    }

});