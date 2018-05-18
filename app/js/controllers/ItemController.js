dndApp.controller('ItemController', function($scope, $routeParams, ItemService) {
	ItemService.getItem($routeParams.itemId, function(response) {
		$scope.item = response.data;
		if($scope.item.armorMods != null) {
			$scope.type = 'Armor';
		} else if($scope.item.weaponMods != null) {
			$scope.type = 'Weapon';
		} else {
			$scope.type = 'Adventuring gear';
		}
	}, function(error) {
		console.log(error);
	});
});