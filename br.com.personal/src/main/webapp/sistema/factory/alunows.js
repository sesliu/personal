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
	
	var _buscarAlunoIdTreino = function(codigo) {
		return $http.get(url + '/buscaralunoIdtreino/' + codigo);
	};

	var _buscarAlunoIdTreinoVinculado = function(codigo) {
		return $http.get(url + '/buscaralunoIdtreinovinculado/' + codigo);
	};

	var _buscarAlunoIdAula = function(codigo) {
		return $http.get(url + '/buscaralunoIdAula/' + codigo);
	};

	var _buscarAlunoIdAulaVinculada = function(codigo) {
		return $http.get(url + '/buscaralunoIdAulavinculado/' + codigo);
	};

	
	return {

		gravarAluno : _gravarAluno,
		buscarAluno : _buscarAluno,
		excluirAluno: _excluirAluno,
		buscarAlunoId: _buscarAlunoId,
		atualizarAluno:_atualizarAluno,
		buscarAlunoIdTreino:_buscarAlunoIdTreino,
		buscarAlunoIdTreinoVinculado:_buscarAlunoIdTreinoVinculado,
		buscarAlunoIdAula:_buscarAlunoIdAula,
		buscarAlunoIdAulaVinculada:_buscarAlunoIdAulaVinculada
	}

});