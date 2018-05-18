dndApp.controller('NavbarController', function($scope, $location, AuthenticationService) {
	
	$scope.logout = function() {
		AuthenticationService.ClearCredentials();
		$location.url('/');
	}
	
	$scope.goToItems = function() {
		$location.url('/items');
	}
	
	$scope.goToNewItem = function() {
		$location.url('/newItem');
	}
	
	$scope.goToCRC = function() {
		$location.url('/challengeCalc');
	}
});