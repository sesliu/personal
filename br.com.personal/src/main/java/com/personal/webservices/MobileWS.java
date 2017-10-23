package com.personal.webservices;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.personal.modelo.Mobile;
import com.personal.persistence.MobileDao;

@RestController
@RequestMapping("/api")
public class MobileWS {

	@RequestMapping(value = "/buscaraula/{data}/{hora}", method = RequestMethod.GET, produces = "application/json")
	public Mobile busca(@PathVariable("data") String data, @PathVariable("hora") String hora ) {

		MobileDao mobileDao  = new MobileDao();
		Mobile m = new Mobile();
		
		try {
			m = mobileDao.findByAula(data, hora);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return m;
	}
	
	@RequestMapping(value = "/buscaraulaaluno/{data}/{hora}", method = RequestMethod.GET, produces = "application/json")
	public List<Mobile> buscaAlunos(@PathVariable("data") String data, @PathVariable("hora") String hora ) {

		MobileDao mobileDao  = new MobileDao();
		List<Mobile>lst = new ArrayList<Mobile>();
		
		try {
			lst = mobileDao.findByAulaAluno(data, hora);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
	}
	
	@RequestMapping(value = "/buscaraulaalunoTreino/{idAluno}", method = RequestMethod.GET, produces = "application/json")
	public List<Mobile> buscaAlunosTreino(@PathVariable("idAluno") Integer idAluno ) {

		MobileDao mobileDao  = new MobileDao();
		List<Mobile>lst = new ArrayList<Mobile>();
		
		try {
			lst = mobileDao.findByAulaAlunoTreino(idAluno);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
	}
	
}
