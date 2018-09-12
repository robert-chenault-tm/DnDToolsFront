dndApp.controller('CampaignListController', function($scope, CampaignService) {
	CampaignService.getCampaigns($scope.globals.currentUser.username, function(response) {
		$scope.campaigns = response.data;
		console.log($scope.campaigns);
	}, function(error) {
		console.log(error);
	});
});