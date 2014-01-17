var $ = jQuery;

var Roy = function (options) {
    this.options = options;
    this.html = $("<div>").addClass("color-squares");
    this.filters = [];
    this.converter = new ColorConverter();

    if (this.options.dataSelector) {
        this.getColorJson();
    }
};

Roy.prototype.filterExists = function (filter) {
    var exists = false;
    $.each(this.filters, function (i, existing) {
        if (filter.name === existing.name) {
            exists = true;
            return false;
        }
    });
    return exists;
};

Roy.prototype.getColorJson = function () {
    this.colors = JSON.parse($(this.options.dataSelector).text());
};

Roy.prototype.addColorDiv = function (color) {
    var div = $("<div>")
        .css({ 
            backgroundColor: "rgb(" + color.rgb.join(",") + ")" 
        })
        .data(color)
        .addClass($.map(color.filters, function (f) {
            return f.slug;
        }).join(' '));

    div.append($("<p>").text(color.name).addClass('name'));
    this.html.append(div);

    div.append($("<span>").addClass('idee').text(div.index()));
};

Roy.prototype.addFilters = function (filters) {
    var r = this;
    $.each(filters, function (i, filter) {
        if (!r.filterExists(filter)) {
            r.filters.push(filter);
        }
    });
};

Roy.prototype.getFilterHtml = function () {
    var html = $("<div>").addClass("filters");
    var r = this;

    r.filters.sort(function (a, b) {
        return (a.name < b.name) ? 1 : -1;
    });

    r.filters = $.map(r.filters, function (filter) {
        filter.slug = '.' + filter.slug;
        return filter;
    });

    r.filters.push({ 
        name: 'show all', 
        slug: '*' 
    });
    r.filters.reverse();

    $.each(this.filters, function (i, filter) {
        html.append($("<a>").text(filter.name).data('filter', filter.slug));
    });

    html.append($("<a>").text('randomize').addClass('randomize'));
    html.append($("<a>").text('reset').addClass('reset'));

    $("body").on("click", "a.randomize", function (e) {
        r.iso.arrange({
            sortBy: 'random'
        });
    });

    $("body").on("click", "a.reset", function (e) {
        r.iso.arrange({
            sortBy: 'id'
        });
    });

    return html;
};

Roy.prototype.loopColors = function () {
    var r = this;
    $.each(this.colors, function (i, color) {
        color.filters = [];
        $.each(color.families, function (i, fam) {
            color.filters.push({
                name: fam,
                slug: fam.toLowerCase().replace(" ", "-")
            });
        });
        r.addColorDiv(color);
        r.addFilters(color.filters);
    });
};

Roy.prototype.setFilters = function (iso) {
    var r = this;
    $("body").on("click", ".filters a", function (e) {
        var filterBy = $(this).data('filter');
        r.iso.arrange({
            filter: filterBy
        });
        // console.log('Filter:', $(this).data('filter'));
    });
};

Roy.prototype.setshow = function () {
    var r = this;

    r.showshow();
    r.slideshow.on('click', r.hideshow);

    var goTo = function (e, current, target) {
        e.stopPropagation();

        $(".hsl-range").remove();
        r.applyHslRange(r.slideshow, target.data())

        current.removeClass('show-active');
        target.addClass('show-active');

        r.slideshow.css({ background: 'rgb(' + target.data('rgb').join(',') + ')' });
        r.slideshow.find('.label').text(target.data('name'));

        $(".palette-suggestions").remove();
        r.slideshow.append(r.buildPalette(target.data()));
    };
    var goNext = function (e) {
        var current = r.html.find('div.show-active');
        goTo(e, current, current.next());
    };
    var goPrev = function (e) {
        var current = r.html.find('div.show-active');
        goTo(e, current, current.prev());
    };

    r.slideshow.find('a.next').on('click', goNext);
    $("body").on('keyup', function (e) {
        
        if (r.slideshow.css('opacity') == 0) {
            return;
        }

        if (e.keyCode === 39) {
            goNext(e);
        }
        if (e.keyCode === 37) {
            goPrev(e);
        }
        if (e.keyCode === 27) {
            r.hideshow();
        }
    })
    r.slideshow.find('a.prev').on('click', goPrev);
}

