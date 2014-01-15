var $ = jQuery;

var Roy = function (options) {
    this.options = options;
    this.html = $("<div>").addClass("color-squares");
    this.filters = [];
    this.converter = new ColorConverter();
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

        current.removeClass('show-active');
        target.addClass('show-active');

        r.slideshow.css({ background: 'rgb(' + target.data('rgb').join(',') + ')' });
        r.slideshow.find('.num').text(target.index());
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
        r.slideshow.find('.num').text($(this).index());
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

Roy.prototype.applyHslRange = function (container, color) {
    var range = $("<div>").addClass("hsl-range");
    var hsl = this.converter.rgbToHsl(color.rgb);

    range.html("<a href='http://google.com'>mein color!</a>");
    
    container.prepend(range);
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