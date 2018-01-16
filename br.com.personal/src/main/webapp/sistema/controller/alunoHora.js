personal.controller('alunoHoraController',function($scope, growl, ngDialog, $timeout, $rootScope, webservicesAluno,$compile){
	
	$scope.busca;
	$scope.listaAlunoHora = [];
	$scope.aluno ={};
	

	$scope.carregaSpinner = true;
	
	$rootScope.aluno;
	
	$timeout(function(){
		
		webservicesAluno.buscarAlunoHora().success(function(data){
			
			$scope.listaAlunoHora = data;
			$scope.carregaSpinner = false;
		});
		
	})
	
	$scope.exibirValor = function(aluno){
		
		$rootScope.aluno = aluno;
		ngDialog.open({
			template : 'telas/dialogo/dialogoAlterarValor.html',
			className : 'ngdialog-theme-default'
			
			
		});
		
	
		
	}
	
	
	
	
});

personal.controller('ajusteController',function($scope, $rootScope, $compile, webservicesAluno,$timeout,ngDialog){
	
	$scope.exibeMensagemOk = false;
	$scope.carregaSpinner = true;
	$scope.aluno = $rootScope.aluno;
	
	
$scope.gravar = function(){
	 $scope.carregaSpinner = true;
	 
		webservicesAluno.atualizarValor($scope.aluno).success(function(){
		
			$scope.exibeMensagemOk = true;
			$scope.carregaSpinner = false;
			$timeout(function(){
				$scope.exibeMensagemOk = false;
			
				
			},1000)
		
		
	});
}		

 $scope.carregarTela = function(){
	 
	$timeout(function(){
		$("#paginas").empty();
		var compiledeHTML = $compile("<alunohora></alunohora>")
		($rootScope);
		$("#paginas").append(compiledeHTML);
		
		
	},200)	
	
		
 }
	
	
})