package com.personal.webservices;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.personal.model.Profissao;
import com.personal.model.Treino;
import com.personal.persistence.ProfissaoDao;
import com.personal.persistence.TreinoDao;

@RestController
@RequestMapping("/api")

public class ProfissaoWS {


	@RequestMapping(value="/gravarProfissao", method = RequestMethod.POST, consumes = "application/json")
	public void gravar(@RequestBody Profissao profissao) {
	
		ProfissaoDao profissaoDao  = new ProfissaoDao();
		
		
		try {
			
			profissaoDao.create(profissao);
		
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
		
		}
		
		
	
	}	
	
	@RequestMapping(value="/atualizarProfissao", method = RequestMethod.POST, consumes = "application/json")
	public void atualizar(@RequestBody Profissao profissao) {
	
		ProfissaoDao profissaoDao  = new ProfissaoDao();
		
		try {
			
			profissaoDao.update(profissao);
		
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
		
		}
		
		
	
	}	
	
	@RequestMapping(value = "/profissoes", method = RequestMethod.GET)
	public List<Profissao> listaProfissoes () {

		List<Profissao> lst = new ArrayList<Profissao>();

		try {
			lst = new ProfissaoDao().findAll();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
	}
	
	

	@RequestMapping(value = "/excluirprofissao/{codigo}", method = RequestMethod.DELETE, produces = "application/json")
	public void exclui(@PathVariable Integer codigo) throws Exception {

		ProfissaoDao profissaoDao  = new ProfissaoDao();
		
		profissaoDao.delete(codigo);

	}
	
	@RequestMapping(value = "/buscarprofissaoId/{codigo}", method = RequestMethod.GET, produces = "application/json")
	public Profissao busca(@PathVariable("codigo") Integer codigo) {

		Profissao profissao  = new Profissao();
		ProfissaoDao profissaoDao  = new ProfissaoDao();
		
		try {
			profissao = profissaoDao.findById(codigo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return profissao;
	}
	
	
}
