dndApp.controller('CharacterController', function($scope, $routeParams, CharacterService) {
	CharacterService.getCharacter($routeParams.characterId, function(response) {
		$scope.character = response.data;
	}, function(error) {
		console.log(error);
		$scope.character = {};
	});
});