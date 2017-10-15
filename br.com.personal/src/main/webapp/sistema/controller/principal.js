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
	
	
});
