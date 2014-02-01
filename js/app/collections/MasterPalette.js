/* global require: false */
/* global module: false */

var $ = require("../../vendor/jquery"),
    _ = require("underscore"),
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

function extract(set) { 
    return _.map(set, function (item) {
        item.color.set("diff", item.diff);
        return item.color.toJSON();
    });
}

module.exports = Collections.Palette.extend({
    
    url: "/colorData.json",

    initialize: function () {
        this.filtersOn = {};

        this.on("add", function (color) {
            
            var chords = new ChordMaker(color.get("values").hsl[0], {
                universe: this.models,
                differ: function (hue, color) {
                    return Math.abs(hue - color.get("values").hsl[0]);
                }
            });

            color.set("chords", {
                analagous: new Collections.Palette(extract(chords.Analagous(5)))
            });

        });
    }

});