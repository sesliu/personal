personal.controller('profissaoController',function($scope,ngDialog, webservicesProfissao, $compile, $rootScope, $timeout, growl){
	
	
	$scope.profissao = {};
	$scope.busca;
	$scope.listaProfissao = [];

	$rootScope.codigo;
	$scope.nomeProfissao;
	$scope.carregaSpinner = false;

	var mensagemErroGravar = "Erro ao gravar registro";
	var mensagemErroBuscar = "Sem registros para busca";
	var mensagemOK = "Registros gravados com sucesso";
	var mensagemOKExcluir = "Registro excluído com sucesso";
	
	
	
	$scope.inicio = function(){
		
		$scope.carregaSpinner = true;

		webservicesProfissao.buscarProfissao().success(function(data, status) {

			
			$scope.listaProfissao = data;
			$scope.carregaSpinner = false;


		});

		
	}
	$scope.cadastraProfissao = function() {

		$scope.exibeTela = false;
		$("#paginas").empty();
		var compiledeHTML = $compile(
				"<cadastraprofissao></cadastraprofissao>")($scope);
		$("#paginas").append(compiledeHTML);

	}
	

	$scope.gravarProfissao = function() {
		
		
		ngDialog.openConfirm({
			template : 'telas/dialogo/dialogoAdiciona.html',
			className : 'ngdialog-theme-default',
			controller : 'profissaoController'
		}).then(
				function(success) {
					$scope.carregaSpinner = true;

					webservicesProfissao.gravarProfissao($scope.profissao).success(function(data,status) {
					
						
					$timeout(function(){
						growl.addSuccessMessage(mensagemOK);
						$scope.carregaSpinner = false;

						
					},100)	
							$("#paginas").empty();
							var compiledeHTML = $compile(
									"<cadastraprofissao></cadastraprofissao>")(
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
				"<cadastraprofissao></cadastraprofissao>")($scope);
		$("#paginas").append(compiledeHTML);

	}
	
	$scope.atualizaProfissao = function(codigo) {

		$rootScope.codigo = codigo;
		$scope.exibeTela = false;
		$("#paginas").empty();
		var compiledeHTML = $compile(
				"<atualizaprofissao></atualizaprofissao>")($scope);
		$("#paginas").append(compiledeHTML);
		
	
	}

	$scope.voltarBuscaProfissao = function() {
	
		$("#paginas").empty();
		var compiledeHTML = $compile("<profissao></profissao>")(
				$rootScope);
		$("#paginas").append(compiledeHTML);

	}
	
	
	$scope.excluirProfissao = function(codigo) {

		
		ngDialog.openConfirm({
			template : 'telas/dialogo/dialogoExcluir.html',
			className : 'ngdialog-theme-default',
			controller : 'profissaoController'
		}).then(
				function(success) {
					
					$scope.carregaSpinner = true;

					webservicesProfissao.excluirProfissao(codigo).success(function(data, status)  {

						growl.addSuccessMessage(mensagemOKExcluir);
						webservicesProfissao.buscarProfissao().success(function(data, status) {

							$scope.listaProfissao = data;
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

	
	
});
personal.controller('atualizaProfissaoController',
		function($scope, $compile, $rootScope, webservicesProfissao, $timeout, ngDialog, growl){
	
	var mensagemOK = "Registros atualizados com sucesso";
	var mensagemErro = "Registros não atualizados";
	$scope.carregaSpinner = false;
	
	var dia; 
	var mes;
	
	
	webservicesProfissao.buscarProfissaoId($rootScope.codigo).success(function(data) {
		
	
		$scope.profissao = data;
		
		dia = data.dia;
		mes = data.mes;
		
	
		
		$timeout(function(){
			
			$scope.profissao.dia =JSON.stringify(dia);
			$scope.profissao.mes  =JSON.stringify(mes);
		},100)
		
		
	});
	
	
		
	
	$scope.atualizaProfissao = function() {

		ngDialog.openConfirm({
			template : 'telas/dialogo/dialogoAltera.html',
			className : 'ngdialog-theme-default',
			controller : 'atualizaProfissaoController'
		}).then(
				function(success) {
					$scope.carregaSpinner = true;

					webservicesProfissao.atualizarProfissao($scope.profissao).success(function(data, status)  {

					$timeout(function(){
						growl.addSuccessMessage(mensagemOK);
						$scope.carregaSpinner = false;

						
					},200)	
						
						
						if (status == 200) {

							$("#paginas").empty();
							var compiledeHTML = $compile("<profissao></profissao>")(
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
	$scope.voltarBuscaProfissao = function() {
		
		$("#paginas").empty();
		var compiledeHTML = $compile("<profissao></profissao>")(
				$rootScope);
		$("#paginas").append(compiledeHTML);

	}
	
	
});		