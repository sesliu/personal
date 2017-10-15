personal.controller('alunoController',function($scope, $compile, $rootScope,webservicesAluno){
	
	$scope.aluno ={};
	$scope.busca;
	$scope.listaAluno = [];
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

	
	$scope.cadastraAluno = function(){
		
		$scope.exibeTela = false;
		$("#paginas").empty();
		var compiledeHTML = $compile("<cadastraaluno></cadastraaluno>")
		($scope);
		$("#paginas").append(compiledeHTML);
		
		
	}
	
	$scope.atualizaAluno = function(codigo) {

		$rootScope.codigo = codigo;
		$scope.exibeTela = false;
		$("#paginas").empty();
		var compiledeHTML = $compile(
				"<atualizaaluno></atualizaaluno>")($scope);
		$("#paginas").append(compiledeHTML);
	
	}
	
	
	$scope.voltarBuscaAluno = function(){
		
		$("#paginas").empty();
		var compiledeHTML = $compile("<buscaaluno></buscaaluno>")
		($rootScope);
		$("#paginas").append(compiledeHTML);
		
	}
	
	$scope.gravarAluno = function() {

		$scope.aluno.dataNascimento = $scope.data.getFullYear()+'-'+('00'+($scope.data.getMonth()+1)).slice(-2)+'-'+('00'+$scope.data.getDate()).slice(-2);
		
		webservicesAluno.gravarAluno($scope.aluno).success(
				function(data, status) {

					if (status == 200) {

						$scope.exibeTela = false;
						$("#paginas").empty();
						var compiledeHTML = $compile(
								"<cadastraaluno></cadastraaluno>")(
								$scope);
						$("#paginas").append(compiledeHTML);

					}

				});

	}
	
	$scope.limparCampos = function() {

		$scope.exibeTela = false;
		$("#paginas").empty();
		var compiledeHTML = $compile(
				"<cadastraaluno></cadastraaluno>")($scope);
		$("#paginas").append(compiledeHTML);

	}

	$scope.buscarAluno = function(nome) {

		ultimabusca = nome;
		webservicesAluno.buscarAluno(nome).success(function(data, status) {

			$scope.listaAluno = data;
			

		});

	}

	$scope.excluirAluno = function(codigo) {

		webservicesAluno.excluirAluno(codigo).success(function(data, status) {

			webservicesAluno.buscarAluno(ultimabusca).success(function(data, status) {

				$scope.listaAluno = data;
				

			});
			

		});

		}
	
});


personal.controller('atualizaAlunoController',
		function($scope, $compile, $rootScope, webservicesAluno, $timeout, $rootScope){
	
	
	
	webservicesAluno.buscarAlunoId($rootScope.codigo).success(function(data, status) {

		$scope.aluno = data;
		
		var date = data.dataNascimento.replace("-", "");
		date = date.replace("-", "");
		var newdate = date;
		
		var ano = newdate.substring(0, 4);
		var mes = newdate.substring(4, 6);
		var dia = newdate.substring(6,8);

		$scope.data = new Date(ano, mes-1, dia);
		
		});
	
	
	$scope.atualizarAluno = function() {

		$scope.aluno.dataNascimento = $scope.data.getFullYear()+'-'+('00'+($scope.data.getMonth()+1)).slice(-2)+'-'+('00'+$scope.data.getDate()).slice(-2);
		
		webservicesAluno.atualizarAluno($scope.aluno).success(
				function(data, status) {

					if (status == 200) {

						$("#paginas").empty();
						var compiledeHTML = $compile("<buscaaluno></buscaaluno>")(
								$rootScope);
						$("#paginas").append(compiledeHTML);

					}

				});

	}
	
	
});		