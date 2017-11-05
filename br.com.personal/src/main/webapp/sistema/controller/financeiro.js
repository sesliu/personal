personal.controller('financeiroController',function($scope, $rootScope,$timeout, webservicesAluno, $interval, growl, 
		                                            webservicesAula){
	
	$scope.vigente ={};
	$scope.listaFinancas={};
	$scope.listaDias =[];
	$scope.listaDiasAula =[];
	$scope.listaDiasAulaAnterior = [];
	$scope.carregaSpinner = true;
	var data = new Date();
	var mes = data.getMonth();
	var ano = data.getFullYear();
	$scope.selecionado = {};
	var listaResultado = [];
	var resultado;
	$scope.hora;
	$scope.ajuste;
	$scope.horaAula = "0.00"
	$scope.ajuste = "0.00"
	$scope.quantidadeDias = "0"	
	$scope.total = "0.00"	
	$scope.aluno ={};	
	$scope.abatimento = "0";
	
	function getDiasMes(month, year) {
	     month++;

	     var date = new Date(year, month, 1);
	     var days = [];
	     while (date.getMonth() === month) {
	        days.push(date.getDate());
	        date.setDate(date.getDate() + 1);
	     }
	     return days;
	}
	
	webservicesAluno.buscaFinanceiro(mes, ano).success(function(data){
		
		$scope.listaFinancas = data;
		$scope.carregaSpinner = false;
	});
	
	mes = JSON.stringify(mes);
	ano = JSON.stringify(ano);
	
	$scope.vigente = {'mes':mes , 'ano':ano};
	
	$timeout(function(){
		
   
	  var dias = getDiasMes($scope.vigente.mes-1, 	$scope.vigente.ano);
		
	  for(var i =0; i < dias.length; i++){
		  
			$scope.listaDias.push({
				text : dias[i],
				value : dias[i]
			});
	  }
	
	
		
	},200)
	
	
	
	$scope.inicio = function(){
		webservicesAluno.buscarAlunos().success(function(data){
			
			$scope.listaAlunos = data;
		
					
		});
	};
	
	
	$scope.valoresAluno = function(){
		
		webservicesAluno.calculaAula($scope.vigente.idAluno).success(function(data){
			
			var quantidade =  Object.keys($scope.selecionado.dataAula).length;
			quantidade = quantidade - $scope.abatimento; 
			
			$scope.horaAula = data.horaAula;
			
		
			
			if($scope.vigente.mes == 0){
				
				$scope.ajuste = data.ajuste;
			}
			else {
				$scope.ajuste = '0.00';
			}
			
			$scope.quantidadeDias =  Object.keys($scope.selecionado.dataAula).length;
			$scope.total = ($scope.horaAula*quantidade)+($scope.horaAula*$scope.ajuste/100);
			$scope.total = $scope.total.toFixed(2);
			
		});
	};
	
	
	$scope.carregaDias = function(){
		$scope.carregaSpinner = true;
		listaResultado = [];
		$scope.selecionado ={};
		$scope.horaAula = "0.00"
		$scope.ajuste = "0.00"
		$scope.quantidadeDias = "0"	
		$scope.total = "0.00"	
			
		resultado ="";
		webservicesAula.buscaDiasAula($scope.vigente.idAluno,$scope.vigente.mes,$scope.vigente.ano).success(function(data){
			
			$scope.carregaSpinner = false;
			
			
			$timeout(function(){
				
				for (var i = 0; i < data.length; i++) {

					resultado = data[i].dataAula *1 ;
			
					listaResultado.push(resultado);
					

				}
				$scope.selecionado.dataAula = listaResultado;
				
			},200)
			
			
		
		});
		
		webservicesAula.buscaAulasAluno($scope.vigente.idAluno,$scope.vigente.mes,$scope.vigente.ano).success(function(data){
		
			$timeout(function(){
			$scope.listaDiasAula = data;
			
			},200);
		});
		
		webservicesAula.buscaAulasAlunoAnterior($scope.vigente.idAluno,$scope.vigente.mes,$scope.vigente.ano).success(function(data){
			
			$timeout(function(){
				
			$scope.listaDiasAulaAnterior = data;
			
			},200);
		});
		
		
	};
	
	$scope.alteraDias = function(){
		
		$scope.listaDias = [];
		
		$scope.carregaSpinner = true;
		$timeout(function(){
			
			   
			  var dias = getDiasMes($scope.vigente.mes-1, 	$scope.vigente.ano);
				
			  for(var i =0; i < dias.length; i++){
				  
					$scope.listaDias.push({
						text : dias[i],
						value : dias[i]
					});
			  }
				
			},200)
			
			$scope.carregaSpinner = false;
	}
	
	
	$scope.registrarPagamento = function(){
		
		$scope.aluno.idAluno = $scope.vigente.idAluno;
		$scope.aluno.horaAula = $scope.total;
		$scope.aluno.mes = $scope.vigente.mes;
		$scope.aluno.ano = $scope.vigente.ano;
		
		webservicesAluno.pagarValor($scope.aluno).success(function(status,data){
			    $scope.horaAula = "0.00"
				$scope.ajuste = "0.00"
				$scope.quantidadeDias = "0"	
				$scope.total = "0.00"	
                $scope.vigente.idAluno = "";
				growl.addSuccessMessage("Pagamento registrado com sucesso");	
				$scope.selecionado = {};
				$scope.listaDiasAula = [] 
				$scope.listaDiasAulaAnterior = [];
				$scope.abatimento = "0";
			
			
		});
		
	}
	
	
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
		
		webservicesAluno.registrarPagamento($scope.aluno).success(function(data){
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

personal.controller('aulaExtraController',function($scope, $rootScope,$timeout, webservicesAulaExtra, $interval, growl){
	
	$scope.vigente ={};
	$scope.listaAulaExtras=[];
	
	$scope.carregaSpinner = true;
	
	var data = new Date();
	var mes = data.getMonth();
	var ano = data.getFullYear();
	
	webservicesAulaExtra.buscaAulaExtra(mes, ano).success(function(data){
		
		$scope.listaAulaExtras = data;
		$scope.carregaSpinner = false;
		
		console.log(data);
	});
	
	mes = JSON.stringify(mes);
	ano = JSON.stringify(ano);
	
	$scope.vigente = {'mes':mes , 'ano':ano};
	
	$interval(function(){
		
		webservicesAulaExtra.buscaAulaExtra($scope.vigente.mes, $scope.vigente.ano).success(function(data){
			
			$scope.listaAulaExtras = data;
		});
		
		
	},1000, false)
	
	
	
});