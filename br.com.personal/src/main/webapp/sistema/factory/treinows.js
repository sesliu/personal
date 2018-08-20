personal.factory("webservices", function($http) {

	var url = "../personal/api";

	var _gravarTreino = function(treino) {
		return $http.post(url + '/gravartreino', treino);
	};

	var _atualizarTreino = function(treino) {
		return $http.post(url + '/atualizartreino', treino);
	};

	var _buscarTreino = function() {
		return $http.get(url + '/buscartreino');
	};

	var _excluirTreino = function(treino) {
		return $http.delete(url + '/excluirtreino/' + treino);
	};

	var _buscarTreinoId = function(codigo) {
		return $http.get(url + '/buscartreinoId/' + codigo);
	};
	
	var _vincularTreino = function(codigo,obj) {
		return $http.get(url + '/vinculartreino/' + codigo+'/'+obj);
	};

	var _buscarTodosTreinos = function() {
		return $http.get(url + '/treinos');
	};

	var _buscarTreinosAula = function(codigo) {
		return $http.get(url + '/buscartreinoAula/'+ codigo);
	};
	
	var _buscarTreinosVicunlados = function(codigo) {
		return $http.get(url + '/buscartreinoVinculado/'+ codigo);
	};
	
	
	return {

		gravarTreino : _gravarTreino,
		buscarTreino : _buscarTreino,
		excluirTreino:_excluirTreino,
		buscarTreinoId: _buscarTreinoId,
		atualizarTreino:_atualizarTreino,
		vincularTreino: _vincularTreino,
		buscarTodosTreinos:_buscarTodosTreinos,
		buscarTreinosAula:_buscarTreinosAula,
		buscarTreinosVicunlados:_buscarTreinosVicunlados
	}

});