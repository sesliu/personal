personal.controller('financeiroController',function($scope, $rootScope,$timeout, webservicesAluno, $interval, growl){
	
	$scope.vigente ={};
	$scope.listaFinancas={};
	
	$scope.carregaSpinner = true;
	
	var data = new Date();
	var mes = data.getMonth();
	var ano = data.getFullYear();
	
	webservicesAluno.buscaFinanceiro(mes, ano).success(function(data){
		
		$scope.listaFinancas = data;
		$scope.carregaSpinner = false;
	});
	
	mes = JSON.stringify(mes);
	ano = JSON.stringify(ano);
	
	$scope.vigente = {'mes':mes , 'ano':ano};
	
	$interval(function(){
		
		webservicesAluno.buscaFinanceiro($scope.vigente.mes, $scope.vigente.ano).success(function(data){
			
			$scope.listaFinancas = data;
		});
		
		
	},1000, false)
	
	
	$scope.pagarValor =function(aluno){
		
		$scope.aluno = aluno;
		
		$scope.aluno.mes = $scope.vigente.mes;
		$scope.aluno.ano = $scope.vigente.ano;
		$scope.carregaSpinner = true;
		
		webservicesAluno.pagarValor($scope.aluno).success(function(data){
			growl.addSuccessMessage("Pagamento realizado com sucesso");
			$scope.listaFinancas = data;
			$scope.carregaSpinner = false;
		
		});
		
		
	}
	
	$scope.estornarValor =function(aluno){
		
		$scope.aluno = aluno;
		
		$scope.aluno.mes = $scope.vigente.mes;
		$scope.aluno.ano = $scope.vigente.ano;
		$scope.carregaSpinner = true;
		
		webservicesAluno.estornaValor($scope.aluno).success(function(data){
			
			growl.addSuccessMessage("Estorno realizado com sucesso");
			$scope.listaFinancas = data;
			$scope.carregaSpinner = false;
		
		});
		
		
	}

});