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
                            
                             'ngAnimate']
                              
  );




personal.config(function(ngDialogProvider) {

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

