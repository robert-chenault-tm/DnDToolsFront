dndApp.directive('itemThumbnail', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: '/templates/directives/ItemThumbnail.html',
		scope: {
			item: '=item'
		},
		controller: 'ItemThumbnailController'
	}
});