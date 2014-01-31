/* global require: false */
/* global module: false */

var $ = require("../../vendor/jquery"),
    Backbone = require("backbone");

Backbone.$ = $;

var Collections = require("../Collections"),
    Views = {
        FilterSet: require("./FilterSet"),
        ColorWheel: require("./ColorWheel")
    };
    
var getColorTags = require("../../lib/parseColorTags");

/**
 * Views.Master
 *
 * @expects None
 *
 * Master view to rule all others
 */

module.exports = Backbone.View.extend({

    el: $("#colorApp"),

    initialize: function () {
        var def = {};
        var master = this;

        var palette = new Collections.FullPalette();
        def.palette = palette.fetch();

        $.when(def.palette).done(function (colorData, status, jqXHR) {
            var wheel = new Views.ColorWheel({ collection: palette });
            
            var tags = getColorTags(palette.toJSON());

            var filtersByColor = new Collections.FilterSet(tags.byColor);
            var filtersByOther = new Collections.FilterSet(tags.byOther);

            var colorSet = new Views.FilterSet({ collection: filtersByColor });
            var otherSet = new Views.FilterSet({ collection: filtersByOther }); 
            
            master.$el.append(colorSet.render().el, otherSet.render().el);
            master.$el.append(wheel.render().el);
        });
    }

});