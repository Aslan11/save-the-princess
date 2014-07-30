/*	Define Angular App
---------------------------------------------------------------------- */
var app = angular.module('app', ['ngRoute', 'ngResource', 'ngAnimate', 'ngCookies', 'ngSanitize', 'ngTouch']);

/* Angular SPA Routing
---------------------------------------------------------------------- */
app.config(function($httpProvider, $routeProvider, $locationProvider){
	$routeProvider.
		when('/save-the-princess', {
			action: 'home'
		}).
		
		when('/save-the-princess/instruction', {
			action: 'instruction'
		}).
		
		when('/save-the-princess/game', {
			action: 'game'
		}).
		
		otherwise({ redirectTo: '/' });

	// Remove "#" from the URL (Except for IE < 10)
	if(window.history && window.history.pushState){
		$locationProvider.html5Mode(true);
	}
});