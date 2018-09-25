dndApp.controller('NewItemController', function($scope, $location, ItemService) {
	$scope.item = {};
	$scope.sendingToDB = false;
	$scope.item.weaponMods = null;
	$scope.item.armorMods = null;
	
	$scope.createItem = function(itemForm) {
		if(itemForm.$valid) {
			$scope.sendingToDB = true;
			$scope.item.username = $scope.globals.currentUser.username;
			ItemService.createItem($scope.item, function(response) {
				console.log(response);
				$location.url("/items");
			}, function(error) {
				$scope.sendingToDB = false;
				console.log(error);
			});
		}
	}
	
	$scope.cancelCreate = function() {
		$location.url("/items");
	}
});