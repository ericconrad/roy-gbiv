/* global require: false */
/* global module: false */

var $ = require("../../vendor/jquery"),
    Backbone = require("backbone");

Backbone.$ = $;

var Collections = {
        MasterPalette: require("../collections/MasterPalette"),
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
        var master = this,
            div = $("<div>"),
            palette = new Collections.MasterPalette();

        $.when(palette.fetch()).done(function () {

            // console.log('palette!', palette.toJSON());

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