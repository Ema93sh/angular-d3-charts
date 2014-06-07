var ChartModule = angular.module('ui.chart', []);

ChartModule	
	.directive('mgBarChart', function(){
		var tip = d3.tip()
					  .attr('class', 'd3-tip')
					  .offset([-10, 0])
					  .html(function(d) {
					    return "<strong>"+d.label +":</strong> <span style='color:red'>" + d.value + "</span>";
		});
		return {
			scope: {
				data: '=chartData',
				options: '=chartOptions'
			}, 
			restrict: 'E',
			templateUrl: 'chart.html',
			replace: true,
			link: function($scope, iElm, iAttrs, controller) {
				var frame = {
					width: 800,
					height: 500,
					padding: 100,
				};

				var chart = {
					width: frame.width - (frame.padding * 2),
					height: frame.height - (frame.padding * 2),
				};

				var vis = d3.select(iElm[0])
								.append("svg")
								.attr("width", frame.width)
								.attr("height", frame.height);

				$scope.$watch("data", function(newValue, oldValue) {
					vis.selectAll("*").remove();
					var max = 0;
					var total = 0;
					angular.forEach(newValue, function(data) {
						total += data.value;
						if (Number(data.value) > max) {
							max = Number(data.value);
						}
					});
					
					
					var xAxisScale = d3.scale.ordinal().rangeRoundBands([0, chart.width], .1);
					xAxisScale.domain(newValue.map(function(d){ return d.label}));
					var xAxis = d3.svg
								.axis()
								.orient("bottom")
								.scale(xAxisScale);

					var yAxisScale = d3.scale.linear().range([chart.height, 0]);
					yAxisScale.domain([0, max]);

					var yAxis = d3.svg
								.axis()
								.orient("left")
								.scale(yAxisScale);

					vis.append("g")
						.attr("class", "x axis")
						.attr("transform", "translate("+ frame.padding +", "+ (frame.height - frame.padding) +")")
						.call(xAxis)
						.selectAll("text")  
					            .style("text-anchor", "end")
					            .attr("dx", "-.8em")
					            .attr("dy", ".15em")
					            .attr("transform", function(d) {
					                return "rotate(-65)"; 
					                });

					vis.call(tip);

					vis.append("g")
						.attr("class", "y axis")
						.attr("transform", "translate("+ frame.padding +"," + frame.padding +" )")
						.call(yAxis);
						

					var rects = vis.selectAll("rect").data(newValue).enter()
							.append("rect");

					rects.attr("x", function(data) {return xAxisScale(data.label) + frame.padding;})
							.attr("y", frame.height - frame.padding)
							.attr("width", xAxisScale.rangeBand())
							.attr("height", 0)
							.style("fill", function(data){return data.color;})
							.on('mouseover', tip.show)
      						.on('mouseout', tip.hide)
      						.transition()
      						.attr("y", function(data) {return yAxisScale(data.value) + frame.padding;})
							.attr("height", function(data){return chart.height - yAxisScale(data.value);})
							.duration(1000);
							
				}, true);
			}
		};
	});
ChartModule
	.directive('mgPieChart', function(){
		var tip = d3.tip().attr('class', 'd3-tip').html(function(d) {
						return "<strong>"+d.data.label +":</strong> <span style='color:red'>" + d.data.value + "</span>";
					});
		return {
			scope: {
				'data' : '=chartData'
			}, 
			restrict: 'E',
			templateUrl: 'chart.html',
			replace: 'true',
			link: function($scope, iElm, iAttrs, controller) {
				var frame = {
					width: 800,
					height: 500,
					padding: 50,
				};

				var chart = {
					width: frame.width - (frame.padding * 2),
					height: frame.height - (frame.padding * 2),
				};

				var radius = Math.min(chart.width, chart.height) / 2;

				var vis = d3.select(iElm[0])
								.append("svg")
								.attr("width", frame.width)
								.attr("height", frame.height)
								.append("g")
    							.attr("transform", "translate(" + (frame.width) / 2 + "," + (frame.height) / 2 + ")");

				$scope.$watch("data", function(newValue, oldValue) {
					vis.selectAll("*").remove();
					var max = 0;
					var total = 0;
					angular.forEach(newValue, function(data) {
						total += data.value;
						if (Number(data.value) > max) {
							max = Number(data.value);
						}
					});
					vis.call(tip);
					var pie = d3.layout.pie().value(function(d){return d.value; });
					var arc = d3.svg.arc().innerRadius(radius - 100).outerRadius(radius - 20);
					var path = vis.selectAll("path").data(pie(newValue)).enter()
							    .append("path")
							    .attr("d", function(d) { 
							    	var temp = {'startAngle':d.startAngle, 'endAngle':d.endAngle - 0.3};
							    	return arc(temp); 
							    })
							    .attr("fill", function(d) { return d.data.color; })
							    .on('mouseover', tip.show)
      							.on('mouseout', tip.hide)
      							.transition()
      							.delay(100)
      							.attr("d", arc)
      							.ease("bounce") 
      							.duration(1000);
				}, true);
			}
		};
	});
angular.module('ui.chart').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('chart.html',
    "<div class=\"container\">\n" +
    "</div>"
  );

}]);
