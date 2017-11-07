personal.controller('treinoController',
		function($scope, $compile, $rootScope, webservices, $timeout, $rootScope, ngDialog, growl) {

			$scope.treino = {};
			$scope.busca;
			$scope.listaTreino = [];
			var ultimabusca;
			$rootScope.codigo;
			$scope.nomeTreino;
			$scope.carregaSpinner = false;

			var mensagemErroGravar = "Erro ao gravar registro";
			var mensagemErroBuscar = "Sem registros para busca";
			var mensagemOK = "Registros gravados com sucesso";
			var mensagemOKExcluir = "Registro excluído com sucesso";
			
			
			
			$scope.inicio = function(){
				
				$scope.carregaSpinner = true;

				webservices.buscarTreino().success(function(data, status) {

					
					$scope.listaTreino = data;
					$scope.carregaSpinner = false;


				});

				
			}
			
			
			
			$scope.cadastraTreino = function() {

				$scope.exibeTela = false;
				$("#paginas").empty();
				var compiledeHTML = $compile(
						"<cadastratreino></cadastratreino>")($scope);
				$("#paginas").append(compiledeHTML);

			}
			
			$scope.atualizaTreino = function(codigo) {

				$rootScope.codigo = codigo;
				$scope.exibeTela = false;
				$("#paginas").empty();
				var compiledeHTML = $compile(
						"<atualizatreino></atualizatreino>")($scope);
				$("#paginas").append(compiledeHTML);
				
			
			}

			$scope.voltarBuscaTreino = function() {
				
				
				
				$("#paginas").empty();
				var compiledeHTML = $compile("<buscatreino></buscatreino>")(
						$rootScope);
				$("#paginas").append(compiledeHTML);

			}

/////////////exibe vinculo treino////////////////////
			$scope.exibirVinculo = function(treino) {
				$rootScope.treino = treino;
					ngDialog.open({
						template : 'telas/dialogo/dialogoVinculaTreino.html',
						className : 'ngdialog-theme-default2'
						
						
					});
					
					
				}
			
			
////////////////////////////////////////////////////////////////			
			
			
			$scope.gravarTreino = function() {
				
				
				ngDialog.openConfirm({
					template : 'telas/dialogo/dialogoAdiciona.html',
					className : 'ngdialog-theme-default2',
					controller : 'treinoController'
				}).then(
						function(success) {
							$scope.carregaSpinner = true;

							webservices.gravarTreino($scope.treino).success(function(data,status) {
							
								
							$timeout(function(){
								growl.addSuccessMessage(mensagemOK);
								$scope.carregaSpinner = false;

								
							},100)	
								
								
								
									$("#paginas").empty();
									var compiledeHTML = $compile(
											"<cadastratreino></cadastratreino>")(
											$scope);
									$("#paginas").append(compiledeHTML);
							}).error(function(){
								growl.addErrorMessage(mensagemErroGravar);
							});
							
								},
						function(error) {
							
						});

		}

			$scope.limparCampos = function() {

				$scope.exibeTela = false;
				$("#paginas").empty();
				var compiledeHTML = $compile(
						"<cadastratreino></cadastratreino>")($scope);
				$("#paginas").append(compiledeHTML);

			}

			$scope.buscarTreino = function(nome) {

				ultimabusca = nome;
				
			}

			$scope.excluirTreino = function(codigo) {

				
				ngDialog.openConfirm({
					template : 'telas/dialogo/dialogoExcluir.html',
					className : 'ngdialog-theme-default2',
					controller : 'treinoController'
				}).then(
						function(success) {
							
							$scope.carregaSpinner = true;

							webservices.excluirTreino(codigo).success(function(data, status)  {

								growl.addSuccessMessage(mensagemOKExcluir);
								webservices.buscarTreino(ultimabusca).success(function(data, status) {

									$scope.listaTreino = data;
									$scope.carregaSpinner = false;


								});
								
							}).error(function(){
								growl.addErrorMessage(mensagemErroGravar);
								$scope.carregaSpinner = false;

							});
						
						},
						function(error) {
							
						});

				
				
				}

		

		})
		
personal.controller('atualizaTreinoController',
		function($scope, $compile, $rootScope, webservices, $timeout, ngDialog, growl){
	
	var mensagemOK = "Registros atualizados com sucesso";
	var mensagemErro = "Registros não atualizados";
	$scope.carregaSpinner = false;

	
	webservices.buscarTreinoId($rootScope.codigo).success(function(data, status) {

		$scope.treino = data;
	});
	
		
	
	$scope.atualizaTreino = function() {

		ngDialog.openConfirm({
			template : 'telas/dialogo/dialogoAltera.html',
			className : 'ngdialog-theme-default2',
			controller : 'treinoController'
		}).then(
				function(success) {
					$scope.carregaSpinner = true;

					webservices.atualizarTreino($scope.treino).success(function(data, status)  {

					$timeout(function(){
						growl.addSuccessMessage(mensagemOK);
						$scope.carregaSpinner = false;

						
					},200)	
						
						
						if (status == 200) {

							$("#paginas").empty();
							var compiledeHTML = $compile("<buscatreino></buscatreino>")(
									$rootScope);
							$("#paginas").append(compiledeHTML);

						}
						
					}).error(function(){
						growl.addErrorMessage(mensagemErro);
					});
					
				

				},
				function(error) {
					
				});

		
	}
	
	
});		

personal.controller('vinculaTreinoController',
		function($scope, $compile, $rootScope, webservices, $timeout,webservicesAluno){
	

	
	var listaAlunos =[];
	var listaAlunoSelecionado = [];
	var dadoTreino = [];
	var listaIdAluno =[];
	var objetoId = {};
	var gravarLista = [];
	var exibeMensagemOk = false;
	$scope.alunoTreino ={};
	
	$scope.nomeTreino = $rootScope.treino.nome;
	

	$scope.inicio = function(){
		
		webservicesAluno.buscarAlunoIdTreino($rootScope.treino.idTreino).success(function(data){
			
			listaAlunos = data;
		
			
		});
		
	 webservicesAluno.buscarAlunoIdTreinoVinculado($rootScope.treino.idTreino).success(function(data){
			
		 listaAlunoSelecionado = data;
			
			
		});
		
	}
	

	
	
$timeout(function(){
	
	
	
	
	$scope.demoOptions = {
			title : 'Vincular alunos ao treino',
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
	

	dadoTreino = $scope.demoOptions.selectedItems;

	for (var i = 0; i < dadoTreino.length; i++) {

		listaIdAluno.push(dadoTreino[i].idAluno);
		
		
	}

	if(listaIdAluno.length == 0){
		
		listaIdAluno = 0;
	}

	

	webservices.vincularTreino($rootScope.treino.idTreino,listaIdAluno).success(function(data){
		
		$scope.exibeMensagemOk = true
		$timeout(function(){
			
			$scope.exibeMensagemOk = false 
		},1500)
		
	
	})
	
	
	
	
	
	
	
	
}





});	
