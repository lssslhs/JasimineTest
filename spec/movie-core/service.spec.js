"use strict";

describe("Movie Core", function(){
	var PopularMovies,
		$httpBackend;

	beforeEach(module("movieCore"));

	beforeEach(inject(function(_PopularMovies_, _$httpBackend_){
		PopularMovies = _PopularMovies_;
		$httpBackend = _$httpBackend_;
	}));

	afterEach(function(){
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	})

	it("should create popular movies", function(){
		
		var expectedData = function(data) {
			return angular.fromJson(data).movieId === "tt0076795";
		}

		$httpBackend.expectPOST(/./, expectedData)
			.respond(201);

		var popularMovie = new PopularMovies({
			movieId: "tt0076795",
			description: "Great movie!",
		});

		popularMovie.$save();

		expect($httpBackend.flush).not.toThrow();
	});

	it("should get popular movie by id", function(){
		$httpBackend.expectGET(function(url){
			dump(url);
			return true;
		}).respond(200);

		PopularMovies.get({movieId : "tt0076795"});

		expect($httpBackend.flush).not.toThrow();
	});

	it("should update popular movie by id", function(){
		$httpBackend.expectPUT(function(url){
			dump(url);
			return true;
		}).respond(200);

		var popularMovie = new PopularMovies({
			movieId: "tt0076795",
			description: "Great movie!",
		});

		popularMovie.$update();

		expect($httpBackend.flush).not.toThrow();
	});

	it("should authenticate request", function(){
		//{"authToken": "michael","Accept": "application/json, text/plain, */*"}
		var headerData = function(headers) {
			return angular.fromJson(headers).authToken === "michael";
		};

		var matchAny = /.*/;

		$httpBackend.whenGET(matchAny, headerData)
			.respond(200);

		$httpBackend.expectPOST(matchAny, matchAny, headerData)
			.respond(200);

		$httpBackend.expectPUT(matchAny, matchAny, headerData)
			.respond(200);

		$httpBackend.expectDELETE(matchAny, headerData)
			.respond(200);

		var popularMovie = {id: "tt0076795", description: "Great Movie" };

		PopularMovies.query();
		PopularMovies.get({movieId: "tt0076795"});
		new PopularMovies(popularMovie).$save();
		new PopularMovies(popularMovie).$update();
		new PopularMovies(popularMovie).$remove();

		expect($httpBackend.flush).not.toThrow();
	});
});