personal.factory("webservicesProfissao", function($http) {

	var url = "../personal/api";
	
	var _gravarProfissao = function(profissao) {
		
		return $http.post(url + '/gravarProfissao', profissao);
	};

	var _atualizarProfissao = function(profissao) {
		return $http.post(url + '/atualizarProfissao', profissao);
	};

	
	var _buscarProfissao = function() {
		return $http.get(url + '/profissoes');
	};
	
	var _excluirProfissao = function(profissao) {
		return $http.delete(url + '/excluirprofissao/' + profissao);
	};
	
	var _buscarProfissaoId = function(codigo) {
		return $http.get(url + '/buscarprofissaoId/' + codigo);
	};
	
	
	return {
		
		gravarProfissao:_gravarProfissao,
		atualizarProfissao:_atualizarProfissao,
		buscarProfissao:_buscarProfissao,
		excluirProfissao:_excluirProfissao,
		buscarProfissaoId: _buscarProfissaoId
		
	}
	
});