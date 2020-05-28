//widget id = 98d15ffe-79a0-4a99-8c65-64fb95d1e307

var gridster;

// same object than generated with gridster.serialize() method
var serialization;
$.getJSON('render.json', function (json) {
    serialization = json;
    console.log(serialization);
    serialization = Gridster.sort_by_row_and_col_asc(serialization);
});


// sort serialization

//console.log(serialization);

$(function () {

    gridster = $(".gridster ul").gridster({
        widget_base_dimensions: [100, 55],
        widget_margins: [5, 5],
        serialize_params: function ($w, wgd) {
            return {
                /* add element ID to data*/
                id: $w.attr('id'),
                /* defaults */
                col: wgd.col,
                row: wgd.row,
                size_x: wgd.size_x,
                size_y: wgd.size_y
            }
        },
        resize: {
            enabled: true
        }
    }).data('gridster');
    function render(wid) {
        $.getJSON('http://10.0.3.209:7005/api/v2/widget-core/registry/widget/' + wid).then(function (widgetData) {
            console.log(widgetData);
            var brand = widgetData.widgetProperties.componentBrand;
            var type =widgetData.widgetProperties.visualizationType;
            var src = "http://10.0.3.209:89/widget-adapter/" + type + "/" + brand + "/?wid=" + wid;
            var frame = $('<iframe>', {
                src: src,
                class: 'widgetPreview',
                frameborder: 0,
                scrolling: 'no',
                width: 540,
                height: 310
            });
            var html = '<li><h3>DRAG</h3></li>';
            html = $(html).html(frame);
            //html = '<li><h3>DRAG</h3>'+html+'</li>';
            gridster.add_widget(html);
        });
    }

$('.addWidget').on('click', function () {

var wid = $('#widgetId').val();
render(wid);


});


    $('.js-seralize').on('click', function () {
        gridster.remove_all_widgets();
        $.each(serialization, function () {

            //var src = "/widget-adapter/" + chartType.option('value') + "/" + brand.option('value') + "/?wid=" + widget.id;
            var src = "http://10.0.3.209:89/widget-adapter/line/eCharts/?wid=98d15ffe-79a0-4a99-8c65-64fb95d1e307";
            console.log(src);
            var frame = $('<iframe>', {
                src: src,
                class: 'widgetPreview',
                frameborder: 0,
                scrolling: 'no',
                width: 540,
                height: 310
            });
            console.log(frame);


            var html = '<li><p> test ' + this.id + '<input type="text" style="width: 90%"><input type="button" value="Применить"></p></li>';
            html = $(html).html(frame);


            gridster.add_widget(html, this.size_x, this.size_y, this.col, this.row);
        });
    });


    function encode(s) {
        var out = [];
        for (var i = 0; i < s.length; i++) {
            out[i] = s.charCodeAt(i);
        }
        return new Uint8Array(out);
    }

    var button = document.getElementById('button');
    button.addEventListener('click', function () {

        var data = encode(JSON.stringify(serialization, null, 4));
        console.log(serialization);

        var blob = new Blob([data], {
            type: 'application/octet-stream'
        });

        url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'example.json');

        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent(event);
    });
});