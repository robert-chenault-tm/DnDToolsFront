dndApp.factory('CampaignService', ['$http', function($http) {
	var service = {};
	
	service.getCampaigns = function(username, successCB, failureCB) {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/DnDToolsBack/campaigns/' + username
		}).then(function(response){
			successCB(response)
		}, function(error) {
			failureCB(error);
		});
	}
	
	service.getFullCampaign = function(id, successCB, failureCB) {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/DnDToolsBack/fullCampaign/' + id
		}).then(function(response){
			successCB(response)
		}, function(error) {
			failureCB(error);
		});
	}
	
	service.createCampaign = function(campaign, successCB, failureCB) {
		$http({
			method: 'POST',
			url: 'http://localhost:8080/DnDToolsBack/campaign',
			data: campaign
		}).then(function(response){
			successCB(response)
		}, function(error) {
			failureCB(error);
		});
	}
	
	return service;
}]);