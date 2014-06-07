angular
	.module('TestModule', ['ui.chart'])
	.controller('TestController', ['$scope', function($scope){
		$scope.chartData = [
				{
					value: 590,
					color: "#CC0066",
					label: "Food"
				},
				{
					value: 500,
					color: "green",
					label: "Petrol"
				},				
				{
					value: 354,
					color: "#00CCFF",
					label: "Internet",
				},				
				{
					value: 500,
					color: "#66FF66",
					label: "Entertainment"
				},				
				{
					value: 310,
					color: "#FFCC99",
					label: "Rent"
				},
				{
					value: 1000,
					color: "#66CCFF",
					label: "Health & Fitness"
				},				
				{
					value: 430,
					color: "#CC00FF",
					label: "Books"
				},
				{
					value: 410,
					color: "#FF9933",
					label: "Travel"
				},				
				{
					value: 343,
					color: "yellow",
					label: "Student Loan"
				},
				{
					value: 450,
					color: "#FF5050",
					label: "Auto Insurance"
				}
			];
		$scope.lineChartData = [{
			label: "Rent",
			color: "#FFCC99",
			data:[
				{
					x: new Date("10-01-2012"),
					y: 500
				},
				{
					x: new Date("01-02-2012"),
					y: 200
				},
				{
					x: new Date("02-03-2012"),
					y: 10
				},
				{
					x: new Date("06-04-2012"),
					y: 150
				},
				{
					x: new Date("12-15-2012"),
					y: 200
				},
				{
					x: new Date("08-12-2012"),
					y: 20
				},
				{
					x: new Date("1-25-2012"),
					y: 500
				},
				{
					x: new Date("1-26-2012"),
					y: 100
				},
				{
					x: new Date("10-21-2012"),
					y: 100
				}]
			},
			{
			label: "Travel",
			color: "#66CCFF",
			data:[
				{
					x: new Date("03-21-2012"),
					y: 320
				},
				{
					x: new Date("01-12-2012"),
					y: 533
				},
				{
					x: new Date("04-03-2012"),
					y: 431
				},
				{
					x: new Date("07-04-2012"),
					y: 100
				},
				{
					x: new Date("11-15-2012"),
					y: 403
				},
				// {
				// 	x: new Date("02-12-2012"),
				// 	y: 432
				// },
				// {
				// 	x: new Date("1-25-2012"),
				// 	y: 43
				// },
				// {
				// 	x: new Date("1-26-2012"),
				// 	y: 564
				// },
				{
					x: new Date("10-21-2012"),
					y: 21
				}]
			},
			];
	}]);