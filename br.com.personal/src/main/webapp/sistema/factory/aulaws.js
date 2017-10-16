personal.factory("webservicesAula", function($http) {

	var url = "../api";

	var _gravarAula = function(aula) {
		return $http.post(url + '/gravaraula', aula);
	};

	var _atualizarAula = function(aula) {
		return $http.post(url + '/atualizaraula', aula);
	};

	var _buscarAula = function(aula) {
		return $http.get(url + '/buscaraula/' + aula);
	};

	var _excluirAula = function(aula) {
		return $http.delete(url + '/excluiraula/' + aula);
	};

	var _buscarAulaId = function(codigo) {
		return $http.get(url + '/buscaraulaId/' + codigo);
	};
	
	var _vincularAula = function(codigo,obj) {
		return $http.get(url + '/vincularaula/' + codigo+'/'+obj);
	};

	return {

		gravarAula : _gravarAula,
		buscarAula : _buscarAula,
		excluirAula:_excluirAula,
		buscarAulaId: _buscarAulaId,
		atualizarAula:_atualizarAula,
		vincularAula:_vincularAula
	}

});