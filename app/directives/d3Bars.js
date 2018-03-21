angular.module('WaveRiderApp')
.directive('d3Bars', function() {

    
    return {
        restrict: 'EA',
        replace: true,
        scope: { val: '=' },
        template: '<div id="bar-graph"></div>',
        link: function(scope, element, attrs) {
            
            
            scope.$watch('val', function(newValue, oldValue) {


                let x = d3.scaleLinear()
                            .domain([0, d3.max(scope.$parent.graphData)])
                            .range([0, 420])
                
                let svg = d3.select("#bar-graph")
                            .selectAll('div')
                            .data(scope.$parent.graphData)
                            .enter().append("div")
                            .style("width", function(d) { return x(d) + "px"; })
                            .text(function(d) { return d; })
            }, true)
      }  
    }
});