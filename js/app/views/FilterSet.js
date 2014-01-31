/* global require: false */
/* global module: false */

var $ = require("../../vendor/jquery"),
    Backbone = require("backbone");

Backbone.$ = $;

var Views = {
    Filter: require("./Filter")
};

/**
 * Views.FilterSet
 *
 * @expects Collection:FilterSet
 *
 * Groups a list of individual filters into a <ul> element
 * 
 */

module.exports = Backbone.View.extend({

    tagName: "ul",
    className: "filter-set",

    append: function (f) {
        var filter = new Views.Filter({ model: f });
        this.$el.append(filter.render().el);
    },

    render: function () {
        this.collection.each(this.append, this);
        return this;
    }

});