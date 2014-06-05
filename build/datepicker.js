angular.module('ui.datepicker', [])
	.controller('DatePickerController', ['$scope', function($scope){
		
	}])
	.directive('mgDate', function(){
		return {
			scope: {
				date: '=ngModel',
			}, 
			controller: 'DatePickerController',
			restrict: 'E',
			templateUrl: 'datepicker.html',
			replace: true,
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	});
angular.module('ui.datepicker').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('datepicker.html',
    "<div class=\"btn-group\">\n" +
    "\t<button class=\"btn btn-default dropdown-toggle\" ng-click=\"isOpen = !isOpen\">\n" +
    "\t\t<span class=\"glyphicon glyphicon-calendar\"></span>\n" +
    "\t</button>\n" +
    "\t<div class=\"dropdown-menu\" style=\"display:block\" ng-show=\"isOpen\">\n" +
    "\t\t<div class=\"datepicker\">\n" +
    "\t\t\t<div class=\"datepicker-header\">\n" +
    "\t\t\t\t<button class=\"btn btn-default btn-sm pull-left\">\n" +
    "\t\t\t\t\t<span class=\"glyphicon glyphicon-chevron-left\"></span>\n" +
    "\t\t\t\t</button>\n" +
    "\t\t\t\t<div class=\"datepicker-title\">Date</div>\n" +
    "\t\t\t\t<button class=\"btn btn-default btn-sm pull-right\">\n" +
    "\t\t\t\t\t<span class=\"glyphicon glyphicon-chevron-right\"></span>\n" +
    "\t\t\t\t</button>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"datepicker-body\">\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"datepicker-footer\">\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );

}]);
