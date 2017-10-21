personal.controller('aulaController',function($scope, $rootScope, $compile,webservicesAula, ngDialog , growl, $timeout){
	

	$scope.aula ={};
	$scope.busca;
	$scope.listaAula = [];
	var ultimabusca;
	$rootScope.codigo;
	var data = new Date;
	$scope.carregaSpinner = false;
	
	var mensagemErroGravar = "Erro ao gravar registro";
	var mensagemErroBuscar = "Sem registros para busca";
	var mensagemOK = "Registros gravados com sucesso";
	var mensagemOKExcluir = "Registro excluído com sucesso";
	
	$scope.data =  new Date(data.getFullYear(), data.getMonth(), new Date().getDate());
	
	$scope.openDatIni = false;

	/**
	 * método que verifica se o datepicker está aberto.
	 */
	$scope.opened = function(datepicker) {
		if (datepicker == 'dataIni') {
			$scope.openDatIni = true;
		}
	};

	/**
	 * propriedades passadas para os datepicker's
	 */
	$scope.options = {
		showWeeks : true,
		showButtonBar : false,
		autoclose : true,
		language : "pt-BR",
	};

	function formatDate(component) {
		var v = component.value;
		if (v.match(/^\d{2}$/) !== null) {
			component.value = v + '/';
		} else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
			component.value = v + '/';
		}
	}
	;
	
		
		$scope.cadastraAula = function(){
			
			$scope.exibeTela = false;
			$("#paginas").empty();
			var compiledeHTML = $compile("<cadastraaula></cadastraaula>")
			($scope);
			$("#paginas").append(compiledeHTML);
			
			
		}
		
		$scope.voltarBuscaAula = function(){
			
			$("#paginas").empty();
			var compiledeHTML = $compile("<buscaaula></buscaaula>")
			($rootScope);
			$("#paginas").append(compiledeHTML);
			
		}
		

		$scope.atualizaAula = function(codigo) {

			$rootScope.codigo = codigo;
			$scope.exibeTela = false;
			$("#paginas").empty();
			var compiledeHTML = $compile(
					"<atualizaaula></atualizaaula>")($scope);
			$("#paginas").append(compiledeHTML);
		
		}
		
		
/////////////exibe vinculo treino////////////////////
		
		$scope.exibirVinculo = function(aula) {
			$rootScope.aula = aula;
				ngDialog.open({
					template : 'telas/dialogo/dialogoVinculaAula.html',
					className : 'ngdialog-theme-default'
					
					
				});
				
				
			}
		
		
////////////////////////////////////////////////////////////////
		
		
		$scope.gravarAula = function() {

			
			ngDialog.openConfirm({
				template : 'telas/dialogo/dialogoAdiciona.html',
				className : 'ngdialog-theme-default',
				controller : 'aulaController'
			}).then(
					function(success) {
						$scope.carregaSpinner = true;
						$scope.aula.dataAula = $scope.data.getFullYear()+'-'+('00'+($scope.data.getMonth()+1)).slice(-2)+'-'+('00'+$scope.data.getDate()).slice(-2);
						
						webservicesAula.gravarAula($scope.aula).success(
								function(data, status) {

									$timeout(function(){
										growl.addSuccessMessage(mensagemOK);
										$scope.carregaSpinner = false;
										
									},100)	
										
									
									
									if (status == 200) {

										$scope.exibeTela = false;
										$("#paginas").empty();
										var compiledeHTML = $compile(
												"<cadastraaula></cadastraaula>")(
												$scope);
										$("#paginas").append(compiledeHTML);

									}

								}).error(function(){
									growl.addErrorMessage(mensagemErroGravar);
									$scope.carregaSpinner = false;
								});
							},
					function(error) {
						
					});

			
		}
		
		$scope.limparCampos = function() {

			$scope.exibeTela = false;
			$("#paginas").empty();
			var compiledeHTML = $compile(
					"<cadastraaula></cadastraaula>")($scope);
			$("#paginas").append(compiledeHTML);

		}

		$scope.buscarAula = function(nome) {

			ultimabusca = nome;
			$scope.carregaSpinner = true;
			webservicesAula.buscarAula(nome).success(function(data, status) {
				
				if(data == ''){
					
					growl.addErrorMessage(mensagemErroBuscar);
				}
				
				
				$scope.listaAula = data;
				$scope.carregaSpinner = false;

			});

		}

		$scope.excluirAula = function(codigo) {

			
			ngDialog.openConfirm({
				template : 'telas/dialogo/dialogoExcluir.html',
				className : 'ngdialog-theme-default',
				controller : 'aulaController'
			}).then(
					function(success) {
						$scope.carregaSpinner = true;

						webservicesAula.excluirAula(codigo).success(function(data, status) {
							growl.addSuccessMessage(mensagemOKExcluir);
							webservicesAula.buscarAula(ultimabusca).success(function(data, status) {

								$scope.listaAula = data;
								$scope.carregaSpinner = false;


							}).error(function(){
								growl.addErrorMessage(mensagemErroGravar);
								$scope.carregaSpinner = false;

							});
							},
					function(error) {
						
					});
		});

			}

	
});


