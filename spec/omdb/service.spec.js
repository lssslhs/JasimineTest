"use strict"

describe("omdb service", function(){
	var movieData = {
		"Title":"Star Wars",
		"Year":"1983",
		"Rated":"N/A",
		"Released":"01 May 1983",
		"Runtime":"N/A",
		"Genre":"Action, Adventure, Sci-Fi",
		"Director":"N/A",
		"Writer":"N/A",
		"Actors":"Harrison Ford, Alec Guinness, Mark Hamill, James Earl Jones",
		"Plot":"N/A",
		"Language":"English",
		"Country":"USA",
		"Awards":"N/A",
		"Poster":"N/A",
		"Metascore":"N/A",
		"imdbRating":"7.8",
		"imdbVotes":"349",
		"imdbID":"tt0251413",
		"Type":"game",
		"Response":"True"
	};

	var movieDateById = {"Title":"Star Wars: Episode IV - A New Hope","Year":"1977","Rated":"PG","Released":"25 May 1977","Runtime":"121 min","Genre":"Action, Adventure, Fantasy","Director":"George Lucas","Writer":"George Lucas","Actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing","Plot":"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.","Language":"English","Country":"USA","Awards":"Won 6 Oscars. Another 38 wins & 28 nominations.","Poster":"http://ia.media-imdb.com/images/M/MV5BMTU4NTczODkwM15BMl5BanBnXkFtZTcwMzEyMTIyMw@@._V1_SX300.jpg","Metascore":"92","imdbRating":"8.7","imdbVotes":"865,651","imdbID":"tt0076759","Type":"movie","Response":"True"};

	var omdbApi = {};
	var $httpBackend;

	beforeEach(module("omdb"));
	beforeEach(inject(function(_omdbApi_, _$httpBackend_){
		omdbApi = _omdbApi_;
		$httpBackend = _$httpBackend_;
	}))

	it("should return search movie data", function(){
		var response ;

		var expectedUrl = "http://www.omdbapi.com/?v=1&s=star%20wars";

		$httpBackend.when("GET", expectedUrl).respond(200, movieData);

		omdbApi.search("star wars")
			.then(function(data) {
				response = data;
			});

		$httpBackend.flush();

		expect(response).toEqual(movieData);
	});

	it("should return movie date by id", function(){
		var response;

		var expectedUrl = "http://www.omdbapi.com/?v=1&i=tt0076759";

		$httpBackend.expect("GET", expectedUrl).respond(200, movieDateById);

		omdbApi.find("tt0076759")
			.then(function(data){
				response = data;
			});

		$httpBackend.flush();

		expect(response).toEqual(movieDateById);
	});

	it("should handle error", function(){
		var response;

		var expectedUrl = "http://www.omdbapi.com/?v=1&i=tt0076759";

		$httpBackend.expect("GET", expectedUrl).respond(500);

		omdbApi.find("tt0076759")
			.then(function(data){
				response = data;
			})
			.catch(function(){
				response = "Error";
			});

		$httpBackend.flush();

		expect(response).toEqual("Error");
	});

});