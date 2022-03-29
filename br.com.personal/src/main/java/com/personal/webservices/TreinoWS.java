package com.personal.webservices;


import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.personal.model.Treino;
import com.personal.persistence.TreinoDao;


@RestController
@RequestMapping("/api")

public class TreinoWS {

	
	
	@RequestMapping(value = "/buscartreinoVinculado/{codigo}", method = RequestMethod.GET, produces = "application/json")
	public List<Treino> buscaTreinoVinculado(@PathVariable("codigo") Integer codigo) {

		List<Treino> lst  = new ArrayList<Treino>();
		
		TreinoDao treinoDao  = new TreinoDao();
		
		try {
			lst = treinoDao.vincularTreinoVinculado(codigo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
	}
	
	
	
	@RequestMapping(value = "/buscartreinoAula/{codigo}", method = RequestMethod.GET, produces = "application/json")
	public List<Treino> buscaTreino(@PathVariable("codigo") Integer codigo) {

		List<Treino> lst  = new ArrayList<Treino>();
		
		TreinoDao treinoDao  = new TreinoDao();
		
		try {
			lst = treinoDao.vincularAulaTreino(codigo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
	}
	
	
	
	@RequestMapping(value="/gravartreino", method = RequestMethod.POST, consumes = "application/json")
	public void gravar(@RequestBody Treino treino) {
	
		TreinoDao treinoDao  = new TreinoDao();
		
	
		
		try {
			
			treinoDao.create(treino);
		
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
		
		}
		
		
	
	}	
	
	
	
	@RequestMapping(value="/atualizartreino", method = RequestMethod.POST, consumes = "application/json")
	public void atualizar(@RequestBody Treino treino) {
	
		TreinoDao treinoDao  = new TreinoDao();
		
		try {
			
			treinoDao.update(treino);
		
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
		
		}
		
		
	
	}	
	@RequestMapping(value = "/buscartreino", method = RequestMethod.GET, produces = "application/json")
	public List<Treino> busca() {

		TreinoDao treinoDao  = new TreinoDao();
		
		List<Treino> lst = new ArrayList<Treino>();
		try {
			lst = treinoDao.findByName();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
	}
	
	
	@RequestMapping(value = "/buscartreinoId/{codigo}", method = RequestMethod.GET, produces = "application/json")
	public Treino busca(@PathVariable("codigo") Integer codigo) {

		Treino treino  = new Treino();
		TreinoDao treinoDao  = new TreinoDao();
		
		try {
			treino = treinoDao.findById(codigo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return treino;
	}
	
	
	@RequestMapping(value = "/vinculartreino/{codigo}/{obj}", method = RequestMethod.GET, produces = "application/json")
	public void busca(@PathVariable("codigo")  Integer codigo, @PathVariable("obj") List<Integer> obj) {

		
		TreinoDao treinoDao  = new TreinoDao();
		
		try {
			treinoDao.vincularTreino(codigo, obj);
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			
		}

	}
	
	
	
	@RequestMapping(value = "/treinos", method = RequestMethod.GET)
	public List<Treino> listar2() {

		List<Treino> lst = new ArrayList<Treino>();

		try {
			lst = new TreinoDao().findAll();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
	}
	

	@RequestMapping(value = "/excluirtreino/{codigo}", method = RequestMethod.DELETE, produces = "text/plain")
	public String atualiza(@PathVariable Integer codigo) throws Exception {

		TreinoDao treinoDao  = new TreinoDao();
		String mensagem = null;
		
		try{
			treinoDao.delete(codigo);
		}catch(SQLException e){
			
			 mensagem = e.getMessage();
		}
		
		return mensagem;
	}

}
