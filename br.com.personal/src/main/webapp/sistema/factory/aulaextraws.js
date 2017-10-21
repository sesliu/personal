personal.factory("webservicesAulaExtra", function($http) {

	var url = "../api";

	var _buscaAulaExtra = function(mes, ano) {
		return $http.get(url + '/buscaraulaextra/'+ mes +'/'+ ano);
	}
	
	return {

		buscaAulaExtra:_buscaAulaExtra
	}
});