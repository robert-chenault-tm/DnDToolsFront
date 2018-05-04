var dndApp = angular.module('dndApp', ['ngResource', 'ngRoute', 'ngCookies'])
	.config(function($routeProvider, $locationProvider, $httpProvider) {
		$routeProvider.when('/', {
			templateUrl: 'templates/Login.html',
			controller: 'LoginController'
		});
		$routeProvider.when('/newUser', {
			templateUrl: 'templates/NewUser.html',
			controller: 'NewUserController'
		});
		$routeProvider.when('/challengeCalc', {
			templateUrl: 'templates/ChallengeCalculator.html',
			controller: 'ChallengeCalculatorController'
		});
		$routeProvider.otherwise({redirectTo: '/challengeCalc'});
		$locationProvider.html5Mode(true);
	}).run(function($rootScope, $location, $cookieStore, $http) {
		$rootScope.globals = $cookieStore.get('globals') || {};
		if($rootScope.globals.currentUser) {
			$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authData;
		}
		
		$rootScope.$on('$locationChangeStart', function(event, next, current) {
			if($location.url() !== '/' && $location.url() !== '/newUser' && !$rootScope.globals.currentUser) {
				$location.url('/');
			}
		})
	});