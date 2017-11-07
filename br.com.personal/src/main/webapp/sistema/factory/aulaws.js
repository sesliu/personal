personal.factory("webservicesAula", function($http) {

	var url = "../api";

	var _gravarAula = function(aula) {
		return $http.post(url + '/gravaraula', aula);
	};

	var _atualizarAula = function(aula) {
		console.log(aula)
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
	
	var _vincularAula = function(obj) {
		return $http.get(url + '/vincularaula/'+obj);
	};
	
	var _vincularAulaAluno = function(obj) {
		return $http.get(url + '/vincularaulaaluno/'+obj);
	};


	var _listaAulas = function() {
		return $http.get(url + '/listaaulas');
	};
	
	var _buscaAulaDia = function(dia) {
		return $http.get(url + '/listaaulasDia/'+dia);
	};
	
	var _buscaDadosDia = function(codigo) {
		return $http.get(url + '/buscarDadosAula/'+codigo);
	};
	
	var _buscaDiasAula = function(codigo, mes, ano) {
		return $http.get(url + '/aulasDias/'+codigo+'/'+ mes+'/'+ano);
	};
	
	var _buscaAulasAluno = function(codigo, mes, ano) {
		return $http.get(url + '/aulasAluno/'+codigo+'/'+ mes+'/'+ano);
	};
	
	
	var _buscaAulasAlunoAnterior = function(codigo, mes, ano) {
		return $http.get(url + '/aulasAlunoAnterior/'+codigo+'/'+ mes+'/'+ano);
	};
	
	
	
	var _vincularAulaAlunoTreino = function(codigo,obj) {
		return $http.get(url + '/vincularaulaalunotreino/' + codigo+'/'+obj);
	};
	
	var _atualizarAulaDoDia = function(aula) {
		
		return $http.post(url + '/atualizarauladodia', aula );
	};
	
	
	var _gerarRelatorioTreino = function(mes,ano,lista) {
		
		return $http.get(url + '/relatorioTreino/'+ mes+'/'+ano+'/'+lista);
	};
	
	
	return {

		gravarAula : _gravarAula,
		buscarAula : _buscarAula,
		excluirAula:_excluirAula,
		buscarAulaId: _buscarAulaId,
		atualizarAula:_atualizarAula,
		vincularAula:_vincularAula,
		listaAulas:_listaAulas,
		buscaAulaDia:_buscaAulaDia,
		buscaDadosDia:_buscaDadosDia,
		buscaDiasAula:_buscaDiasAula,
		vincularAulaAluno:_vincularAulaAluno,
		vincularAulaAlunoTreino:_vincularAulaAlunoTreino,
		buscaAulasAluno:_buscaAulasAluno,
		buscaAulasAlunoAnterior:_buscaAulasAlunoAnterior,
		atualizarAulaDoDia:_atualizarAulaDoDia,
		gerarRelatorioTreino: _gerarRelatorioTreino
	}

});