personal.controller('atualizaAulaController',
		function($scope, $compile, $rootScope, webservicesAula, $timeout, $rootScope, ngDialog, growl){
	

	var mensagemOK = "Registros atualizados com sucesso";
	var mensagemErro = "Registros não atualizados";
	$scope.carregaSpinner = false;

	
	webservicesAula.buscarAulaId($rootScope.codigo).success(function(data, status) {

		$scope.aula = data;
		
		var date = data.dataAula.replace("-", "");
		date = date.replace("-", "");
		var newdate = date;
		
		var ano = newdate.substring(0, 4);
		var mes = newdate.substring(4, 6);
		var dia = newdate.substring(6,8);

		console.log(mes)
		$scope.data = new Date(ano, mes-1, dia);
		
		});
	
	
	$scope.atualizarAula = function() {

		$scope.aula.dataAula = $scope.data.getFullYear()+'-'+('00'+($scope.data.getMonth()+1)).slice(-2)+'-'+('00'+$scope.data.getDate()).slice(-2);
		
		
		ngDialog.openConfirm({
			template : 'telas/dialogo/dialogoAltera.html',
			className : 'ngdialog-theme-default',
			controller : 'atualizaAulaController'
		}).then(
				function(success) {
					$scope.carregaSpinner = true;

					webservicesAula.atualizarAula($scope.aula).success(
							function(data, status) {
								
								$timeout(function(){
									growl.addSuccessMessage(mensagemOK);
									$scope.carregaSpinner = false;

									
								},200)	

								if (status == 200) {

									$("#paginas").empty();
									var compiledeHTML = $compile("<buscaaula></buscaaula>")(
											$rootScope);
									$("#paginas").append(compiledeHTML);

								}

							}).error(function(){
								growl.addErrorMessage(mensagemErro);
								$scope.carregaSpinner = false;

							});
							

						},
				function(error) {
					
				});

	}
	
	
});	

personal.controller('vinculaAulaController',
		function($scope, $compile, $rootScope, webservicesAula, $timeout,webservicesAluno,growl){
	

	
	var listaAlunos =[];
	var listaAlunoSelecionado = [];
	var dadoAula = [];
	var listaIdAluno =[];
	var objetoId = {};
	var gravarLista = [];
	var exibeMensagemOk = false;
	var mensagemOK = "Registros atualizados com sucesso";
	

	$scope.nomeAula = $rootScope.aula.nome;
	$scope.diaSemana = $rootScope.aula.diaSemana;
	

	$scope.inicio = function(){
		
		webservicesAluno.buscarAlunoIdAula($rootScope.aula.idAula).success(function(data){
			
			listaAlunos = data;
			
		
			
		});
		
	 webservicesAluno.buscarAlunoIdAulaVinculada($rootScope.aula.idAula).success(function(data){
			
		 listaAlunoSelecionado = data;
			
			
		});
		
	}
	

	
	
$timeout(function(){
	
	
	
	
	$scope.demoOptions = {
			title : 'Vincular alunos à aula',
			filterPlaceHolder : 'Buscar nome do aluno abaixo',
			labelAll : 'Não vinculados',
			labelSelected : 'vinculados',
			helpMessage : 'Clicar no nome do aluno para transferir entre os campos',
			orderProperty : 'nome',
			items : listaAlunos,
			selectedItems : listaAlunoSelecionado
};			

	
},1000);	
	

$scope.gravar = function(){
	
	var listaIdAluno = []
	
	dadoAula = $scope.demoOptions.selectedItems;

	for (var i = 0; i < dadoAula.length; i++) {

		listaIdAluno.push(dadoAula[i].idAluno);
		
		
	}

	if(listaIdAluno.length == 0){
		
		listaIdAluno = 0;
	}

	

	webservicesAula.vincularAula($rootScope.aula.idAula,listaIdAluno).success(function(data){
		
		$scope.exibeMensagemOk = true
		$timeout(function(){
			
			$scope.exibeMensagemOk = false 
		},1500)
		
	})
	
	
	
	
	
	
	
	
}





});	
