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
            console.log($(e.currentTarget).attr('href'));
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