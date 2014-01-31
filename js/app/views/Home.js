/* global require: false */
/* global module: false */

var $ = require("../../vendor/jquery"),
    Backbone = require("backbone");

Backbone.$ = $;

var getTemplate = require("../../lib/getTemplate");

module.exports = Backbone.View.extend({

    el: $("#BrandApp"),
    template: getTemplate("templateHome"),

    initialize: function () {
        this.render();
    },

    events: {
        "click a": function (e) {
            e.preventDefault();
            this.attributes.router.navigate($(e.currentTarget).attr('href'), { trigger: true });
        }
    },

    render: function () {

        this.$el.html(this.template({
            pageTitle: "Super Brandmogrifier",
            links: [
                { text: "Colors", target: "/colors" }
            ]
        }));

        return this;
    }

});