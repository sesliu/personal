personal.controller('loginController', function($scope, $state, $rootScope, growl, webservicesAula, md5, $timeout){

	
	
	
	$scope.login ={};
	$rootScope.acesso = false;
	$scope.mostraMensagem = false;
	$scope.carregaSpinner = false;
	$scope.numeroVersao;
	var listaVersao;
	
	var getVersion = function(){
		
	  var listaVersoes = []
		
		var url = "https://api.github.com/repos/sesliu/personal/tags";
		
		 $.getJSON(url, function(result){
		        
			 listaVersao =	result;
			 console.log(listaVersao)
			 
			 for(var i = 0; i < listaVersao.length; i++){
				 
				 listaVersoes.push(listaVersao[i].name);
			 }
			 
			 
			 $timeout(function(){
				 $scope.numeroVersao ="";
				 console.log(listaVersoes);
				 $scope.numeroVersao = "Release: "+listaVersoes[0];
				 
			 },10)
			 
			 	
		    
		 });
		
		
	}
	
	getVersion();
	
	$scope.acessar = function(){
		
		$scope.carregaSpinner = true;
		
		webservicesAula.buscaPersonal().success(function(data){
			
			if(data.login == null || data.login == undefined){
				
				growl.addErrorMessage("Login ou senha inválidos");
				
				return;
				
			}
			
			
			if($scope.login.nome.toUpperCase() == data.login.toUpperCase() &&  md5.createHash($scope.login.senha) == data.senha){
				
				
				$state.go('personal');
				$rootScope.acesso = true;
				
			}else{
				
				$rootScope.acesso = false;
				$scope.mostraMensagem = true;
				growl.addErrorMessage("Login ou senha inválidos");
				
			}
			
			$scope.carregaSpinner = false;
			
			
		
		
		});
		
		
		
		
	}
	

	
	
});



