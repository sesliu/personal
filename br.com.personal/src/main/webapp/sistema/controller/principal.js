personal.controller('dashController', function($scope, webservicesAluno, webservicesAula, ngDialog, $rootScope, $interval){
	

	$scope.listaAniversario = [];
	$scope.listaProfissao = [];
	$scope.listaAulas = [];
	$scope.listaFinancas = [];
	var data;
	var mes;
	var dia;
	$interval( function(){
		
		data = new Date();
		mes = data.getMonth();
		dia = data.getDate();
		ano = data.getFullYear();
		$scope.dataFormatada  = ('00'+data.getDate()).slice(-2)+'/'+('00'+(data.getMonth()+1)).slice(-2)+'/'+data.getFullYear();
		
		var dia  = data.getFullYear()+'-'+('00'+(data.getMonth()+1)).slice(-2)+'-'+('00'+data.getDate()).slice(-2);
		
		webservicesAluno.buscaAniversario(mes).success(function(data){
		
			$scope.listaAniversario = data;
			
		})
		
		webservicesAluno.buscaProfissao(mes,dia).success(function(data){
		
			$scope.listaProfissao = data;
			
		})
		
		
		
			webservicesAula.buscaAulaDia(dia).success(function(data){
		
		    $scope.listaAulas = data;
			
		})
		
		
	
		webservicesAluno.buscaFinanceiro(mes, ano).success(function(data){
			
			$scope.listaFinancas = data;
		});
		
		
	
		
		
	},1000);
	
	
	
	
	$scope.dadosAula = function(codigo){
		
		webservicesAula.buscaDadosDia(codigo).success(function(data){
			
		
			$rootScope.dadosAula = data;
					
			ngDialog.open({
						template : 'telas/dialogo/dialogoDadosAula.html',
						className : 'ngdialog-theme-default2'
					});
					
				
		});
		
	}
	
	
$scope.pagarValor =function(aluno){
		
		$scope.aluno = aluno;
		
		$scope.aluno.mes = mes;
		$scope.aluno.ano = ano;
		$scope.carregaSpinner = true;
		
		webservicesAluno.registrarPagamento($scope.aluno).success(function(data){
			growl.addSuccessMessage("Pagamento realizado com sucesso");
			$scope.listaFinancas = data;
			$scope.carregaSpinner = false;
		
		});
		
		
	}
	
	$scope.estornarValor =function(aluno){
		
		$scope.aluno = aluno;
		
		$scope.aluno.mes = mes;
		$scope.aluno.ano = ano;
		$scope.carregaSpinner = true;
		
		webservicesAluno.estornaValor($scope.aluno).success(function(data){
			
			growl.addSuccessMessage("Estorno realizado com sucesso");
			$scope.listaFinancas = data;
			$scope.carregaSpinner = false;
		
		});
		
		
	}
	
	
});


personal.controller('dadosAulaController',function($scope, $rootScope){
	
	
	$scope.dadosAula = $rootScope.dadosAula;
	
	
	
	
});



personal.controller('principalController',function($scope,$compile,$timeout){
	
	
	$scope.exibeTela = true;
	
	
	$scope.inicio = function(){
		
	$timeout(function(){
		
		$("#paginas").empty();
		var compiledeHTML = $compile("<dashboard></dashboard>")
		($scope);
		$("#paginas").append(compiledeHTML);
		
	},1000);	
		
		
		
	}
	
	
	

	
	$scope.buscarProfissao = function(){
		
		$("#paginas").empty();
		var compiledeHTML = $compile("<profissao></profissao>")
		($scope);
		$("#paginas").append(compiledeHTML);
		
	}
	
	
	
	$scope.dashboard = function(){
		
		$("#paginas").empty();
		var compiledeHTML = $compile("<dashboard></dashboard>")
		($scope);
		$("#paginas").append(compiledeHTML);
		
	}
	
	
	$scope.buscarAluno = function(){
		
		$scope.exibeTela = false;
		console.log('teste');
		$("#paginas").empty();
		var compiledeHTML = $compile("<buscaaluno></buscaaluno>")
		($scope);
		$("#paginas").append(compiledeHTML);
		
	}
	
	$scope.buscarAlunoHora = function(){
		
		$scope.exibeTela = false;
		
		$("#paginas").empty();
		var compiledeHTML = $compile("<alunohora></alunohora>")
		($scope);
		$("#paginas").append(compiledeHTML);
		
	}
	
	
	$scope.buscarTreino = function(){
		
		$scope.exibeTela = false;
		console.log('teste');
		$("#paginas").empty();
		var compiledeHTML = $compile("<buscatreino></buscatreino>")
		($scope);
		$("#paginas").append(compiledeHTML);
		
	}
	
	$scope.buscarAula = function(){
		
		$scope.exibeTela = false;
		console.log('teste');
		$("#paginas").empty();
		var compiledeHTML = $compile("<buscaaula></buscaaula>")
		($scope);
		$("#paginas").append(compiledeHTML);
		
	}
	
	$scope.buscarHistorico = function(){
		
		$scope.exibeTela = false;
		
		$("#paginas").empty();
		var compiledeHTML = $compile("<historicofinanceiro></historicofinanceiro>")
		($scope);
		$("#paginas").append(compiledeHTML);
		
	}
	
	$scope.buscarAulaExtra = function(){
		
		$scope.exibeTela = false;
		
		$("#paginas").empty();
		var compiledeHTML = $compile("<historicoaulaextra></historicoaulaextra>")
		($scope);
		$("#paginas").append(compiledeHTML);
		
	}
	
	
});
