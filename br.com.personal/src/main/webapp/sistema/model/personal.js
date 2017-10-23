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
	.state('mobile', {

		url : '/mobile',
		
		views : {
			'' : {
					templateUrl : 'telas/mobile/mobile.html',
				}
				
				
			}

		
	})
	

	
});

personal .filter('formataData',function(){
    return function(input){
        if(angular.isDefined(input)){
        	
        	input = input.replace("-","");
        	input = input.replace("-","");
            if(input.length >= 8){
                input = input.slice(0,8);
                
                input = input.slice(6,8)  + '/' + input.slice(4,6) + '/' + input.slice(0,4);
            }
           
        }
        return input;
    };
});

