dndApp.factory('CharacterClassService', ['$http', function($http) {
	var service = {};
	
	service.getCharacterClasses = function(username, successCB, failureCB) {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/DnDToolsBack/classes/' + username
		}).then(function(response) {
			successCB(response);
		}, function(error) {
			failureCB(error);
		});
	}
	
	service.getCharacterClass = function(id, successCB, failureCB) {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/DnDToolsBack/class/' + id
		}).then(function(response) {
			successCB(response);
		}, function(error) {
			failureCB(error);
		});
	}
	
	service.createCharacterClass = function(characterClass, successCB, failureCB) {
		$http({
			method: 'POST',
			url: 'http://localhost:8080/DnDToolsBack/class'
		}).then(function(response) {
			successCB(response);
		}, function(error) {
			failureCB(error);
		});
	}
	
	return service;
}]);