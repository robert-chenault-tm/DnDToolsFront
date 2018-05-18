dndApp.controller('ItemListController', function($scope, $location, ItemService) {
	
	function initVars() {
		$scope.official = true;
		$scope.owned = true;
		$scope.others = true;
		$scope.pageSizes = [5,10,50,100];
		$scope.perPage = $scope.pageSizes[0];
		$scope.currentPage = 1;
		$scope.searchTermTemp = '';
		$scope.searchTerm ='';
		$scope.totalItems = 0;
	}
	
	function populate(skip, num) {
		var details = getDetails();
		details.skip = skip;
		details.num = num;
		ItemService.getXItems(details, function(response) {
			$scope.items = response.data;
		}, function(error) {
			$scope.items = [];
			console.log(error);
		});
	}
	
	function getDetails() {
		return {
			username: $scope.globals.currentUser.username,
			search: $scope.searchTerm,
			official: $scope.official,
			owned: $scope.owned,
			others: $scope.others
		}
	}
	
	$scope.goToPage = function(page) {
		if(page >= 1 && page <= $scope.pages.length + 1) {
			populate($scope.perPage*(page - 1), $scope.perPage);
			$scope.currentPage = page;
		}
	}
	
	$scope.search = function() {
		$scope.searchTerm = $scope.searchTermTemp;
		var details = getDetails();
		ItemService.getResultCount(details, function(response) {
			$scope.totalItems = response.data;
			$scope.calculatePages();
		}, function(error) {
			$scope.totalItems = 0;
			$scope.numPages = 1;
			$scope.pages = [1];
			console.log(error);
		});
	}
	
	$scope.calculatePages = function() {
		$scope.pages = [];
		$scope.numPages = $scope.totalItems / $scope.perPage;
		for(var i = 0;i < $scope.numPages;i++) {
			$scope.pages.push(i+1);
		}
		$scope.goToPage(1);
	}
	
	initVars();
});