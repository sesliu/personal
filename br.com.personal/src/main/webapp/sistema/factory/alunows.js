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

	var _buscarAlunoHora = function() {
		return $http.get(url + '/alunoHora');
	};

	var _atualizarValor = function(aluno) {
		return $http.post(url + '/alteravalor', aluno);
	};
	
	var _buscaFinanceiro = function(mes, ano) {
		return $http.get(url + '/buscarFinanceiro/'+ mes +'/'+ ano);
	};
	
	var _pagarValor = function(aluno) {
		console.log(aluno)
		return $http.post(url + '/gravarpagamento', aluno);
	};
	
	var _estornaValor = function(aluno) {
		console.log(aluno)
		return $http.post(url + '/estornapagamento', aluno);
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
		buscarAlunoIdAulaVinculada:_buscarAlunoIdAulaVinculada,
		buscarAlunoHora: _buscarAlunoHora,
		atualizarValor: _atualizarValor,
		buscaFinanceiro: _buscaFinanceiro,
		pagarValor:_pagarValor,
		estornaValor:_estornaValor
	}

});