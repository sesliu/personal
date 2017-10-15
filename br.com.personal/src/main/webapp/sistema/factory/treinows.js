personal.factory("webservices", function($http) {

	var url = "../api";

	var _gravarTreino = function(treino) {
		return $http.post(url + '/gravartreino', treino);
	};

	var _atualizarTreino = function(treino) {
		return $http.post(url + '/atualizartreino', treino);
	};

	var _buscarTreino = function(treino) {
		return $http.get(url + '/buscartreino/' + treino);
	};

	var _excluirTreino = function(treino) {
		return $http.delete(url + '/excluirtreino/' + treino);
	};

	var _buscarTreinoId = function(codigo) {
		return $http.get(url + '/buscartreinoId/' + codigo);
	};

	return {

		gravarTreino : _gravarTreino,
		buscarTreino : _buscarTreino,
		excluirTreino:_excluirTreino,
		buscarTreinoId: _buscarTreinoId,
		atualizarTreino:_atualizarTreino
	}

});