package com.personal.webservices;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.personal.modelo.Aula;
import com.personal.modelo.Treino;
import com.personal.persistence.AulaDao;
import com.personal.persistence.TreinoDao;


@RestController
@RequestMapping("/api")

public class AulaWS {


	
	@RequestMapping(value="/gravaraula", method = RequestMethod.POST, consumes = "application/json")
	public void gravar(@RequestBody Aula aula) {
	
		AulaDao aulaDao  = new AulaDao();
		
		
		try {
			
			aulaDao.create(aula);
		
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
		
		}
		
		
	
	}	
	
	
	
	@RequestMapping(value="/atualizaraula", method = RequestMethod.POST, consumes = "application/json")
	public void atualizar(@RequestBody Aula aula) {
	
		AulaDao aulaDao  = new AulaDao();
		
		try {
			
			aulaDao.update(aula);
		
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
		
		}
		
		
	
	}	
	@RequestMapping(value = "/buscaraula/{nome}", method = RequestMethod.GET, produces = "application/json")
	public List<Aula> busca(@PathVariable("nome") String nome) {

		AulaDao aulaDao  = new AulaDao();
		
		List<Aula> lst = new ArrayList<Aula>();
		try {
			lst = aulaDao.findByName(nome);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
	}
	
	
	@RequestMapping(value = "/buscaraulaId/{codigo}", method = RequestMethod.GET, produces = "application/json")
	public Aula busca(@PathVariable("codigo") Integer codigo) {

		Aula aula  = new Aula();
		AulaDao aulaDao  = new AulaDao();
		
		try {
			aula = aulaDao.findById(codigo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return aula;
	}
	
	
	
	@RequestMapping(value = "/aulas", method = RequestMethod.GET)
	public List<Aula> listar2() {

		List<Aula> lst = new ArrayList<Aula>();

		try {
			lst = new AulaDao().findAll();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
	}
	

	@RequestMapping(value = "/excluiraula/{codigo}", method = RequestMethod.DELETE, produces = "application/json")
	public void atualiza(@PathVariable Integer codigo) throws Exception {

		AulaDao aulaDao  = new AulaDao();
		
		aulaDao.delete(codigo);

	}

}
