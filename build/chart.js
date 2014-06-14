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
					angular.forEach(newValue, function(data) {
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
        var tip = d3.tip().direction('s').attr('class', 'd3-pie-tip').html(function(d) {
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
                    vis.call(tip);
                    var pie = d3.layout.pie().sort(null).value(function(d){return d.value; });
                    var arc = d3.svg.arc().innerRadius(radius - 100).outerRadius(radius - 20);
                    var path = vis.selectAll("path").data(pie(newValue)).enter()
                                .append("path")
                                .attr("fill", function(d) { return d.data.color; })
                                .on('mouseover', tip.show)
                                .on('mouseout', tip.hide)
                                .transition()
                                .delay(function(d, i) { 
                                    if(d.value === 0) {
                                        return 0;
                                    }
                                    return i * 400; 
                                })
                                .attrTween('d', function(d) {
                                   var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                                   return function(t) {
                                       d.endAngle = i(t);
                                     return arc(d);
                                   };
                                })
                                .ease("ease") 
                                .duration(function(d){
                                    if (d.value === 0){
                                        return 0;
                                    }
                                    return 400;
                            });
                }, true);
            }
        };
    });
ChartModule
    .directive('mgLineChart', function(){
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
                    var x = d3.time.scale()
                        .range([0, chart.width]);

                    var y = d3.scale.linear()
                        .range([chart.height, 0]);

                    var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient("bottom");

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left");

                    var line = d3.svg.line()
                                .x(function(d) { return x(d.x); })
                                .y(function(d) { return y(d.y); });
                    var minX = [];
                    var maxX = [];
                    var minY = [];
                    var maxY = [];
                    angular.forEach(newValue, function(category){
                        minX.push(d3.min(category.data, function(d) { return d.x;}));
                        maxX.push(d3.max(category.data, function(d) { return d.x;}));
                        minY.push(d3.min(category.data, function(d) { return d.y;}));
                        maxY.push(d3.max(category.data, function(d) { return d.y;}));
                    });

                    x.domain(d3.extent(minX.concat(maxX)));
                    y.domain(d3.extent(minY.concat(maxY)));

                    vis.append("g")
                      .attr("class", "x axis")
                      .attr("transform", "translate("+ frame.padding+ ", " + (frame.height - frame.padding ) + ")")
                      .call(xAxis)
                      .selectAll("text")  
                        .style("text-anchor", "end")
                        .attr("dx", "-.8em")
                        .attr("dy", ".15em")
                        .attr("transform", function(d) {
                            return "rotate(-65)"; 
                            });

                    vis.append("g")
                        .attr("class", "y axis")
                        .attr("transform", "translate("+frame.padding+", " + frame.padding + ")")
                        .call(yAxis);

                    angular.forEach(newValue, function(category, index){
                        var data = angular.copy(category.data);
                        data.sort(function(a, b){ 
                                if(a.x < b.x) 
                                {
                                    return -1;
                                }
                                if (a.x > b.x) {
                                    return 1;
                                }
                                return 0;
                            });
                        vis.append("path")
                            .datum(data)
                            .attr("class", "line")
                            .attr("transform", "translate("+ frame.padding +", " + frame.padding + ")")
                            .attr("stroke", category.color)
                            .transition()
                            .attrTween("d", pathTween)
                            .ease("ease")
                            .duration(1000);

                        function pathTween() {
                            var interpolate = d3.scale.quantile()
                                    .domain([0,1])
                                    .range(d3.range(1, data.length + 1));
                            return function(t) {
                                return line(data.slice(0, interpolate(t)));
                            };
                        }

                        vis.append("rect")
                           .attr("width", 20)
                           .attr("height", 20)
                           .attr("transform", "translate("+ (frame.width - frame.padding) +","+  ((index * 25) + frame.padding)+")" )
                           .attr("fill", category.color);

                        vis.append("text")
                           .attr("class", "legend")
                           .attr("transform", "translate("+ (frame.width - frame.padding + 25) +","+  ((index * 25) + frame.padding + 15)+")" )
                           .text(category.label);
                    });
                    // 
                });
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
