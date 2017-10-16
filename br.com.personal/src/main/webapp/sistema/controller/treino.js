personal.controller('treinoController',
		function($scope, $compile, $rootScope, webservices, $timeout, $rootScope, ngDialog) {

			$scope.treino = {};
			$scope.busca;
			$scope.listaTreino = [];
			var ultimabusca;
			$rootScope.codigo;
			$scope.nomeTreino;

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
						className : 'ngdialog-theme-default'
						
						
					});
					
					
				}
			
			
////////////////////////////////////////////////////////////////			
			
			
		
				
				
		
			
			$scope.gravarTreino = function() {

				webservices.gravarTreino($scope.treino).success(
						function(data, status) {

							if (status == 200) {

								$scope.exibeTela = false;
								$("#paginas").empty();
								var compiledeHTML = $compile(
										"<cadastratreino></cadastratreino>")(
										$scope);
								$("#paginas").append(compiledeHTML);

							}

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
				webservices.buscarTreino(nome).success(function(data, status) {

					$scope.listaTreino = data;
					

				});

			}

			$scope.excluirTreino = function(codigo) {

				webservices.excluirTreino(codigo).success(function(data, status) {

					webservices.buscarTreino(ultimabusca).success(function(data, status) {

						$scope.listaTreino = data;
						

					});
					

				});

				}

		

		})
		
personal.controller('atualizaTreinoController',
		function($scope, $compile, $rootScope, webservices, $timeout){
	
	
	
	webservices.buscarTreinoId($rootScope.codigo).success(function(data, status) {

		$scope.treino = data;
	});
	
	$scope.atualizaTreino = function() {

		webservices.atualizarTreino($scope.treino).success(
				function(data, status) {

					if (status == 200) {

						$("#paginas").empty();
						var compiledeHTML = $compile("<buscatreino></buscatreino>")(
								$rootScope);
						$("#paginas").append(compiledeHTML);

					}

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
		
	})
	
	
	
	
	
	
	
	
}





});	
