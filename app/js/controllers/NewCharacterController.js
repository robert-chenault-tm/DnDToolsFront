dndApp.controller('NewCharacterController', function($scope) {
	$scope.character = {};
	var dummyClasses = [
		{
			class_id: '1',
			class_name: 'Bard'
		},
		{
			class_id: '2',
			class_name: 'Wizard'
		},
		{
			class_id: '3',
			class_name: 'Ranger'
		}
	];
	var dummyRaces = [
		{
			race_id: '1',
			race_name: 'Human'
		},
		{
			race_id: '2',
			race_name: 'Elf'
		},
		{
			race_id: '3',
			race_name: 'Dwarf'
		},
		{
			race_id: '4',
			race_name: 'Dragonborn'
		},
	];
	$scope.classes = dummyClasses;
	$scope.races = dummyRaces;
});