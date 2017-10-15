personal.factory("webservicesAluno", function($http) {

	var url = "../api";

	var _gravarAluno = function(aluno) {
		
		console.log(aluno)
		
		return $http.post(url + '/gravaraluno', aluno);
	};

	var _atualizarAluno = function(aluno) {
		return $http.post(url + '/atualizaraluno', aluno);
	};

	var _buscarAluno = function(aluno) {
		return $http.get(url + '/buscaraluno/' + aluno);
	};

	var _excluirAluno = function(aluno) {
		return $http.delete(url + '/excluiraluno/' + aluno);
	};

	var _buscarAlunoId = function(codigo) {
		return $http.get(url + '/buscaralunoId/' + codigo);
	};

	return {

		gravarAluno : _gravarAluno,
		buscarAluno : _buscarAluno,
		excluirAluno: _excluirAluno,
		buscarAlunoId: _buscarAlunoId,
		atualizarAluno:_atualizarAluno
	}

});