personal.controller('dashController', function($scope, webservicesAluno, webservicesAula, ngDialog, $rootScope, $interval, 
		$timeout, growl,webservices, $compile){
	
	
	
	$scope.dadosAula;
	$scope.aula;
	$scope.listaAniversario = [];
	$scope.listaProfissao = [];
	$scope.listaAulas = [];
	$scope.listaAulasAnterior = [];
	$scope.listaFinancas = [];
	$scope.listaMontante = [];
	$scope.montante = '0.00';
	$scope.nomePersonal;
	var data;
	var mes;
	var dia;
	var dias;
	$scope.vigente = {};
	var dataAnterior;
	$scope.exibeAula = false;
	var listaTreinos =[];
	var listaTreinoSelecionado = [];
	$scope.dataAula = "";
	
	
	$interval( function(){
		
		data = new Date();
		mes = data.getMonth();
		dias = data.getDate();
		ano = data.getFullYear();
		
		dataAnterior = new Date();
		dataAnterior.setDate(dataAnterior.getDate() -1);
		
		$scope.dataFormatadaAnterior  = ('00'+(dataAnterior.getDate())).slice(-2)+'/'+('00'+(dataAnterior.getMonth()+1)).slice(-2)+'/'+dataAnterior.getFullYear();
		
		
		$scope.dataFormatada  = ('00'+data.getDate()).slice(-2)+'/'+('00'+(data.getMonth()+1)).slice(-2)+'/'+data.getFullYear();
		
		
		 dia  = data.getFullYear()+'-'+('00'+(data.getMonth()+1)).slice(-2)+'-'+('00'+data.getDate()).slice(-2);
		 
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
		
		
	
	},1000);
	
	
	$scope.inicio = function(){
		
		$scope.exibeAula = false;
		$scope.carregaSpinner = true;
		let data = new Date();
		let mes = data.getMonth();
		let ano = data.getFullYear();
		let dia = data.getFullYear()+'-'+('00'+(data.getMonth()+1)).slice(-2)+'-'+('00'+data.getDate()).slice(-2);
		
		$rootScope.dia = dia;
		
		mes = JSON.stringify(mes);
		ano = JSON.stringify(ano);
		
		
				webservicesAula.buscaAulaDia(dia).success(function(data){
					
				    $scope.listaAulas = data;
				   
					
				})
				
				
				webservicesAula.buscaAulaDiaAnterior(dia).success(function(data){
					
				    $scope.listaAulasAnterior = data;
				   
					
				})
		
				webservicesAula.buscaPersonal().success(function(data) {
					
						
					if(data.nome != null){
						
						$scope.nomePersonal = data.login;
						
					}else{
						
						$scope.nomePersonal ="";
					}
					
					$scope.carregaSpinner = false;
						
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
	
	
	
	
	$scope.mudaData = function(data){
		
		$scope.dataAula =" - "+data;
		
	}
	
	
	$scope.detalhesAula = function(codigo){
		
		$scope.exibeAula = true;
		$scope.carregaSpinner = true;
		
		webservicesAula.buscaDadosDia(codigo).success(function(data){
			
		
			$scope.dadosAula = data;
			
			webservices.buscarTreinosAula(codigo).success(function(data){
				
			    listaTreinos = data;
				
			});
			
			webservices.buscarTreinosVicunlados(codigo).success(function(data){
				
				listaTreinoSelecionado = data;
			
			});
			
			$timeout(function(){	
				$scope.demoOptions = {
					title : 'Escolha os treinos da aula',
					filterPlaceHolder : 'Buscar nome do treino abaixo',
					labelAll : 'Não vinculados',
					labelSelected : 'vinculados',
					helpMessage : 'Clicar no nome do treino para transferir entre os campos',
					orderProperty : 'nome',
					items : listaTreinos,
					selectedItems : listaTreinoSelecionado
				};			

			},1000);
			
			$scope.carregaSpinner = false;
				
		});
		
	}

	
$scope.sairDetalheAula = function(){
	
	
	$scope.exibeAula = false;
	$scope.dataAula = '';
	
}	
	
$scope.atualizarAula = function(){
		
		$scope.carregaSpinner = true;
		var listaIdTreino = [];
		
		$scope.aula = $scope.dadosAula;
		
		var dadoTreino = $scope.demoOptions.selectedItems;
		
		for (var i = 0; i < dadoTreino.length; i++) {

			listaIdTreino.push(dadoTreino[i].idTreino);
		}


		if(listaIdTreino.length == 0){
			
			listaIdTreino = 0;
		}
		
		
		webservicesAula.atualizarAulaDoDia($scope.aula).success(function(data,status){
			
			
			if(status == 200){
			webservices.vincularTreino($scope.dadosAula.idAula,listaIdTreino).success(function(data,status){
				
				if(status == 200){
					
					$scope.carregaSpinner = false;
					$rootScope.atualizarListaAula = false;
					growl.addSuccessMessage("Aula atualizada com sucesso");
					$scope.exibeAula = false;
					$scope.dataAula = '';
					
					$("#paginas").empty();
					var compiledeHTML = $compile("<dashboard></dashboard>")
					($rootScope);
					$("#paginas").append(compiledeHTML);
				}
				
			});
			
			}
			
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


personal.controller('dadosAulaController',function($scope, $rootScope, webservicesAula, growl, webservices, $timeout, ngDialog){
	
	
	$scope.aula ={};
	
	$scope.dadosAula = $rootScope.dadosAula;
	
	var listaTreinos =[];
	var listaTreinoSelecionado = [];
	$scope.carregaSpinner = false;
	$rootScope.atualizarListaAula = false;
	

	
	$scope.inicio = function(){
	
	$timeout(function(){
		
	webservices.buscarTreinosAula($rootScope.dadosAula.idAula).success(function(data){
			
		    listaTreinos = data;
			
		});
		
		webservices.buscarTreinosVicunlados($rootScope.dadosAula.idAula).success(function(data){
			
			listaTreinoSelecionado = data;
		
		})
		
	},1000)	
	
		
			
		
		
		
		$timeout(function(){	
			$scope.demoOptions = {
				title : 'Escolha os treinos da aula',
				filterPlaceHolder : 'Buscar nome do treino abaixo',
				labelAll : 'Não vinculados',
				labelSelected : 'vinculados',
				helpMessage : 'Clicar no nome do treino para transferir entre os campos',
				orderProperty : 'nome',
				items : listaTreinos,
				selectedItems : listaTreinoSelecionado
			};			

		},1000);
	}
	
	
	
	$scope.atualizarAula = function(){
		
		$scope.carregaSpinner = true;
		var listaIdTreino = [];
		
		$scope.aula = $scope.dadosAula;
		
		var dadoTreino = $scope.demoOptions.selectedItems;
		
		for (var i = 0; i < dadoTreino.length; i++) {

			listaIdTreino.push(dadoTreino[i].idTreino);
		}


		if(listaIdTreino.length == 0){
			
			listaIdTreino = 0;
		}
		
		
		webservicesAula.atualizarAulaDoDia($scope.aula).success(function(data,status){
			
			$rootScope.atualizarListaAula = false;
			if(status == 200){
			webservices.vincularTreino($rootScope.dadosAula.idAula,listaIdTreino).success(function(data,status){
				
				if(status == 200){
					
					$scope.carregaSpinner = false;
					growl.addSuccessMessage("Aula atualizada com sucesso");
					$rootScope.atualizarListaAula = true;
					$scope.closeThisDialog();
				}
				
			});
			
			}
			
		});
		
	}
	
	
});



personal.controller('principalController',function($scope,$compile,$timeout, $state,$rootScope, ngDialog){
	
	
	$scope.exibeTela = true;
	
	
	if ($rootScope.acesso == undefined || $rootScope.acesso == false){
		
		$state.go('login')
		
		return;
	}
	
	
	$scope.sair = function(){
		
		ngDialog.openConfirm({
			template : 'telas/dialogo/dialogoSair.html',
			className : 'ngdialog-theme-default2',
			controller : 'treinoController'
		}).then(
				function(success) {
					
					$state.go('login');

				
				},
				function(error) {
					
				});
		
		
	};
	
	
	
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
	
	$scope.buscarRelatorioTreino = function(){
		
		$scope.exibeTela = false;
		
		$("#paginas").empty();
		var compiledeHTML = $compile("<relatoriotreino></relatoriotreino>")
		($scope);
		$("#paginas").append(compiledeHTML);
		
	}
	
	$scope.buscarRelatorioFinanceiro = function(){
		
		$scope.exibeTela = false;
		
		$("#paginas").empty();
		var compiledeHTML = $compile("<relatoriofinanceiro></relatoriofinanceiro>")
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
	
	
	$scope.personal = function(){
		
		$scope.exibeTela = false;
		
		$("#paginas").empty();
		var compiledeHTML = $compile("<personal></personal>")
		($scope);
		$("#paginas").append(compiledeHTML);
		
	}
	
	
	
});
