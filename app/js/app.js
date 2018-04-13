var dndApp = angular.module('dndApp', ['ngResource', 'ngRoute', 'ngCookies'])
	.config(function($routeProvider, $locationProvider, $httpProvider) {
		$routeProvider.when('/challengeCalc', {
			templateUrl: 'templates/ChallengeCalculator.html',
			controller: 'ChallengeCalculatorController'
		});
		$routeProvider.otherwise({redirectTo: '/challengeCalc'});
		$locationProvider.html5Mode(true);
	});