"use strict";

describe("Result Controller", function(){
	var results = {
		"Search": [
			{
				"Title": "Star Wars 4",
				"Year": "1977",
				"imdbID": "tt0076759",
				"Type": "movie"
			},
			{
				"Title": "Star Wars 5",
				"Year": "1980",
				"imdbID": "tt0080684",
				"Type": "movie"
			},
			{
				"Title": "Star Wars 6",
				"Year": "1983",
				"imdbID": "tt0086190",
				"Type": "movie"
			}
		]
	};

	var $controller
	,	$q	
	,	$scope
	,	$rootScope
	,	$location
	,	omdbApi;

	beforeEach(module("omdb"));
	beforeEach(module("movieApp"));

	beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, _$location_, _omdbApi_){
		$controller = _$controller_;
		$q = _$q_;
		$rootScope = _$rootScope_;
		$location = _$location_;
		omdbApi = _omdbApi_;
		$scope = {};
	}));

	it("should load search results", function(){
		spyOn(omdbApi, "search").and.callFake(function(){
			var deferred = $q.defer();
			deferred.resolve(results);

			return deferred.promise;
		});
		$location.search("q", "star wars");
		$controller("ResultCtrl", {$scope, $scope, $location, $location});
		$rootScope.$apply();

		expect($scope.results[0].Title).toBe(results.Search[0].Title);
		expect($scope.results[1].Title).toBe(results.Search[1].Title);
		expect($scope.results[2].Title).toBe(results.Search[2].Title);
		expect(omdbApi.search).toHaveBeenCalledWith("star wars");
	});

	it("should set result status to error", function(){
		spyOn(omdbApi, "search").and.callFake(function(){
			var deferred = $q.defer();
			deferred.reject();

			return deferred.promise;
		});

		$location.search("q", "star wars");
		$controller("ResultCtrl", {$scope, $scope, $location, $location});
		$rootScope.$apply();

		expect($scope.err).toBe("Something went wrong");

	});
});