personal.controller('mobileController', function($scope,$interval, webservicesMobile, $timeout, $compile, $rootScope){
	
	var date = new Date();
	var data;
	var hora;
	$scope.exibeAula = false;
	$scope.exibeTreino = false;
	$scope.carregaSpinner = false;
	$scope.listaTreino = [];
	$scope.iniciaAula = false;
	$scope.carregaAula = false;
	$scope.mobile = {};
	$scope.telaPrincipal = true;
	
	$scope.proximaAula ={};
	$scope.listaaluno =[];
	
	$interval(function() {
		
		 date = new Date();

		 data = moment(date).format('YYYY-MM-DD');

		 hora = moment(date).format('HH:MM');

		 $scope.data = moment(date).format('DD/MM/YYYY');
		
		var dataAtual  = new Date();
		$scope.hora = ('0'+dataAtual.getHours()).slice(-2)+':'+('0'+dataAtual.getMinutes()).slice(-2)+':'+('0'+dataAtual.getSeconds()).slice(-2);

	}, 1000)
	
	
	$interval(function(){
		
		 date = new Date();

		  data = moment(date).format('YYYY-MM-DD');

		 hora = moment(date).format('HH:MM');
		 
	
		
		 webservicesMobile.buscarAula(data, hora).success(function(data) {

			
			if(data !=''){
				
				 $scope.proximaAula = data;
				 $scope.exibeAula = true;
			}
			else{
				
				$scope.exibeAula = false;
				$scope.exibeTreino = false;
			}
			 
			
		});
		 
	
     
	},1000)
		 
	$scope.carregarAlunos = function(){
		$scope.carregaSpinner = true;
		 $scope.listaaluno =[];
		webservicesMobile.buscarAulaAluno(data, hora).success(function(data) {

			 $scope.listaaluno = data;
			 $scope.carregaSpinner = false;
	
		});
		
	}
	
			 
	$scope.buscaDadosAluno = function(id){
		
		 $scope.carregaSpinner = true;
		 
		 if(id == ''){
			 
			 $scope.listaTreino = [];
			 $scope.carregaSpinner = false;
			$scope.exibeTreino = false;
			 return;
		 }
		 
		webservicesMobile.buscarAulaAlunoTreino(id).success(function(data) {

			if(data ==''){
				
				$scope.listaTreino = [];
				$scope.exibeTreino = false;
			}else{
				
				$scope.listaTreino = data;
				$scope.exibeTreino = true;
				 $scope.carregaSpinner = false;
			}
			
			 $scope.carregaSpinner = false;
	
		});
	}
	
	
	

	$scope.encerrarAula = function(){
	
	
	$timeout(function(){
			
		$scope.telaPrincipal = true;	
		$scope.carregaAula = false;
		$scope.mobile.idAluno = "";
		$scope.listaTreino = [];
		$scope.exibeTreino = false;
		
	},200)	
	
	}
	
	

	$scope.comecaAula = function(){
		
		$scope.telaPrincipal = false;	
		$scope.carregaAula = true;
		
		
	}
	
	
	
});