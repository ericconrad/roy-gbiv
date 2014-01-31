/* global require: false */
/* global module: false */

var $ = require("../../vendor/jquery"),
    _ = require("underscore"),
    Backbone = require("backbone");

Backbone.$ = $;

var converter = require("../../lib/colorConverter");

/**
 * Models.Color
 *
 * @views ColorWedge
 *
 * @property name
 * @property values : Declared mix values with computed fallbacks
 * 
 */

module.exports = Backbone.Model.extend({

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