Roy.prototype.showshow = function (e) {
    var r = this;
    this.html.find('div').on('click', function (e) {
        var color = $(this).data();
        $(this).addClass('show-active');
        r.slideshow.css({
            zIndex: 10,
            opacity: 1,
            background: 'rgb(' + color.rgb.join(',') + ')'
        });
        r.applyHslRange(r.slideshow, color);
        r.slideshow.find('.label').text($(this).data('name'));

        r.slideshow.append(r.buildPalette(color));
    });
};

Roy.prototype.hideshow = function (e) {
    $(".slideshow").css({
        zIndex: 1,
        opacity: 0,
        background: 'white'
    });

    $(".color-squares").find('div').removeClass('show-active');
};

Roy.prototype.buildPalette = function (base) {
    var palette = $("<div>").addClass('palette-suggestions');

    // Analagous
    palette.append(this.buildPaletteSection('Analagous Palette', this.getAnalagous(base)));

    // Complementary
    palette.append(this.buildPaletteSection('Complementary Palette', this.getComplements(base, 5)));

    // Split Complements
    // palette.append(this.buildPaletteSection('Split Complement Palette', this.getSplitComplements(base)));

    // Triads
    palette.append(this.buildPaletteSection('Triad Palette', this.getTriads(base)));

    // Square
    palette.append(this.buildPaletteSection('Square Palette', this.getSquareColors(base)));

    // Tetradic Positive
    palette.append(this.buildPaletteSection('Tetradic Positive Palette', this.getTetradicPositive(base)));

    // Tetradic Negative
    palette.append(this.buildPaletteSection('Tetradic Negative Palette', this.getTetradicNegative(base)));


    this.slideshow.on('click', '.swatch', function (e) {
        e.stopPropagation();
        $(this).find('.label').toggle(200);        
    });

    this.slideshow.on('click', '.section', function (e) {
        e.stopPropagation();
        $(this).toggleClass('show');
    })

    return palette;
};

Roy.prototype.buildPaletteSection = function (title, colors) {
    var section = $("<div>").addClass('section');
    section.append($("<h4>").text(title));
    
    $.each(colors, function (i, color) {
        var label = $("<span>").text(color.color.name).addClass('label');
        section.append($("<div>").css({ 
            backgroundColor: "hsl(" + color.values.join(",") + ")"
        }).data('color', color.color).addClass('swatch').append(label));
    });

    return section;
};

Roy.prototype.applyHslRange = function (container, color) {
    var range = $("<div>").addClass("hsl-range");
    var hsl = this.converter.rgbToHsl(color.rgb);
    var values = this.getHslValues(hsl, 5);
    var winHeight = $(window).height();

    // console.log(values.indexOf(hsl));

    $.each(values, function (i, value) {
        var diff = parseInt(value[2], 10) - parseInt(hsl[2], 10);
        if (diff > 0) diff = "+" + diff;
        var labelColor = (parseInt(value[2], 10) < 50) ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
        var shade = $("<div>").css({
            backgroundColor: "hsl(" + value.join(",") + ")",
            width: "10%",
            height: (winHeight / values.length) + "px"
        }).html("<span style='color: " + labelColor + "'>" + (diff ? diff + '%' : '') + "</span>");

        if (value.join("") === hsl.join("")) {
            shade.addClass("current");
        }

        range.append(shade);
    });

    container.prepend(range);
};



Roy.prototype.getHslValues = function (hsl, increment) {
    var lightness = parseInt(hsl[2], 10) / 100;
    var startingLightness = lightness;
    var increment = increment / 100;
    var values = [];

    while (this.shouldHslUp(lightness, increment)) {
        lightness = ((lightness * 1000) + (increment * 1000)) / 1000;
        values.push(lightness);
    }

    lightness = startingLightness;

    values.reverse();
    values.push(lightness);

    while (this.shouldHslDown(lightness, increment)) {
        lightness = ((lightness * 1000) - (increment * 1000)) / 1000;
        values.push(lightness);
    }

    return values.map(function (v) {
        return [hsl[0], hsl[1], Math.round(v * 100) + "%"];
    });
};

Roy.prototype.shouldHslDown = function (l, i) {
    return Math.round(l * 100) - Math.round(i * 100) > 0;
};

Roy.prototype.shouldHslUp = function (l, i) {
    return Math.round(l * 100) + Math.round(i * 100) < 100;
}

