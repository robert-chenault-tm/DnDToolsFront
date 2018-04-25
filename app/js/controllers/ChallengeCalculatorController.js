dndApp.controller('ChallengeCalculatorController', function($scope, $http, StaticDataService) {
	
	function init() {
		$scope.players = [];
		$scope.monsters = [];
		$scope.defaultPlayerLevel = 1;
		$scope.defaultMonsterCR = '1';
		$scope.playerError = false;
		$scope.monsterError = false;
		$scope.trivialEncounter = false;
		$scope.calculatedExp = 0;
		$scope.partyThreshold = {
				easy: {val: 0, active: false},
				medium: {val: 0, active: false},
				hard: {val: 0, active: false},
				deadly: {val: 0, active: false}
		};
		
		
		StaticDataService.getEncounterDifficultyData(function(response) {
			$scope.crExpValues = response.data.crExpValues;
			$scope.easyThresholds = response.data.easyThresholds;
			$scope.mediumThresholds = response.data.mediumThresholds;
			$scope.hardThresholds = response.data.hardThresholds;
			$scope.deadlyThresholds = response.data.deadlyThresholds;
			$scope.expMultipliers = response.data.expMultipliers;
		}, function(error) {
			console.log('Error' - error);
		});
	}
	
	function sumCharacterExp() {
		var easy;
		var medium;
		var hard;
		var deadly;
		$scope.playerError = false;
		$scope.partyThreshold = {
				easy: {val: 0, active: false},
				medium: {val: 0, active: false},
				hard: {val: 0, active: false},
				deadly: {val: 0, active: false}
		};

		angular.forEach($scope.players, function(value, key) {
			easy = $scope.easyThresholds[value.level];
			medium = $scope.mediumThresholds[value.level];
			hard = $scope.hardThresholds[value.level];
			deadly = $scope.deadlyThresholds[value.level];
			if(!isNaN(easy) && !isNaN(medium) && !isNaN(hard) && !isNaN(deadly)) {
				$scope.partyThreshold.easy.val += easy;
				$scope.partyThreshold.medium.val += medium;
				$scope.partyThreshold.hard.val += hard;
				$scope.partyThreshold.deadly.val += deadly;
			} else {
				$scope.playerError = true;
			}
		});
	}
	
	function sumMonsterExp() {
		$scope.partyThreshold.easy.active = false;
		$scope.partyThreshold.medium.active = false;
		$scope.partyThreshold.hard.active = false;
		$scope.partyThreshold.deadly.active = false;
		$scope.monsterError = false;
		$scope.trivialEncounter = false;
		var sum = 0;
		var current;
		angular.forEach($scope.monsters, function(value, key) {
			current = $scope.crExpValues[value.cr];
			if(!isNaN(current)) {
				sum += $scope.crExpValues[value.cr];
			} else {
				$scope.monsterError = true;
			}	
		});
		var multiIndex;
		var numMonsters = $scope.monsters.length;
		if(numMonsters == 0) {
			$scope.calculatedExp = sum;
			return;
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
		
		if(sum >= $scope.partyThreshold.deadly.val) {
			$scope.partyThreshold.deadly.active = true;
		} else if(sum >= $scope.partyThreshold.hard.val) {
			$scope.partyThreshold.hard.active = true;
		} else if(sum >= $scope.partyThreshold.medium.val) {
			$scope.partyThreshold.medium.active = true;
		} else if(sum >= $scope.partyThreshold.easy.val) {
			$scope.partyThreshold.easy.active = true;
		} else {
			$scope.trivialEncounter = true;
		}
		
		$scope.calculatedExp = sum;
	}
	
	$scope.addPlayer = function() {
		var level = $scope.defaultPlayerLevel;
		if(isNaN(level)) {
			level = 1;
		}
		var obj = {
				name: '',
				level: level
		}
		$scope.players.push(obj);
		$scope.calculateTotals();
	}
	
	$scope.addMonster = function() {
		var fractions = ['1/2', '1/4', '1/8'];
		var cr = $scope.defaultMonsterCR;
		if((isNaN(cr) && fractions.indexOf(cr) == -1) || (!isNaN(cr) && (cr > 30 || cr < 0))) {
			cr = 1;
		} 
		var obj = {
				name: '',
				cr: cr
		}
		$scope.monsters.push(obj);
		sumMonsterExp();
	}
	
	$scope.removePlayer = function(element) {
		$scope.players.splice($scope.players.indexOf(element), 1);
		$scope.calculateTotals();
	}
	
	$scope.removeMonster = function(element) {
		$scope.monsters.splice($scope.monsters.indexOf(element), 1);
		sumMonsterExp();
	}
	
	$scope.calculateTotals = function() { 
		sumCharacterExp();
		sumMonsterExp(); 
	}
	
	init();
	
});