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