personal.controller('celebracaoController',function(webservicesAluno,$scope,$interval,$timeout){
	
	
	$scope.listaAniversario = [];
	$scope.listaProfissao = [];
	$scope.mesvigente ={};
	
	var data;
	var mes;
	var dia;
	var dias;
	
	
	$scope.inicioAniversario = function(){
		
		data = new Date();
		mes = data.getMonth();
		dias = data.getDate();
		ano = data.getFullYear();
		
		 if(mes == "0"){
			 
			 $scope.mesvigente =  'Janeiro';
		 }else 
			 if(mes == "1"){
				 
			 $scope.mesvigente =  'Fevereiro';
		 }else	
		 if(mes == "2"){
			 
			 $scope.mesvigente =  'março';
		 }else
		 if(mes == "3"){
			 
			 $scope.mesvigente =  'Abril';
		 }else	 
		 if(mes == "4"){
			 
			 $scope.mesvigente =  'Maio';
		 }else
		 if(mes == "5"){
			 
			 $scope.mesvigente =  'Junho';
		 }else
		 if(mes == "6"){
			 
			 $scope.mesvigente =  'Julho';
		 }else
		 
		 if(mes == "7"){
			 
			 $scope.mesvigente =  'Agosto';
		 }else
		 if(mes == "8"){
			 
			 $scope.mesvigente =  'Setembro';
		 }else
		if(mes == "9"){
		 
			$scope.mesvigente =  'Outubro';
	 	}else
		if(mes == "10"){
	 
			$scope.mesvigente =  'Novembro';
		}else
		if(mes == "11"){
			 
			$scope.mesvigente =  'Dezembro';
		}
		
		
		
		
		$scope.dataFormatada  = ('00'+data.getDate()).slice(-2)+'/'+('00'+(data.getMonth()+1)).slice(-2)+'/'+data.getFullYear();
		
		 dia  = data.getFullYear()+'-'+('00'+(data.getMonth()+1)).slice(-2)+'-'+('00'+data.getDate()).slice(-2);
		
		 $scope.carregaSpinner = true;
			 
			 webservicesAluno.buscaAniversario(mes).success(function(data){
					
					$scope.listaAniversario = data;
					$scope.carregaSpinner = false;
						
				});
	
	}
	

	$scope.inicioProfissional = function(){
		
		data = new Date();
		mes = data.getMonth();
		dias = data.getDate();
		ano = data.getFullYear();
		
		 if(mes == "0"){
			 
			 $scope.mesvigente =  'Janeiro';
		 }else 
			 if(mes == "1"){
				 
			 $scope.mesvigente =  'Fevereiro';
		 }else	
		 if(mes == "2"){
			 
			 $scope.mesvigente =  'março';
		 }else
		 if(mes == "3"){
			 
			 $scope.mesvigente =  'Abril';
		 }else	 
		 if(mes == "4"){
			 
			 $scope.mesvigente =  'Maio';
		 }else
		 if(mes == "5"){
			 
			 $scope.mesvigente =  'Junho';
		 }else
		 if(mes == "6"){
			 
			 $scope.mesvigente =  'Julho';
		 }else
		 
		 if(mes == "7"){
			 
			 $scope.mesvigente =  'Agosto';
		 }else
		 if(mes == "8"){
			 
			 $scope.mesvigente =  'Setembro';
		 }else
		if(mes == "9"){
		 
			$scope.mesvigente =  'Outubro';
	 	}else
		if(mes == "10"){
	 
			$scope.mesvigente =  'Novembro';
		}else
		if(mes == "11"){
			 
			$scope.mesvigente =  'Dezembro';
		}
		
		
		
		
		$scope.dataFormatada  = ('00'+data.getDate()).slice(-2)+'/'+('00'+(data.getMonth()+1)).slice(-2)+'/'+data.getFullYear();
		
		 dia  = data.getFullYear()+'-'+('00'+(data.getMonth()+1)).slice(-2)+'-'+('00'+data.getDate()).slice(-2);
		
		 $scope.carregaSpinner = true;
			 
	    webservicesAluno.buscaProfissao(mes,dias).success(function(data){
				
				$scope.listaProfissao = data;
				$scope.carregaSpinner = false;
				
			})	
	
	}
	
	
	
});