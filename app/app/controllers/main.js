/*	Main Controller
---------------------------------------------------------------------- */
app.controller('mainController', function($scope, $rootScope, $location, $route, $routeParams, $timeout, $resource){
	//Get Current View From Router
	$scope.$on('$routeChangeSuccess', function(){
		$scope.currentView = $route.current.action;
	});
});