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