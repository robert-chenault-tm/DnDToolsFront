dndApp.controller('NewItemController', function($scope, $location, ItemService) {
	$scope.item = {};
	$scope.sendingToDB = false;
	$scope.isArmor = false;
	$scope.isWeapon = false;
	$scope.item.weaponMods = null;
	$scope.item.armorMods = null;
	$scope.armorTypes = ['Light', 'Medium', 'Heavy', 'Shield'];
	
	$scope.createItem = function(itemForm) {
		if(itemForm.$valid) {
			$scope.sendingToDB = true;
			$scope.item.username = $scope.globals.currentUser.username;
			console.log($scope.item);
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
	
	$scope.toggleWeaponSection = function() {
		
	}
	
	$scope.toggleArmorSection = function() {
		if($scope.isArmor) {
			console.log("true");
			$scope.item.armorMods = {};
			$scope.item.armorMods.armorType = $scope.armorTypes[0];
			$scope.item.armorMods.stealthDisadvantage = false;
		} else {
			console.log("false");
			$scope.item.armorMods = null;
		}
	}
});