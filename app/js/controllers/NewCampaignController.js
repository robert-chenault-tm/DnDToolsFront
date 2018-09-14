dndApp.controller('NewCampaignController', function($scope, $location, CampaignService) {
	$scope.campaign = {};
	
	$scope.createCampaign = function(form) {
		if(form.$valid) {
			$scope.campaign.id = '-1';
			$scope.campaign.username = $scope.globals.currentUser.username;
			CampaignService.createCampaign($scope.campaign, function(response) {
				$location.url('/campaigns');
			}, function(error) {
				console.log(error);
			});
		}
	}

	$scope.cancelCreate = function() {
		$location.url('/campaigns');
	}
	
});