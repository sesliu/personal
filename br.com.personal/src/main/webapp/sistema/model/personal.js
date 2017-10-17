var personal = angular.module('personal', 
							[
							'dualmultiselect',
							'ui.bootstrap',
                             'ngSanitize',
                             'ui.router',
                             'ngStorage',
                             'ngDialog',
                             'checklist-model',
                             'ngLoadingSpinner',
                             'ngMask',
                             'angular-growl',
                             'ngAnimate']
                              
  );




personal.config(function(growlProvider,ngDialogProvider) {

	growlProvider.globalTimeToLive(2500);
	
	ngDialogProvider.setDefaults({

		showClose : true,
		closeByDocument : false,
		closeByEscape : false

	});

});

personal.config(function($stateProvider, $urlRouterProvider) {
	


	$urlRouterProvider.otherwise('/personal');

	$stateProvider

	.state('personal', {

		url : '/personal',
		
		views : {
			'' : {
					templateUrl : 'telas/principal/principal.html',
				},
				
				'paginas@personal' : {
					templateUrl : 'telas/paginas/paginas.html',
				},	
			
			}

		
	})

	
});

