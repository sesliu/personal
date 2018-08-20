personal.controller('treinoRelController', function($rootScope, $scope, $timeout, webservicesAluno, growl, 
		                                        ngDialog, webservicesAula,$localStorage){
	
	var listaAluno =[];
	var listaAlunoSelecionado = [];
	$scope.vigente ={};
	var dadoAluno = [];
	$rootScope.relatorioDias ={};
	$rootScope.mes;
	$rootScope.ano;
	$rootScope.treinoAnterior =[];
	

	$scope.inicio = function(){
		
		webservicesAluno.buscarAlunos().success(function(data){
			
			listaAluno = data;
			
			$scope.alunoOptions = {
				title : 'Escolha os alunos',
				filterPlaceHolder : 'Buscar nome do aluno abaixo',
				labelAll : 'Não selecionados',
				labelSelected : 'selecionados',
				helpMessage : 'Clicar no nome do aluno para transferir entre os campos',
				orderProperty : 'nome',
				items : listaAluno,
				selectedItems : listaAlunoSelecionado
	};			
			
		});
		
		
	}
	
	
		
	
	
	$scope.gerarRelatorio =  function(){
		
  	$scope.carregaSpinner = true;
		var listaIdAluno = [];
		
		dadoAluno = $scope.alunoOptions.selectedItems; 
		
	
		
		for (var i = 0; i < dadoAluno.length; i++) {

			listaIdAluno.push(dadoAluno[i].idAluno);
		}

		
		if(listaIdAluno.length == 0){
			
			growl.addErrorMessage("Colocar o nome do aluno para gerar o relatório");
			$scope.carregaSpinner = false;
			return;
		}
		
		if($scope.vigente.mes == undefined){
			
			growl.addErrorMessage("Colocar o mês para gerar o relatório");
			$scope.carregaSpinner = false;
			return;
			
		}

		if($scope.vigente.ano == undefined){
			
			growl.addErrorMessage("Colocar o ano para gerar o relatório");
			$scope.carregaSpinner = false;
			return;
			
		}
		
		
		
		webservicesAula.gerarRelatorioTreino($scope.vigente.mes,$scope.vigente.ano,listaIdAluno).success(function(data){
			
			$localStorage.relatorioPDF = data.pdf;
			
			
			
			console.log($scope.pdfUrl )
			ngDialog.open({
				template : 'telas/dialogo/exibeRelatorio.html',
				className : 'ngdialog-theme-default'
				
			})
			$scope.carregaSpinner = false;
			
		
		});
		
		

		
		
	
	}
	
	
});

personal.controller('exibeRelTreino', function($scope, $rootScope,$timeout,$localStorage, $sce){
	
	
	$scope.inicio = function(){
		$scope.pdf ={};
		
	     $scope.pdf = $localStorage.relatorioPDF;
	     
	 
	  console.log($scope.pdf);

		
		
	}
	


})


personal.controller('financeiroRelController', function($rootScope, $scope, $timeout, webservicesAluno, growl, 
		                                        ngDialog, webservicesAula,$localStorage){
	
	var listaAluno =[];
	var listaAlunoSelecionado = [];
	$scope.vigente ={};
	var dadoAluno = [];
	$rootScope.relatorioDias ={};
	$rootScope.mes;
	$rootScope.ano;
	$rootScope.treinoAnterior =[];
	

	$scope.inicio = function(){
		
		webservicesAluno.buscarAlunos().success(function(data){
			
			listaAluno = data;
			$scope.alunoOptions = {
				title : 'Escolha os alunos',
				filterPlaceHolder : 'Buscar nome do aluno abaixo',
				labelAll : 'Não selecionados',
				labelSelected : 'selecionados',
				helpMessage : 'Clicar no nome do aluno para transferir entre os campos',
				orderProperty : 'nome',
				items : listaAluno,
				selectedItems : listaAlunoSelecionado
			
		});
		
		
	}
	
	
	
	
	$scope.gerarRelatorio =  function(){
		
  	$scope.carregaSpinner = true;
		var listaIdAluno = [];
		
		dadoAluno = $scope.alunoOptions.selectedItems; 
		
	
		
		for (var i = 0; i < dadoAluno.length; i++) {

			listaIdAluno.push(dadoAluno[i].idAluno);
		}

		
		if(listaIdAluno.length == 0){
			
			growl.addErrorMessage("Colocar o nome do aluno para gerar o relatório");
			$scope.carregaSpinner = false;
			return;
		}
		
		if($scope.vigente.mes == undefined){
			
			growl.addErrorMessage("Colocar o mês para gerar o relatório");
			$scope.carregaSpinner = false;
			return;
			
		}

		if($scope.vigente.ano == undefined){
			
			growl.addErrorMessage("Colocar o ano para gerar o relatório");
			$scope.carregaSpinner = false;
			return;
			
		}
		
		
		
		webservicesAula.gerarRelatorioFinanceiro($scope.vigente.mes,$scope.vigente.ano,listaIdAluno).success(function(data){
			
			$localStorage.relatorioPDF = data.pdf;
			
			
			
			console.log($scope.pdfUrl )
			ngDialog.open({
				template : 'telas/dialogo/exibeRelatorio.html',
				className : 'ngdialog-theme-default'
				
			})
			$scope.carregaSpinner = false;
			
		
		});
		
		

		
		
	
	}
	
	
});


