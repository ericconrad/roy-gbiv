/* global require: false */
/* global module: false */
/* global vent: false */

var $ = require("../../vendor/jquery"),
    Backbone = require("backbone");

Backbone.$ = $;

var templates = { colorFilter: require("../templates/color-filter.html") };

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
    template: templates.colorFilter,

    events: {
        "click a": "toggleFilter"
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

        return false;
    },

    render: function () {

        this.$el.html(this.template(this.model.toJSON()));

        return this;
    }
});