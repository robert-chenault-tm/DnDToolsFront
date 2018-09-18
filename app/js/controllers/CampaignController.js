dndApp.controller('CampaignController', function($scope, $routeParams, CampaignService, CharacterService) {
	CampaignService.getFullCampaign($routeParams.campaignId, function(response) {
		console.log(response.data);
		$scope.campaign = response.data;
	}, function(error) {
		console.log(error);
	});
	
	$scope.showAvailableCharacters = function() {
		CharacterService.getCharacters($scope.globals.currentUser.username, function(response) {
			$scope.characters = response.data;
		}, function(error) {
			console.log(error);
		});
		$scope.editingCharacters = true;
	}
	
	$scope.cancelEdit = function() {
		$scope.editingCharacters = false;
	}
	
	$scope.editingCharacters = false;
});