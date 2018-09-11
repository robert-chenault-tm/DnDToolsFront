dndApp.controller('CharacterListController', function($scope, CharacterService) {
	
	CharacterService.getCharacters($scope.globals.currentUser.username, function(response) {
		$scope.characters = response.data;
	}, function(error) {
		$scope.characters = [];
		console.log(error);
	})
});