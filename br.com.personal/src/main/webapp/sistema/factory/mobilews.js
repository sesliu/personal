personal.factory("webservicesMobile", function($http) {

	var url = "../api";

	
	var _buscarAula = function(data, hora) {
		return $http.get(url + '/buscaraula/' + data+'/'+hora);
	};

	var _buscarAulaAluno = function(data, hora) {
		return $http.get(url + '/buscaraulaaluno/' + data+'/'+hora);
	};
	
	var _buscarAulaAlunoTreino = function(idAluno) {
		return $http.get(url + '/buscaraulaalunoTreino/'+idAluno);
	};


	
	return{
		
		buscarAula: _buscarAula,
		buscarAulaAluno:_buscarAulaAluno,
		buscarAulaAlunoTreino:_buscarAulaAlunoTreino
	}
	
});