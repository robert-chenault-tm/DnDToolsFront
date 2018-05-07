dndApp.controller('NavbarController', function($scope, $rootScope, $location, AuthenticationService) {
	
	$scope.logout = function() {
		AuthenticationService.ClearCredentials();
		$location.url('/');
	}
	
	$scope.goToHome = function() {
		$location.url('/challengeCalc');
	}
});