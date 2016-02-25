describe("Search Controller", function(){
	var $scope
	, 	$location;

	beforeEach(module("movieApp"));

	beforeEach(inject(function(_$controller_, _$location_){

		$scope = {};
		$location = _$location_;

		_$controller_("SearchCtrl", {$scope: $scope, $location, $location});

	}));

	it("should redirect to the query results page for non-empty query", function(){
		$scope.query = "star wars";
		$scope.search();

		expect($location.url()).toBe("/result?q=star%20wars");
	});

	it("should not redirect to query results for empty query", function(){
		$scope.query = "";
		$scope.search();

		expect($location.url()).toBe("");
	});
});