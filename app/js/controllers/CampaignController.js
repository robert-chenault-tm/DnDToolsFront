dndApp.controller('CampaignController', function($scope, $routeParams, $location, CampaignService, CharacterService) {
	CampaignService.getFullCampaign($routeParams.campaignId, function(response) {
		$scope.campaign = response.data;
	}, function(error) {
		console.log(error);
	});
	
	$scope.showAvailableCharacters = function() {
		if(!loaded) {
			CharacterService.getCharacters($scope.globals.currentUser.username, function(response) {
				$scope.characters = response.data;
				$scope.backupCharacters = $scope.campaign.characters.slice();
				$scope.editingCharacters = true;
				loaded = true;
			}, function(error) {
				console.log(error);
			});
		} else {
			$scope.editingCharacters = true;
		}
	}
	
	$scope.cancelEdit = function() {
		$scope.campaign.characters = $scope.backupCharacters.slice();
		$scope.editingCharacters = false;
	}
	
	$scope.submitEdit = function() {
		CampaignService.editCampaign($scope.campaign, function(response) {
			$location.url('/campaigns');
		}, function(error) {
			console.log(error);
		});
	}
	
	$scope.characterInCampaign = function(character) {
		var ret = false;
		$scope.campaign.characters.map(function(obj) {
			if(obj.id == character.id) {
				ret = true;
			}
		});

		return ret;
	}
	
	$scope.removeCharacter = function(character) {
		$scope.campaign.characters = $scope.campaign.characters.filter(function(obj) {
			return obj.id != character.id;
		});
	}
	
	$scope.addCharacter = function(character) {
		$scope.campaign.characters.push(character);
	}
	
	$scope.editingCharacters = false;
	var loaded = false;
});