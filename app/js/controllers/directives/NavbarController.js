dndApp.controller('NavbarController', function($scope, $location, AuthenticationService) {
	
	$scope.logout = function() {
		AuthenticationService.ClearCredentials();
		$location.url('/');
	}
	
	$scope.goToCharacters = function() {
		$location.url('/characters');
	}
	
	$scope.goToNewCharacter = function() {
		$location.url('/newCharacter');
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