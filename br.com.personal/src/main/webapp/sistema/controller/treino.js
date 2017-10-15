personal.controller('treinoController',
		function($scope, $compile, $rootScope, webservices, $timeout, $rootScope) {

			$scope.treino = {};
			$scope.busca;
			$scope.listaTreino = [];
			var ultimabusca;
			$rootScope.codigo;

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
		function($scope, $compile, $rootScope, webservices, $timeout, $rootScope){
	
	
	
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