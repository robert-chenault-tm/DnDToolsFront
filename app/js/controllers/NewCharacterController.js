dndApp.controller('NewCharacterController', function($scope, CharacterService, CharacterClassService, RaceService) {
	$scope.character = {};
	
	CharacterClassService.getCharacterClasses($scope.globals.currentUser.username, function(response) {
		$scope.classes = response.data;
		$scope.newCharacterClass = $scope.classes[0];
	}, function(error) {
		$scope.classes = [];
		console.log(error);
	});
	
	RaceService.getRaces($scope.globals.currentUser.username, function(response) {
		$scope.races = response.data;
		$scope.newCharacterRace = $scope.races[0];
	}, function(error) {
		$scope.races = [];
		console.log(error);
	});
});