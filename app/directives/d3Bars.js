angular.module('WaveRiderApp')
.directive('d3Bars', function() {    
    return {
        restrict: 'EA',
        replace: true,
        scope: { val: '=' },
        template: '<div id="bar-graph"></div>',
        link: function(scope, element, attrs) {
            // declare svg element for bars and create scaling option
            let x = d3.scaleLinear()
                .domain([0, d3.max(d3.values(scope.$parent.valuesArray))])
                .range([0, 600])

            let svg = d3.select("#bar-graph")

            // on dataset state change...
            scope.$watch('val', function(newValue, oldValue) {

                //clear svg element
                svg.selectAll("*").remove();
                // reset scaling option
                x = d3.scaleLinear()
                .domain([0, d3.max(d3.values(scope.$parent.valuesArray))])
                .range([0, 600])
                
                // if dataset is a distance measurement, render graphs with meters
                if (scope.$parent.graphData[0].dataType === "averageSignificantWaveHeight" || scope.$parent.graphData[0].dataType === "averageSwellHeight" || scope.$parent.graphData[0].dataType === "averageWindWaveHeight") {
                    svg.selectAll('div')
                        .data(scope.$parent.graphData)
                        .enter().append("div")
                        .style("height", "1.3em")
                        .style("width", function(d) { return x(d.average) + "px"; })
                        .text(function(d) { return d.month + "/" + d.day + ": " + d.average + " m "; })
                }

                // if dataset is time measurement, render graphs with seconds
                if (scope.$parent.graphData[0].dataType === "averageWavePeriod" || scope.$parent.graphData[0].dataType === "averageSwellPeriod" || scope.$parent.graphData[0].dataType === "averageWindWavePeriod") {
                    svg.selectAll('div')
                    .data(scope.$parent.graphData)
                    .enter().append("div")
                    .style("height", "1.3em")
                    .style("width", function(d) { return x(d.average) + "px"; })
                    .text(function(d) { return d.month + "/" + d.day + ": " + d.average + " sec "; })
                }


            }, true)

      }  
    }
});