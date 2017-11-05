personal.controller('dashController', function($scope, webservicesAluno, webservicesAula, ngDialog, $rootScope, $interval, 
		$timeout, growl){
	

	$scope.listaAniversario = [];
	$scope.listaProfissao = [];
	$scope.listaAulas = [];
	$scope.listaFinancas = [];
	$scope.listaMontante = [];
	$scope.montante = '0.00';
	var data;
	var mes;
	var dia;
	var dias;
	$scope.vigente = {};
	
	$interval( function(){
		
		data = new Date();
		mes = data.getMonth();
		dias = data.getDate();
		ano = data.getFullYear();
		
		
		
		$scope.dataFormatada  = ('00'+data.getDate()).slice(-2)+'/'+('00'+(data.getMonth()+1)).slice(-2)+'/'+data.getFullYear();
		
		 dia  = data.getFullYear()+'-'+('00'+(data.getMonth()+1)).slice(-2)+'-'+('00'+data.getDate()).slice(-2);
	
	},1000);
	
	
	$scope.inicio = function(){
		
		let data = new Date();
		let mes = data.getMonth();
		let ano = data.getFullYear();
		
		mes = JSON.stringify(mes);
		ano = JSON.stringify(ano);
		
			$scope.vigente = { 'mes' : mes, 'ano' : ano } 
		
			webservicesAluno.buscaMontante($scope.vigente.mes, $scope.vigente.ano).success(function(data){
				
				$scope.montante = data.valorTotal;
				
				if($scope.montante == null){
					
					$scope.montante = '0.00';
				}
				
			});
		
	}
	

	$scope.alteraDias = function(){
		
		webservicesAluno.buscaMontante($scope.vigente.mes, $scope.vigente.ano).success(function(data){
			
			$scope.montante = data.valorTotal;
			
			if($scope.montante == null){
				
				$scope.montante = '0.00';
			}
			
		});
	}
	
	
	$interval( function(){
		
		
		
		$timeout(function(){
			
			webservicesAula.buscaAulaDia(dia).success(function(data){
				
			    $scope.listaAulas = data;
				
			})
			
		},2000)
		
	
		
		$timeout(function(){
			
			webservicesAluno.buscaFinanceiro(mes, ano).success(function(data){
				
				$scope.listaFinancas = data;
			});
			
		},2000)
	
		
		$timeout(function(){
			
			
			webservicesAluno.buscaMontante($scope.vigente.mes, $scope.vigente.ano).success(function(data){
				
				$scope.montante = data.valorTotal;
				
				if($scope.montante == null){
					
					$scope.montante = '0.00';
				}
				
			});
			
		},2000)
	
		
		
	},1500,false);
	
	
	
	
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
		$("#paginas").empty();
		var compiledeHTML = $compile("<buscaaluno></buscaaluno>")
		($scope);
		$("#paginas").append(compiledeHTML);
		
	}
	
	$scope.buscarAniversariante = function(){
		
		$scope.exibeTela = false;
		$("#paginas").empty();
		var compiledeHTML = $compile("<aniversariante></aniversariante>")
		($scope);
		$("#paginas").append(compiledeHTML);
		
	}
	
	$scope.buscarProfissional = function(){
		
		$scope.exibeTela = false;
		$("#paginas").empty();
		var compiledeHTML = $compile("<profissional></profissional>")
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
		$("#paginas").empty();
		var compiledeHTML = $compile("<buscatreino></buscatreino>")
		($scope);
		$("#paginas").append(compiledeHTML);
		
	}
	
	$scope.buscarAula = function(){
		
		$scope.exibeTela = false;
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
