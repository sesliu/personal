package com.personal.webservices;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.personal.model.Aluno;
import com.personal.model.AulaExtra;
import com.personal.persistence.AlunoDao;
import com.personal.persistence.AulaExtraDao;

@RestController
@RequestMapping("/api")
public class AulaExtraWS {

	
	@RequestMapping(value = "/buscaraulaextra/{mes}/{ano}", method = RequestMethod.GET, produces = "application/json")
	public List<AulaExtra> buscaAulaExtra(@PathVariable("mes") String mes, @PathVariable("ano") Integer ano) {

		AulaExtraDao aulaExtraDao  = new AulaExtraDao();
		
		List<AulaExtra> lst = new ArrayList<AulaExtra>();
		try {
			lst = aulaExtraDao.findByAulaExtra(mes, ano);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
	}
	
	
	
}
