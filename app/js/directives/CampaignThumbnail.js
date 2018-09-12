dndApp.directive('campaignThumbnail', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: '/templates/directives/CampaignThumbnail.html',
		scope: {
			campaign: '=campaign'
		},
		controller: 'CampaignThumbnailController'
	}
});