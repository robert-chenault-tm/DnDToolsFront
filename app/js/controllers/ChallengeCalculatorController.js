dndApp.controller('ChallengeCalculatorController', function($scope, $http, StaticDataService) {
	$scope.players = [];
	$scope.monsters = [];
	$scope.difficulties = ['Easy', 'Medium', 'Hard', 'Deadly'];
	$scope.difficulty = $scope.difficulties[0];
	
	StaticDataService.getEncounterDifficultyData(function(response) {
		$scope.crExpValues = response.data.crExpValues;
		$scope.easyThresholds = response.data.easyThresholds;
		$scope.mediumThresholds = response.data.mediumThresholds;
		$scope.hardThresholds = response.data.hardThresholds;
		$scope.deadlyThresholds = response.data.deadlyThresholds;
		$scope.expMultipliers = response.data.expMultipliers;
		console.log(response.data);
	}, function(error) {
		console.log('Error' - error);
	});
	
	$scope.addPlayer = function() {
		var obj = {
				name: '',
				level: 1
		}
		$scope.players.push(obj);
	}
	$scope.addMonster = function() {
		var obj = {
				name: '',
				cr: 1
		}
		$scope.monsters.push(obj);
	}
	
	$scope.numPlayers = $scope.players.length;
	$scope.removePlayer = function(element) {
		$scope.players.splice($scope.players.indexOf(element), 1);
	}
	$scope.removeMonster = function(element) {
		$scope.monsters.splice($scope.monsters.indexOf(element), 1);
	}
	$scope.calculateTotals = function() { 
		$scope.calculation = 'For a challenge of ' + $scope.difficulty + ' your the appropriate encounter experience level is ' + sumCharacterExp() + ' and the encounter experience level with the selected monsters is ' + sumMonsterExp(); 
	}
	
	function sumCharacterExp() {
		var sum = 0;
		var threshold;
		switch ($scope.difficulty) {
			case $scope.difficulties[0]:
				threshold = $scope.easyThresholds;
				break;
			case $scope.difficulties[1]:
				threshold = $scope.mediumThresholds;
				break;
			case $scope.difficulties[2]:
				threshold = $scope.hardThresholds;
				break;
			case $scope.difficulties[3]:
				threshold = $scope.deadlyThresholds;
				break;
		}
		angular.forEach($scope.players, function(value, key) {
			sum += threshold[value.level];
		});
		return sum;
	}
	
	function sumMonsterExp() {
		var sum = 0;
		angular.forEach($scope.monsters, function(value, key) {
			sum += $scope.crExpValues[value.cr];
		});
		var multiIndex;
		var numMonsters = $scope.monsters.length;
		if(numMonsters == 0) {
			return 0;
		} else if(numMonsters == 1) {
			multiIndex = 1;
		} else if(numMonsters == 2) {
			multiIndex = 2;
		} else if(numMonsters >= 3 && numMonsters <= 6) {
			multiIndex = 3;
		} else if(numMonsters >=7 && numMonsters <= 10) {
			multiIndex = 4;
		} else if(numMonsters >=11 && numMonsters <= 14) {
			multiIndex = 5;
		} else {
			multiIndex = 6;
		}
		
		if($scope.players.length < 3) {
			multiIndex++;
		} else if($scope.players.length > 5) {
			multiIndex--;
		}
		
		sum *= $scope.expMultipliers[multiIndex];
		
		return sum;
	}
});