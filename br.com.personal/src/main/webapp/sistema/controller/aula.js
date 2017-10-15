personal.controller('aulaController',function($scope, $rootScope, $compile,webservicesAula){
	

	$scope.aula ={};
	$scope.busca;
	$scope.listaAula = [];
	var ultimabusca;
	$rootScope.codigo;
	var data = new Date;
	
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
		
		$scope.gravarAula = function() {

			$scope.aula.dataAula = $scope.data.getFullYear()+'-'+('00'+($scope.data.getMonth()+1)).slice(-2)+'-'+('00'+$scope.data.getDate()).slice(-2);
			
			webservicesAula.gravarAula($scope.aula).success(
					function(data, status) {

						if (status == 200) {

							$scope.exibeTela = false;
							$("#paginas").empty();
							var compiledeHTML = $compile(
									"<cadastraaula></cadastraaula>")(
									$scope);
							$("#paginas").append(compiledeHTML);

						}

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
			webservicesAula.buscarAula(nome).success(function(data, status) {

				$scope.listaAula = data;
				

			});

		}

		$scope.excluirAula = function(codigo) {

			webservicesAula.excluirAula(codigo).success(function(data, status) {

				webservicesAula.buscarAula(ultimabusca).success(function(data, status) {

					$scope.listaAula = data;
					

				});
				

			});

			}

	
});


personal.controller('atualizaAulaController',
		function($scope, $compile, $rootScope, webservicesAula, $timeout, $rootScope){
	
	
	
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
		
		webservicesAula.atualizarAula($scope.aula).success(
				function(data, status) {

					if (status == 200) {

						$("#paginas").empty();
						var compiledeHTML = $compile("<buscaaula></buscaaula>")(
								$rootScope);
						$("#paginas").append(compiledeHTML);

					}

				});

	}
	
	
});		