ChartModule
	.directive('mgPieChart', function(){
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
					var tip = d3.tip().attr('class', 'd3-tip').html(function(d) {
						return "<strong>"+d.data.label +":</strong> <span style='color:red'>" + d.data.value + "</span>";
					});
					vis.call(tip);
					var pie = d3.layout.pie().value(function(d){return d.value; });
					var arc = d3.svg.arc().innerRadius(radius - 100).outerRadius(radius - 20);
					var path = vis.selectAll("path").data(pie(newValue)).enter()
							    .append("path")
							    .attr("d", function(d) { 
							    	var temp = {'startAngle':d.startAngle, 'endAngle':d.startAngle};
							    	return arc(temp); 
							    })
							    .attr("fill", function(d) { return d.data.color; })
							    .on('mouseover', tip.show)
      							.on('mouseout', tip.hide)
      							.transition()
      							.attr("d", arc)
      							.ease("bounce") 
      							.duration(1000);
				}, true);
			}
		};
	});