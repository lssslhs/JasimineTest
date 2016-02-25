var movieApp = angular.module("movieApp", ["omdb", "ui.bootstrap", "ngRoute"]);

movieApp.config(["$routeProvider", function($routeProvider){

	$routeProvider.
	when("/result",{
		templateUrl: "src/results.html",
		controller: "ResultCtrl"
	}).
	otherwise({
		redirectTo: "/"
	})

}]);


movieApp.controller("SearchCtrl", ["$scope", "$location", 
	function($scope, $location){
		$scope.search = function() {
			console.log("search press");
			if($scope.query) {
				console.log($scope.query);
				$location.path("result").search("q", $scope.query);
			}
		}
	}]);

movieApp.controller("ResultCtrl",["$scope", "$location", "omdbApi", 
	function($scope, $location, omdbApi){
		var query = $location.search().q;

		omdbApi.search(query)
			.then(function(data){
				$scope.results = data.Search;
				console.log($scope.results);
			}).catch(function(){
				$scope.err = "Something went wrong";
			});
}]);