/* global require: false */
/* global module: false */
/* global vent: false */

var $ = require("../../vendor/jquery"),
    Backbone = require("backbone");

Backbone.$ = $;

var getTemplate = require("../../lib/getTemplate");

/**
 * Views.Filter
 *
 * @expects Model:Filter
 *
 * A link to filter the colors by.
 * 
 */

module.exports = Backbone.View.extend({

    tagName: "li",
    template: getTemplate("colorFilter"),

    events: {
        "click": "toggleFilter"
    },

    toggleFilter: function (e) {

        e.preventDefault();
        var filterName = this.model.get("name");

        this.$el.toggleClass("active");

        if (this.model.get('active')) {
            this.model.set('active', false);
            vent.trigger("filter:off", filterName);

        } else {
            this.model.set("active", true);
            vent.trigger("filter:on", filterName);

        }

    },

    render: function () {

        this.$el.html(this.template(this.model.toJSON()));

        return this;
    }
});