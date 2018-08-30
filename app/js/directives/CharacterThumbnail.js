dndApp.directive('characterThumbnail', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: '/templates/directives/CharacterThumbnail.html',
		scope: {
			character: '=character'
		},
		controller: 'CharacterThumbnailController'
	}
});