Roy.prototype.hslColors = function () {
    var r = this;
    if (r.hslColorList) return r.hslColorList;
    r.hslColorList = [];

    $.each(r.colors, function (i, color) {
        color.hsl = r.converter.rgbToHsl(color.rgb);
        r.hslColorList.push(color);
    });
    return r.hslColorList;
};

Roy.prototype.getRelatedColors = function (base, options) {
    var r = this;
    var hsl = this.converter.rgbToHsl(base.rgb);
    var comp;
    var defaults = {
        n: 3,
        angle: 180
    }

    options = $.extend(true, {}, defaults, options);

    base.hue = modifyBase(hsl[0]);
    base.related = base.hue + options.angle;
    if (base.related > 360) {
        base.related -= 360;
    } else if (base.related < 0) {
        base.related += 360;
    }
    base.related = modifyResult(base.related);

    var compared = $.map(r.hslColors(), function (color) {
        var both = [color.hsl[0], base.related];
        var max = Math.max.apply(null, both);
        var min = Math.min.apply(null, both);
        var diff = max - min;

        var result = {};

        result.color = color;
        result.values = color.hsl;
        result.diff = (diff <= 180) ? diff : 360 - max + min;

        return result;
    });

    compared.sort(function (a, b) {
        return a.diff - b.diff > 0 ? 1 : -1;
    });

    return compared.slice(0, options.n);
};

Roy.prototype.getComplements = function (base, n) {
    n = n || 3;

    return this.getRelatedColors(base, { n: n, angle: 180 });
};

Roy.prototype.getSplitComplements = function (base, n) {
    var batch = [];
    n = n || 4;
    n = Math.round(n / 2);

    batch = batch.concat(this.getRelatedColors(base, {n: n, angle: 150 }));
    batch = batch.concat(this.getRelatedColors(base, {n: n, angle: -150 }));

    return batch;
};

Roy.prototype.getTriads = function (base, n) {
    var batch = [];
    n = n || 4;
    n = Math.round(n / 2);

    batch = batch.concat(this.getRelatedColors(base, {n: n, angle: 120 }));
    batch = batch.concat(this.getRelatedColors(base, {n: n, angle: -120 }));

    return batch;
};

Roy.prototype.getAnalagous = function (base, n) {
    var batch = [];
    n = n || 6;

    batch = batch.concat(this.getRelatedColors(base, {n: n, angle: 0 }));

    // Remove first because it's the main color
    return batch.slice(1);
};

Roy.prototype.getSquareColors = function (base) {
    var batch = [];
    batch = batch.concat(this.getRelatedColors(base, {n: 1, angle: 90 }));
    batch = batch.concat(this.getRelatedColors(base, {n: 1, angle: 180 }));
    batch = batch.concat(this.getRelatedColors(base, {n: 1, angle: -90 }));

    return batch;
};

Roy.prototype.getTetradicPositive = function (base) {
    var batch = [];
    batch = batch.concat(this.getRelatedColors(base, {n: 1, angle: 60 }));
    batch = batch.concat(this.getRelatedColors(base, {n: 1, angle: 180 }));
    batch = batch.concat(this.getRelatedColors(base, {n: 1, angle: 240 }));

    return batch;
};

Roy.prototype.getTetradicNegative = function (base) {
    var batch = [];
    batch = batch.concat(this.getRelatedColors(base, {n: 1, angle: -60 }));
    batch = batch.concat(this.getRelatedColors(base, {n: 1, angle: -180 }));
    batch = batch.concat(this.getRelatedColors(base, {n: 1, angle: -240 }));

    return batch;
};

$(document).ready(function ($) {
    
    var roy = new Roy({
        dataSelector: "#colors"
    });

    roy.container = $("#container");
    roy.slideshow = $(".slideshow");

    roy.getColorJson();
    roy.loopColors();

    roy.container.append(roy.getFilterHtml())
        .append(roy.html);

    roy.iso = new Isotope('.color-squares', {
        itemSelector: "div",
        layoutMode: "masonry",
        masonry: {
            gutter: 10
        },
        getSortData: {
            id: function(itemElem) { // function
                var id = $(itemElem).find('span').text();
                return parseInt(id, 10);
            }
        }
    });

    roy.setFilters();
    roy.setshow();
});



window.complement = function (base) {
    return computeRyb(base, 180);
};

window.triad = function (base) {
    return [computeRyb(base, 120), computeRyb(base, -120)];
}