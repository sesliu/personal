personal.controller('aulaController',function($scope, $rootScope, $compile,webservicesAula, ngDialog , growl, $timeout,
												webservicesAluno, webservices, $interval){
	

	$scope.aula ={};
	$scope.busca;
	$scope.listaAula = [];
	var ultimabusca;
	$rootScope.codigo;
	var data = new Date;
	var listaTreinos =[];
	var listaTreinoSelecionado = [];
	var listaAluno =[];
	var listaAlunoSelecionado = [];
	$scope.listaAlunos = [];
	$scope.carregaSpinner = false;
	var dadoAula = [];
	var listaIdAula =[];
	var objetoId = {};
	var gravarLista = [];
	var dadoAluno = [];
	var compiledeHTML;
	var scope;
	
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
	
	
	$interval(function(){
		
		 if($scope.data.getDay() == 0){
			 
			 $scope.aula.diaSemana = 'Domingo';
			 
		 }else if($scope.data.getDay() == 1){
			
			 $scope.aula.diaSemana = 'Segunda';
			 
		 }else if($scope.data.getDay() == 2){
			 
			 $scope.aula.diaSemana = 'Terça';
			 
		 }else if($scope.data.getDay() == 3){
			 
			 $scope.aula.diaSemana = 'Quarta';
			 
		 }else if($scope.data.getDay() == 4){
			 
			 $scope.aula.diaSemana = 'Quinta';
			 
		 }else if($scope.data.getDay() == 5){
			 
			 $scope.aula.diaSemana = 'Sexta';
			 
		 }else if($scope.data.getDay() == 6){
			 
			 $scope.aula.diaSemana = 'Sábado';
		 }
			 
		
		
	},1000,false)
	
	
		
		$scope.cadastraAula = function(){
		
		if(scope !=null){
			
			scope.$destroy()
		}
		scope = $rootScope.$new();
			
			$scope.exibeTela = false;
			$("#paginas").empty();
			var compiledeHTML = $compile("<cadastraaula></cadastraaula>")
			(scope);
			$("#paginas").append(compiledeHTML);
			
			
		}
		
		$scope.voltarBuscaAula = function(){
		if(scope !=null){
				
				scope.$destroy()
			}
		scope = $rootScope.$new();
				
			$("#paginas").empty();
			compiledeHTML = $compile("<buscaaula></buscaaula>")
			(scope);
			$("#paginas").append(compiledeHTML);
			
		}
		

		$scope.atualizaAula = function(codigo) {

			if(scope !=null){
				
				scope.$destroy()
			}
			scope = $rootScope.$new();
			
			$rootScope.codigo = codigo;
			$scope.exibeTela = false;
			$("#paginas").empty();
			compiledeHTML = $compile(
					"<atualizaaula></atualizaaula>")(scope);
			$("#paginas").append(compiledeHTML);
		
		}
		
		
		$scope.inicioBusca = function(){
			
			$scope.carregaSpinner = true;
			webservicesAula.listaAulas().success(function(data){
				
				$scope.listaAula = data;
				$scope.carregaSpinner = false;
				
								
			});
			
		}
		

		$scope.inicio = function(){
			
			
			webservices.buscarTodosTreinos().success(function(data){
				
				listaTreinos = data;
				
			});
			
			
			
			
			
			webservicesAluno.buscarAlunos().success(function(data){
				
				listaAluno = data;
				
			});
			
			
			
			
		}
		
		
		

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

			
			$scope.alunoOptions = {
					title : 'Escolha os alunos',
					filterPlaceHolder : 'Buscar nome do aluno abaixo',
					labelAll : 'Não vinculados',
					labelSelected : 'vinculados',
					helpMessage : 'Clicar no nome do aluno para transferir entre os campos',
					orderProperty : 'nome',
					items : listaAluno,
					selectedItems : listaAlunoSelecionado
		};			
	
			
			
			
		},1000);		
		
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
				className : 'ngdialog-theme-default2',
				controller : 'aulaController'
			}).then(
					function(success) {
						
						var listaIdTreino = []
						var listaIdAluno = []
						
						dadoAula = $scope.demoOptions.selectedItems;
						dadoAluno = $scope.alunoOptions.selectedItems; 
						

						for (var i = 0; i < dadoAula.length; i++) {

							listaIdTreino.push(dadoAula[i].idTreino);
						}
						
						for (var i = 0; i < dadoAluno.length; i++) {

							listaIdAluno.push(dadoAluno[i].idAluno);
						}

						

						if(listaIdTreino.length == 0){
							
							listaIdTreino = 0;
						}
						
						if(listaIdAluno.length == 0){
							
							listaIdAluno = 0;
						}

						
						$scope.carregaSpinner = true;
						$scope.aula.dataAula = $scope.data.getFullYear()+'-'+('00'+($scope.data.getMonth()+1)).slice(-2)+'-'+('00'+$scope.data.getDate()).slice(-2);
						
						webservicesAula.gravarAula($scope.aula).success(
								function(data, status) {

								 if (status == 200){	
									 
									 webservicesAula.vincularAulaAluno(listaIdAluno).success(function(data, status){ 
									 
										 
									if (status == 200) {

										
										webservicesAula.vincularAula(listaIdTreino).success(function(data, status){
											
											if(status == 200){
												

												$timeout(function(){
													growl.addSuccessMessage(mensagemOK);
													$scope.carregaSpinner = false;
													
												},100)	
												
												if(scope !=null){
													
													scope.$destroy()
												}
												scope = $rootScope.$new();
												
												$scope.exibeTela = false;
												$("#paginas").empty();
												compiledeHTML = $compile(
														"<cadastraaula></cadastraaula>")(
														scope);
												$("#paginas").append(compiledeHTML);
												
											}
											
										})
										
										

									}
									
								 });	
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

			if(scope !=null){
				
				scope.$destroy()
			}
			scope = $rootScope.$new();
			
			$scope.exibeTela = false;
			$("#paginas").empty();
			compiledeHTML = $compile(
					"<cadastraaula></cadastraaula>")(scope);
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
				className : 'ngdialog-theme-default2',
				controller : 'aulaController'
			}).then(
					function(success) {
						$scope.carregaSpinner = true;

						webservicesAula.excluirAula(codigo).success(function(data, status) {
							growl.addSuccessMessage(mensagemOKExcluir);
							
							
							webservicesAula.listaAulas().success(function(data){
								
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
		function($scope, $compile, $rootScope, webservicesAula,webservicesAluno, $timeout, $rootScope, ngDialog, growl, 
				webservices, $interval){
	

	var mensagemOK = "Registros atualizados com sucesso";
	var mensagemErro = "Registros não atualizados";
	$scope.carregaSpinner = false;
	$scope.listaAlunos =[];
	var listaTreinos = [];
	var listaTreinoSelecionado = [];
	var listaAluno =[];
	var listaAlunoSelecionado = [];
	var dadoAluno;
	var dadoAula;

	
	
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
	
	
	
	$scope.inicio = function(){
		
	
		
		webservicesAluno.buscarAlunos().success(function(data){
			
			$scope.listaAlunos = data;
			
		});
		
		
		
		webservices.buscarTreinosAula($rootScope.codigo).success(function(data){
			
		    listaTreinos = data;
			
		});
		
		webservices.buscarTreinosVicunlados($rootScope.codigo).success(function(data){
			
			listaTreinoSelecionado = data;
			console.log(data);
		})
		
	webservicesAluno.buscarAlunoIdAula($rootScope.codigo).success(function(data){
			
		 listaAluno = data;
			
		
			
		});
		
	 webservicesAluno.buscarAlunoIdAulaVinculada($rootScope.codigo).success(function(data){
			
		 listaAlunoSelecionado = data;
			
			
		});
		
		
	}
	
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

		$scope.alunoOptions = {
				title : 'Escolha os alunos',
				filterPlaceHolder : 'Buscar nome do aluno abaixo',
				labelAll : 'Não vinculados',
				labelSelected : 'vinculados',
				helpMessage : 'Clicar no nome do aluno para transferir entre os campos',
				orderProperty : 'nome',
				items : listaAluno,
				selectedItems : listaAlunoSelecionado
		}		
		
	},1000);	
	
	
	webservicesAula.buscarAulaId($rootScope.codigo).success(function(data, status) {

		$scope.aula = data;
		
		var date = data.dataAula.replace("-", "");
		date = date.replace("-", "");
		var newdate = date;
		
		var ano = newdate.substring(0, 4);
		var mes = newdate.substring(4, 6);
		var dia = newdate.substring(6,8);

	
		var idAluno = data.idAluno;

		$scope.data = new Date(ano, mes-1, dia);
		
		
		$timeout(function(){
			for (var i = 0; i < $scope.listaAlunos.length; i++) {

				if (idAluno == 	$scope.listaAlunos[i].idAluno) {

					console.log($scope.listaAlunos[i])
					
					$scope.aula.idAluno = $scope.listaAlunos[i];

				}

			}
			
		},200)
		
		
		});
	
	
	$scope.atualizarAula = function() {

		$scope.aula.dataAula = $scope.data.getFullYear()+'-'+('00'+($scope.data.getMonth()+1)).slice(-2)+'-'+('00'+$scope.data.getDate()).slice(-2);
		
		
		ngDialog.openConfirm({
			template : 'telas/dialogo/dialogoAltera.html',
			className : 'ngdialog-theme-default2',
			controller : 'atualizaAulaController'
		}).then(
				function(success) {
					$scope.carregaSpinner = true;

					var listaIdTreino = [];
					var listaIdAluno = [];
					
					dadoAula = $scope.demoOptions.selectedItems;
					dadoAluno = $scope.alunoOptions.selectedItems; 
					
					for (var i = 0; i < dadoAula.length; i++) {

						listaIdTreino.push(dadoAula[i].idTreino);
					}


					for (var i = 0; i < dadoAluno.length; i++) {

						listaIdAluno.push(dadoAluno[i].idAluno);
					}

					

					if(listaIdTreino.length == 0){
						
						listaIdTreino = 0;
					}
					
					if(listaIdAluno.length == 0){
						
						listaIdAluno = 0;
					}

					
					
					webservicesAula.atualizarAula($scope.aula).success(
							function(data, status) {
								
						
								if (status == 200) {
						
									webservicesAula.vincularAulaAlunoTreino($rootScope.codigo,listaIdAluno).success(function(data,status){
										
									 if(status == 200){
									
									webservices.vincularTreino($rootScope.codigo,listaIdTreino).success(function(data,status){
										
										$timeout(function(){
											growl.addSuccessMessage(mensagemOK);
											$scope.carregaSpinner = false;

											
										},200)	
										
										$("#paginas").empty();
										var compiledeHTML = $compile("<buscaaula></buscaaula>")(
												$rootScope);
										$("#paginas").append(compiledeHTML);
										
									});
									
									}
									});	

								}

							}).error(function(){
								growl.addErrorMessage(mensagemErro);
								$scope.carregaSpinner = false;

							});
							

						},
				function(error) {
					
				});

	}

	
	$interval(function(){
		
		 if($scope.data.getDay() == 0){
			 
			 $scope.aula.diaSemana = 'Domingo';
			 
		 }else if($scope.data.getDay() == 1){
			
			 $scope.aula.diaSemana = 'Segunda';
			 
		 }else if($scope.data.getDay() == 2){
			 
			 $scope.aula.diaSemana = 'Terça';
			 
		 }else if($scope.data.getDay() == 3){
			 
			 $scope.aula.diaSemana = 'Quarta';
			 
		 }else if($scope.data.getDay() == 4){
			 
			 $scope.aula.diaSemana = 'Quinta';
			 
		 }else if($scope.data.getDay() == 5){
			 
			 $scope.aula.diaSemana = 'Sexta';
			 
		 }else if($scope.data.getDay() == 6){
			 
			 $scope.aula.diaSemana = 'Sábado';
		 }
			 
		
		
	},1000,false)
	
	
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

personal.controller('personalController', function($scope, $compile, webservicesAula, ngDialog,growl, $timeout, $interval, md5){
	
	
	$scope.personal = {};
	$scope.nomeBotao = "Gravar"
	$scope.exibeBotao = false;
	$scope.altera = false;	
	$scope.confirma;
	$scope.mensagem = "Senhas não conferem"
	$scope.exibeMensagem = false;
		
		
	$interval(function(){
		
		
		if($scope.altera == false){
			
			$scope.nomeBotao = "Gravar"
			$scope.exibeBotao = false;
		}else{
			
			$scope.nomeBotao = "Alterar"
			$scope.exibeBotao = true;	
		}
		
		
		
	},1000)	
		
		
	$scope.inicio = function(){
		
		$scope.altera = false;	
		$scope.carregaSpinner = true;
		webservicesAula.buscaPersonal().success(function(data) {
			
			$scope.personal = data;
			
			$scope.confirmar = $scope.personal.senha;
			
			console.log(data);
			
			if(data.nome != null){
				
				$scope.altera = true;
			}else{
				
				$scope.altera = false;
			}
				$scope.carregaSpinner = false;
		});
		
		
		
		
	}	
		
	$scope.verificarSenha = function(confirmar){
		
		if(md5.createHash(confirmar) != md5.createHash($scope.personal.senha)){
		
			$scope.exibeMensagem = true;
			
		}else{
			
			$scope.exibeMensagem = false;
		}
		
	}
		
	$scope.limparCampos = function() {

		$scope.exibeTela = false;
		$("#paginas").empty();
		var compiledeHTML = $compile(
			"<personal></personal>")($scope);
		$("#paginas").append(compiledeHTML);

	}
	
	$scope.gravarPersonal = function() {

		
		if(md5.createHash($scope.confirmar) != md5.createHash($scope.personal.senha)){
			
			growl.addErrorMessage("Senhas não conferem, verificar");
			return;
		}
	
        
		$scope.personal.senha = md5.createHash($scope.personal.senha);
		$scope.confirmar = md5.createHash($scope.confirmar);
		
		if($scope.nomeBotao == 'Gravar'){
			
			
		ngDialog.openConfirm({
			template : 'telas/dialogo/dialogoAdiciona.html',
			className : 'ngdialog-theme-default2',
			controller : 'personalController'
		}).then(
				function(success) {
					$scope.carregaSpinner = true;
					
				

					webservicesAula.gravarPersonal($scope.personal).success(function(data) {
						
						
						growl.addSuccessMessage("Registro Gravado com sucesso");
						$scope.altera = true;
						
						$scope.carregaSpinner = false;
						},
				function(error) {
					
				});
				});

		}else{
			
			ngDialog.openConfirm({
				template : 'telas/dialogo/dialogoAltera.html',
				className : 'ngdialog-theme-default2',
				controller : 'personalController'
			}).then(
					function(success) {
						$scope.carregaSpinner = true;

					
						webservicesAula.atualizarPersonal($scope.personal).success(function(data) {
							
							
							growl.addSuccessMessage("Registro Atualizado com sucesso");
							
							$scope.altera = true;
							$scope.carregaSpinner = false;
							},
					function(error) {
						
					});
					});
			
			
		}

	}

	$scope.excluirPersonal = function(codigo) {

		
		ngDialog.openConfirm({
			template : 'telas/dialogo/dialogoExcluir.html',
			className : 'ngdialog-theme-default2',
			controller : 'treinoController'
		}).then(
				function(success) {
					
					$scope.carregaSpinner = true;

					webservicesAula.excluirPersonal().success(function(data)  {

						growl.addSuccessMessage('Registro excluído com sucesso');
						$scope.altera = false;
						
						$scope.exibeTela = false;
						$("#paginas").empty();
						var compiledeHTML = $compile(
							"<personal></personal>")($scope);
						$("#paginas").append(compiledeHTML);
					
						
					}).error(function(){
						growl.addErrorMessage("Erro ao excluir o registro");
						$scope.carregaSpinner = false;
						$scope.altera = true;

					});
				
				},
				function(error) {
					
				});

		
		
		}



		
});
