/* global require: false */
/* global $: false */
/* global _: false */
/* global Backbone: false */

var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");
var converter = require("./lib/colorConverter");
var getTemplate = require("./lib/getTemplate");
var getColorTags = require("./lib/parseColorTags");

var App = {
    Models: {},
    Collections: {},
    Views: {}
};
var vent = _.extend({}, Backbone.Events);

App.Views.Master = Backbone.View.extend({
    el: $("#colorApp"),

    initialize: function () {
        var def = {};
        var master = this;

        var palette = new App.Collections.FullPalette();
        def.palette = palette.fetch();

        $.when(def.palette).done(function (colorData, status, jqXHR) {
            var colorWheel = new App.Views.ColorWheel({ collection: palette });
            
            var tags = getColorTags(palette.toJSON());
            var filtersByColor = new App.Collections.FilterSet(tags.byColor);
            var filtersByOther = new App.Collections.FilterSet(tags.byOther);
            var filtersByColorSet = new App.Views.FilterSet({ collection: filtersByColor });
            var filtersByOtherSet = new App.Views.FilterSet({ collection: filtersByOther }); 
            
            master.$el.append(filtersByColorSet.render().el, filtersByOtherSet.render().el);
            master.$el.append(colorWheel.render().el);
        });
    }
});

App.Models.Color = Backbone.Model.extend({

    parse: function (response) {

        var c = {
            values: {
                rgb: response.rgb,
                hsl: response.hsl || converter.rgbToHsl(response.rgb),
                hex: response.hex || converter.rgbToHex(response.rgb),
                cmyk: response.cmyk || converter.rgbToCmyk(response.rgb),
                pms: response.pms || ""
            }
        };

        delete(response.rgb);
        delete(response.hsl);
        delete(response.hex);
        delete(response.cmyk);
        delete(response.pms);

        return _.extend({}, response, c);
    }

});

App.Models.Filter = Backbone.Model.extend({
    defaults: { active: false }
});

App.Views.ColorWedge = Backbone.View.extend({

    tagName: "div",
    className: "wedge",
    template: getTemplate("colorWedge"),

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

App.Views.Filter = Backbone.View.extend({
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

App.Collections.FullPalette = Backbone.Collection.extend({

    model: App.Models.Color,
    url: "/colorData.json",

    initialize: function () {
       this.filtersOn = {};
    }

});

App.Collections.FilterSet = Backbone.Collection.extend({
    model: App.Models.Filter
});

App.Views.ColorWheel = Backbone.View.extend({

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
        var wedge = new App.Views.ColorWedge({ model: color });
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

App.Views.FilterSet = Backbone.View.extend({
    tagName: "ul",
    className: "filter-set",
    append: function (f) {
        var filter = new App.Views.Filter({ model: f });
        this.$el.append(filter.render().el);
    },
    render: function () {
        this.collection.each(this.append, this);
        return this;
    }
});

$(document).ready(function () {
    window.colorApp = new App.Views.Master();
});
