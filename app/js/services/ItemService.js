dndApp.factory('ItemService', ['$http', function($http) {
	var service = {};
	
	service.getItem = function(id, successCB, failureCB) {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/DnDToolsBack/item/' + id
		}).then(function(response) {
			successCB(response);
		}, function(error) {
			failureCB(error);
		});
	}
	
	service.getXItems = function(details, successCB, failureCB) {
		$http({
			method: 'POST',
			url: 'http://localhost:8080/DnDToolsBack/items',
			data: details
		}).then(function(response) {
			successCB(response);
		}, function(error) {
			failureCB(error);
		});
	}
	
	service.getResultCount = function(details, successCB, failureCB) {
		$http({
			method: 'POST',
			url: 'http://localhost:8080/DnDToolsBack/items/count',
			data: details
		}).then(function(response) {
			successCB(response);
		}, function(error) {
			failureCB(error);
		});
	}
	
	return service;
}]);