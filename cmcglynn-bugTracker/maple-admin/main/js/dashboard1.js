/*
Template Name: Monster Admin
Author: Wrappixel
Email: niravjoshi87@gmail.com
File: js
*/
$(function () {
    "use strict";

    // ============================================================== 
    // Total revenue chart
    // ============================================================== 
    new Chartist.Line('.total-revenue4', {
        labels: ['0', '4', '8', '12', '16', '20', '16', '20']
        , series: [
        [0, 2, 3.5, 0, 13, 1, 4, 1]
        , [0, 4, 0, 4, 0, 4, 0, 4]
      ]
    }, {
         high: 15
        , low: 0
        ,showArea: true
        , fullWidth: true
        , chartPadding: 30
        , plugins: [
        Chartist.plugins.tooltip()
      ]
        , // As this is axis specific we need to tell Chartist to use whole numbers only on the concerned axis
        axisY: {
            onlyInteger: true
           
            , labelInterpolationFnc: function (value) {
                return (value / 1) + 'k';
            }
        }
    });
    
    
    // ============================================================== 
    // chart
    // ==============================================================
    new Chartist.Pie('.ct-product-chart', {
      series: [20, 10, 30]
    }, {
      donut: true,
      donutWidth: 60,
      donutSolid: true,
      startAngle: 270,
        plugins: [
        Chartist.plugins.tooltip()
      ] ,
      showLabel: true
    });
    // ============================================================== 
    // world map
    // ==============================================================
    jQuery('#visitfromworld').vectorMap({
        map: 'world_mill_en'
        , backgroundColor: '#fff'
        , borderColor: '#ccc'
        , borderOpacity: 0.9
        , borderWidth: 1
        , zoomOnScroll : false
        , color: '#ddd'
        , regionStyle: {
            initial: {
                fill: '#fff'
            }
        }
        , markerStyle: {
            initial: {
                r: 8
                , 'fill': '#99d683'
                , 'fill-opacity': 1
                , 'stroke': '#000'
                , 'stroke-width': 0
                , 'stroke-opacity': 1
            }
        , }
        , enableZoom: true
        , hoverColor: '#99d683'
        , markers: [{
            latLng: [21.00, 78.00]
            , name: 'India : 9347'
            , style: {fill: '#55ce63'}
        },
      {
        latLng : [-33.00, 151.00],
        name : 'Australia : 250'
        , style: {fill: '#45b6ab'}
      },
       {
        latLng : [61.00, 105.00],
        name : 'Russia : 250'
        , style: {fill: '#e76462'}
      },
      {
        latLng : [36.77, -119.41],
        name : 'USA : 250'
        , style: {fill: '#458ab6'}
      },
      {
        latLng : [55.37, -3.41],
        name : 'UK   : 250'
        , style: {fill: '#5a45b6'}
      },
      {
        latLng : [25.20, 55.27],
        name : 'UAE : 250'
        , style: {fill: '#ed9d3e'}
      }]
        , hoverOpacity: null
        , normalizeFunction: 'linear'
        , scaleColors: ['#fff', '#ccc']
        , selectedColor: '#c9dfaf'
        , selectedRegions: []
        , showTooltip: true
        , onRegionClick: function (element, code, region) {
            var message = 'You clicked "' + region + '" which has the code: ' + code.toUpperCase();
            alert(message);
        }
    });
    
    $('.vcarousel').carousel({
            interval: 3000
     })
    
});
    