/*	Define Angular App
---------------------------------------------------------------------- */
var app = angular.module('app', ['ngRoute', 'ngResource', 'ngAnimate', 'ngCookies', 'ngSanitize', 'ngTouch']);

/* Angular SPA Routing
---------------------------------------------------------------------- */
app.config(function($httpProvider, $routeProvider, $locationProvider){
	$routeProvider.
		when('/', {
			action: 'home'
		}).
		
		when('/instruction', {
			action: 'instruction'
		}).
		
		when('/game', {
			action: 'game'
		}).
		
		otherwise({ redirectTo: '/' });

	// Remove "#" from the URL (Except for IE < 10)
	if(window.history && window.history.pushState){
		$locationProvider.html5Mode(true);
	}
});