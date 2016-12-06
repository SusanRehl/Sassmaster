var myApp = angular.module("myApp", ["ngRoute", "ui.bootstrap"]);

myApp.controller("homeController", ["$scope", function($scope){
    console.log("Loaded home");
}]);

myApp.controller("codingController", ["$scope", function($scope){
    console.log("Loaded coding");
}]);

myApp.controller("designController", ["$scope", function($scope){
    console.log("Loaded design");
}]);

myApp.controller("hobbiesController", ["$scope", function($scope){
    console.log("Loaded hobbies");

    $scope.myInterval = 5000;  // interval between slides
    $scope.noWrapSlides = false;  // wraps slides
    $scope.active = 0;  // sets index of first (active) slide to 0
    var slides = $scope.slides = [];  // creates empty array for slides
    var currIndex = 0;  // sets currIndex id to 0

    $scope.addSlide = function() {  // adds slides, text, and id to array
      var newWidth = 600 + slides.length + 3;  // changing width gives you different pictures from unsplash.it
      slides.push({
        image: '//unsplash.it/' + newWidth + '/300',  // uses unsplash.it website of placeholder images. newWidth and 300 are width and height for unsplash.it
        text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
        id: currIndex++
      });
    };

      for (var i = 0; i < 4; i++) {   // runs addSlide function 4 times for the 4 pix
        $scope.addSlide();
      }

        console.log(slides);

      // $scope.getItalySlides = function() {
        // gets all slides for Italy carousel on Hobbies page
        // event.preventDefault();
        // $http({
          // gets recordset via GET
        //   method: 'GET',
        //   url: '/italyslides',
        // }).then( function(response){
          // success call - runs function with response parameter
          // slides = response.data;
          // pulls the data from app.js and sets to global var slides
        // }, function myError(response){
        //   console.log(response.statusText);
        // }
        // end error function
        // );
        // end then response
      // };
      // end getItalySlides function

}]);

myApp.controller("contactController", ["$scope", function($scope){
    console.log("Loaded contact");
}]);

myApp.controller("blogController", ["$scope", function($scope){
    console.log("Loaded blog");
}]);

myApp.controller("navCtrl", ["$scope", "$location", function($scope, $location){ // controller for navigation
		$scope.isActive = function(route) {
			return route === $location.path();
		};
}]);

//MODAL CODE
myApp.directive('modalDialog', function() { //
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true,
    transclude: true,
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>" // See below
  };
}); // end app.directive

myApp.controller("modalController", ["$scope", function($scope) {
  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };
}]); // end modalController

myApp.config(["$routeProvider", function($routeProvider) {   //  controller for routes
	console.log("in scripts in config function");
	$routeProvider.
	  when("/home", {
			templateUrl: "/views/routes/home.html",
      controller: "homeController"
		}).
		when("/coding", {
			templateUrl: "/views/routes/coding.html",
      controller: "codingController"
		}).
		when("/design", {
			templateUrl: "/views/routes/design.html",
      controller: "designController"
		}).
    when("/hobbies", {
			templateUrl: "/views/routes/hobbies.html",
      controller: "hobbiesController"
		}).
		when("/contact", {
			templateUrl: "/views/routes/contact.html",
			controller: "contactController"
		}).
    when("/blog", {
			templateUrl: "/views/routes/blog.html",
      controller: "blogController"
		}).
		otherwise({
			redirectTo: "/home"
		});

	}]);
