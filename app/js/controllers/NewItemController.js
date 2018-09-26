dndApp.controller('NewItemController', function($scope, $location, ItemService) {
	$scope.item = {};
	$scope.sendingToDB = false;
	$scope.isArmor = false;
	$scope.isWeapon = false;
	$scope.item.weaponMods = null;
	$scope.item.armorMods = null;
	$scope.armorTypes = ['Light', 'Medium', 'Heavy', 'Shield'];
	$scope.diceTypes = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];
	$scope.damageTypes = ['Acid', 'Bludgeoning', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Piercing', 'Poison', 'Psychic', 'Radiant', 'Slashing', 'Thunder'];
	
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
		if($scope.isWeapon) {
			$scope.isArmor = false;
			$scope.item.weaponMods = {};
			$scope.item.weaponMods.simple = false;
			$scope.item.weaponMods.oneHanded = false;
			$scope.item.weaponMods.damageDice = [];
		} else {
			$scope.item.weaponMods = null;
		}
	}
	
	$scope.toggleArmorSection = function() {
		if($scope.isArmor) {
			$scope.isWeapon = false;
			$scope.item.armorMods = {};
			$scope.item.armorMods.armorType = $scope.armorTypes[0];
			$scope.item.armorMods.stealthDisadvantage = false;
		} else {
			$scope.item.armorMods = null;
		}
	}
	
	$scope.addDamageDie = function() {
		var die = {
				diceNumber: 1,
				diceType: $scope.diceTypes[0],
				damageType: $scope.damageTypes[0]
		}
		$scope.item.weaponMods.damageDice.push(die);
	}
	
	$scope.removeDie = function(die) {
		$scope.item.weaponMods.damageDice.splice($scope.item.weaponMods.damageDice.indexOf(die), 1);
	}
});