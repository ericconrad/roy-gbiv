/* global require: false */
/* global module: false */
/* global vent: false */

var $ = require("../../vendor/jquery"),
    _ = require("underscore"),
    Backbone = require("backbone");

Backbone.$ = $;

var templates = { colorWedge: require("../templates/color-wedge.html") };

/**
 * Views.ColorWedge
 *
 * @expects Model:Color
 *
 * Displays a color object as a wedge to be fit into the color wheel
 * 
 */

module.exports = Backbone.View.extend({

    tagName: "div",
    className: "wedge",
    template: templates.colorWedge,

    initialize: function () {

        vent.on("filter:state", function (list) {
            if (list.length === 0 || _.intersection(this.model.get("families"), list).length > 0) {
                this.$el.removeClass("hidden");

            } else {
                this.$el.addClass("hidden");

            }
        }, this);
    },

    events: {
        'click': 'openColor'
    },

    openColor: function(e) {
        e.preventDefault();
        // console.log(this.model.get('name'));
    },

    render: function () {

        this.$el.html(this.template({ color: this.model.toJSON() }));

        return this;
    }
});