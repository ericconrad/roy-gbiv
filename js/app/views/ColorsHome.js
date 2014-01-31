/* global require: false */
/* global module: false */

var $ = require("../../vendor/jquery"),
    Backbone = require("backbone");

Backbone.$ = $;

var Collections = {
        Palette: require("../collections/Palette"),
        FilterSet: require("../collections/FilterSet")
    },
    Views = {
        ColorWheel: require("./ColorWheel"),
        FilterSet: require("./FilterSet")
    };
    
var getColorTags = require("../../lib/parseColorTags");

/**
 * Views.ColorsHome
 *
 * @expects None
 *
 * Master view for /colors page
 */

module.exports = Backbone.View.extend({

    el: $("#BrandApp"),

    initialize: function () {
        var def = {};
        var master = this;
        var div = $("<div>");

        var palette = new Collections.Palette();
        def.palette = palette.fetch();

        $.when(def.palette).done(function (colorData, status, jqXHR) {
            var wheel = new Views.ColorWheel({ collection: palette });
            
            var tags = getColorTags(palette.toJSON());

            var filtersByColor = new Collections.FilterSet(tags.byColor);
            var filtersByOther = new Collections.FilterSet(tags.byOther);

            var colorSet = new Views.FilterSet({ collection: filtersByColor });
            var otherSet = new Views.FilterSet({ collection: filtersByOther }); 
            
            div.append(colorSet.render().el, otherSet.render().el)
                .append(wheel.render().el);

            master.$el.html(div);
        });
    }

});