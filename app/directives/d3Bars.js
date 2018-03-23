angular.module('WaveRiderApp')
.directive('d3Bars', function() {

    
    return {
        restrict: 'EA',
        replace: true,
        scope: { val: '=' },
        template: '<div id="bar-graph"></div>',
        link: function(scope, element, attrs) {
            
            let x = d3.scaleLinear()
                .domain([0, d3.max(d3.values(scope.$parent.valuesArray))])
                .range([0, 600])

            let svg = d3.select("#bar-graph")

            scope.$watch('val', function(newValue, oldValue) {
                svg.selectAll("*").remove();

                x = d3.scaleLinear()
                .domain([0, d3.max(d3.values(scope.$parent.valuesArray))])
                .range([0, 600])
                
                if (scope.$parent.graphData[0].dataType === "averageSignificantWaveHeight" || scope.$parent.graphData[0].dataType === "averageSwellHeight" || scope.$parent.graphData[0].dataType === "averageWindWaveHeight") {
                    svg.selectAll('div')
                        .data(scope.$parent.graphData)
                        .enter().append("div")
                        .style("height", "1.3em")
                        .style("width", function(d) { return x(d.average) + "px"; })
                        .text(function(d) { return d.month + "/" + d.day + ": " + d.average + " m "; })
                }

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