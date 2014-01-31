/* global require: false */
/* global module: false */
/* global vent: false */

var $ = require("../../vendor/jquery"),
    _ = require("underscore"),
    Backbone = require("backbone");

Backbone.$ = $;

var Views = {
    ColorWedge: require("./ColorWedge")
};

/**
 * Views.ColorWheel
 *
 * @expects Collection:FullPalette
 *
 * Turns a list of Color Wedges (palette) into an interactive wheel
 */

module.exports = Backbone.View.extend({

    tagName: "div",
    className: "wheel",

    initialize: function () {

        vent.on("filter:on", function (name) {

            this.$el.addClass("filterby-" + name);
            this.collection.filtersOn[name] = true;

            vent.trigger("filter:state", _.keys(this.collection.filtersOn));

        }, this);

        vent.on("filter:off", function (name) {

            this.$el.removeClass("filterby-" + name);
            delete(this.collection.filtersOn[name]);

            vent.trigger("filter:state", _.keys(this.collection.filtersOn));

        }, this);

    },

    append: function (color, i) {

        var wedge = new Views.ColorWedge({ model: color });
        var rotation = (360 / this.collection.length * (i + 1));

        wedge.render().$el.css({
            transform: "rotate(" + rotation + "deg)"
        });

        wedge.$el.find(".name").css({
            transform: "rotate(-" + rotation + "deg)"
        });
        
        this.$el.append(wedge.el);
    },

    render: function () {

        this.collection.each(this.append, this);

        return this;
    }
});