/* global require: false */
/* global module: false */

var _ = require("underscore");
var tags;

module.exports = function (data) {

    if (tags) return tags;

    var uniques = _.unique(_.flatten(_.pluck(data, 'families')));
    var colorRegex = new RegExp("^.*(red|orange|yellow|green|blue|indigo|purple|violet|brown|teal|pink).*$");

    tags = { byColor: [], byOther: [] };

    _.each(uniques, function (tag, i) {

        var hash = { name: tag };

        if (colorRegex.test(tag)) {
            tags.byColor.push(hash);

        } else {
            tags.byOther.push(hash);

        }

    });

    return tags;
};