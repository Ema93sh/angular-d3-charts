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

		$scope.chartOptions = {
			type: "Bar"
		};
	}]);