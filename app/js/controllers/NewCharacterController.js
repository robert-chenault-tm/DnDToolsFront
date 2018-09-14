dndApp.controller('NewCharacterController', function($scope, $location, CharacterService, CharacterClassService, RaceService) {
	$scope.character = {};
	$scope.sendingToDB = false;
	
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
	
	$scope.createCharacter = function(form) {
		if(form.$valid) {
			$scope.sendingToDB = true;
			
			$scope.character.id = '-1';
			$scope.character.username = $scope.globals.currentUser.username;
			$scope.character.classId = $scope.newCharacterClass.id;
			$scope.character.className = $scope.newCharacterClass.name;
			$scope.character.raceId = $scope.newCharacterRace.id;
			$scope.character.raceName = $scope.newCharacterRace.name;

			CharacterService.createCharacter($scope.character, function(response) {
				$location.url('/characters');
			}, function(error) {
				console.log(error);
				$scope.sendingToDB = false;
			});
		}
	}
	
	$scope.cancelCreate = function() {
		$location.url('/characters');
	}
	
});