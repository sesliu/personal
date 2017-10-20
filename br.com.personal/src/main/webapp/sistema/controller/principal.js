personal.controller('principalController',function($scope,$compile){
	
	
	$scope.exibeTela = true;
	
	
	$scope.buscarAluno = function(){
		
		$scope.exibeTela = false;
		console.log('teste');
		$("#paginas").empty();
		var compiledeHTML = $compile("<buscaaluno></buscaaluno>")
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
		console.log('teste');
		$("#paginas").empty();
		var compiledeHTML = $compile("<buscatreino></buscatreino>")
		($scope);
		$("#paginas").append(compiledeHTML);
		
	}
	
	$scope.buscarAula = function(){
		
		$scope.exibeTela = false;
		console.log('teste');
		$("#paginas").empty();
		var compiledeHTML = $compile("<buscaaula></buscaaula>")
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
	
	
});
