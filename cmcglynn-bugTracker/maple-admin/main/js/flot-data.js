/*
Template Name: my Admin
Author: Wrappixel
Email: niravjoshi87@gmail.com
File: js
*/
$(function () {
    "use strict";
    // Real Time chart
    var data = []
        , totalPoints = 300;

    function getRandomData() {
        if (data.length > 0) data = data.slice(1);
        // Do a random walk
        while (data.length < totalPoints) {
            var prev = data.length > 0 ? data[data.length - 1] : 50
                , y = prev + Math.random() * 10 - 5;
            if (y < 0) {
                y = 0;
            }
            else if (y > 100) {
                y = 100;
            }
            data.push(y);
        }
        // Zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
        }
        return res;
    }
    // Set up the control widget
    var updateInterval = 30;
    $("#updateInterval").val(updateInterval).change(function () {
        var v = $(this).val();
        if (v && !isNaN(+v)) {
            updateInterval = +v;
            if (updateInterval < 1) {
                updateInterval = 1;
            }
            else if (updateInterval > 2000) {
                updateInterval = 2000;
            }
            $(this).val("" + updateInterval);
        }
    });
    var plot = $.plot("#placeholder", [getRandomData()], {
        series: {
            shadowSize: 0 // Drawing is faster without shadows
        }
        , yaxis: {
            min: 0
            , max: 100
        }
        , xaxis: {
            show: false
        }
        , colors: ["#45b6ab"]
        , grid: {
            color: "#AFAFAF"
            , hoverable: true
            , borderWidth: 0
            , backgroundColor: '#FFF'
        }
        , tooltip: true
        , tooltipOpts: {
            content: "Y: %y"
            , defaultTheme: false
        }
    });

    function update() {
        plot.setData([getRandomData()]);
        // Since the axes don't change, we don't need to call plot.setupGrid()
        plot.draw();
        setTimeout(update, updateInterval);
    }
    update();
    //Flot Line Chart
    $(document).ready(function () {
        console.log("document ready");
        var offset = 0;
        plot();

        function plot() {
            var sin = []
                , cos = [];
            for (var i = 0; i < 12; i += 0.2) {
                sin.push([i, Math.sin(i + offset)]);
                cos.push([i, Math.cos(i + offset)]);
            }
            var options = {
                series: {
                    lines: {
                        show: true
                    }
                    , points: {
                        show: true
                    }
                }
                , grid: {
                    hoverable: true //IMPORTANT! this is needed for tooltip to work
                }
                , yaxis: {
                    min: -1.2
                    , max: 1.2
                }
                , colors: ["#458ab6", "#45b6ab"]
                , grid: {
                    color: "#AFAFAF"
                    , hoverable: true
                    , borderWidth: 0
                    , backgroundColor: '#FFF'
                }
                , tooltip: true
                , tooltipOpts: {
                    content: "'%s' of %x.1 is %y.4"
                    , shifts: {
                        x: -60
                        , y: 25
                    }
                }
            };
            var plotObj = $.plot($("#flot-line-chart"), [{
                data: sin
                , label: "sin(x)"
            , }, {
                data: cos
                , label: "cos(x)"
            }], options);
        }
    });
    //Flot Pie Chart
    $(function () {
        var data = [{
            label: "Series 0"
            , data: 10
            , color: "#45b6ab"
        , }, {
            label: "Series 1"
            , data: 1
            , color: "#99d683"
        , }, {
            label: "Series 2"
            , data: 2
            , color: "#f96262"
        , }, {
            label: "Series 3"
            , data: 3
            , color: "#458ab6"
        , }];
        var plotObj = $.plot($("#flot-pie-chart"), data, {
            series: {
                pie: {
                    show: true
                }
            }
            , grid: {
                hoverable: true
            }
            , tooltip: true
            , tooltipOpts: {
                content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                shifts: {
                    x: 20
                    , y: 0
                }
                , defaultTheme: false
            }
        });
    });
});
//Flot Moving Line Chart
$(function () {
    var container = $("#flot-line-chart-moving");
    // Determine how many data points to keep based on the placeholder's initial size;
    // this gives us a nice high-res plot while avoiding more than one point per pixel.
    var maximum = container.outerWidth() / 2 || 300;
    //
    var data = [];

    function getRandomData() {
        if (data.length) {
            data = data.slice(1);
        }
        while (data.length < maximum) {
            var previous = data.length ? data[data.length - 1] : 50;
            var y = previous + Math.random() * 10 - 5;
            data.push(y < 0 ? 0 : y > 100 ? 100 : y);
        }
        // zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
        }
        return res;
    }
    //
    series = [{
        data: getRandomData()
        , lines: {
            fill: true
        }
    }];
    //
    var plot = $.plot(container, series, {
        colors: ["#45b6ab"]
        , grid: {
            borderWidth: 0
            , minBorderMargin: 20
            , labelMargin: 10
            , backgroundColor: {
                colors: ["#fff", "#e4f4f4"]
            }
            , margin: {
                top: 8
                , bottom: 20
                , left: 20
            }
            , markings: function (axes) {
                var markings = [];
                var xaxis = axes.xaxis;
                for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
                    markings.push({
                        xaxis: {
                            from: x
                            , to: x + xaxis.tickSize
                        }
                        , color: "rgba(232, 232, 255, 0.2)"
                    });
                }
                return markings;
            }
        }
        , xaxis: {
            tickFormatter: function () {
                return "";
            }
        }
        , yaxis: {
            min: 0
            , max: 110
        }
        , legend: {
            show: true
        }
    });
    // Update the random dataset at 25FPS for a smoothly-animating chart
    setInterval(function updateRandom() {
        series[0].data = getRandomData();
        plot.setData(series);
        plot.draw();
    }, 40);
});
//Flot Bar Chart
$(function () {
    var barOptions = {
        series: {
            bars: {
                show: true
                , barWidth: 43200000
            }
        }
        , xaxis: {
            mode: "time"
            , timeformat: "%m/%d"
            , minTickSize: [1, "day"]
        }
        , grid: {
            hoverable: true
        }
        , legend: {
            show: false
        }
        , grid: {
            color: "#AFAFAF"
            , hoverable: true
            , borderWidth: 0
            , backgroundColor: '#FFF'
        }
        , tooltip: true
        , tooltipOpts: {
            content: "x: %x, y: %y"
        }
    };
    var barData = {
        label: "bar"
        , color: "#45b6ab"
        , data: [
            [1354521600000, 1000]
            , [1355040000000, 2000]
            , [1355223600000, 3000]
            , [1355306400000, 4000]
            , [1355487300000, 5000]
            , [1355571900000, 6000]
        ]
    };
    $.plot($("#flot-bar-chart"), [barData], barOptions);
});