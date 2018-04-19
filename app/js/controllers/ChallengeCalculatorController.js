dndApp.controller('ChallengeCalculatorController', function($scope, $http) {	
	$scope.players = [];
	$scope.monsters = [];
	$scope.difficulties = ['Easy', 'Medium', 'Hard', 'Deadly'];
	$scope.difficulty = $scope.difficulties[0];
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
	$scope.easyThresholds = [0,25,50,75,125,250,300,350,450,550,600,800,1000,1100,1250,1400,1600,2000,2100,2400,2800];
	$scope.mediumThresholds = [0,50,100,150,250,500,600,750,900,1100,1200,1600,2000,2200,2500,2800,3200,3900,4200,4900,5700];
	$scope.hardThresholds = [0,75,150,225,375,750,900,1100,1400,1600,1900,2400,3000,3400,3800,4300,4800,5900,6300,7300,8500];
	$scope.deadlyThresholds = [0,100,200,400,500,1100,1400,1700,2100,2400,2800,3600,4500,5100,5700,6400,7200,8800,9500,10900,12700];
	$scope.crExpValues = [0,200,450,700,1100,1800,2300,2900,3900,5000,5900,7200,8400,10000,11500,13000,15000,18000,20000,22000,25000,33000,41000,50000,62000,75000,90000,105000,120000,135000,155000];
	$scope.expMultipliers = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5];
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