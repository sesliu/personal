package com.personal.webservices;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.personal.modelo.Aluno;
import com.personal.persistence.AlunoDao;


@RestController
@RequestMapping("/api")
public class AlunoWS {


	
	@RequestMapping(value="/gravaraluno", method = RequestMethod.POST, consumes = "application/json")
	public void gravar(@RequestBody Aluno aluno) {
	
		AlunoDao alunoDao  = new AlunoDao();
		
		
		try {
			
			alunoDao.create(aluno);
		
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
		
		}
		
		
	
	}	
	
	
	
	@RequestMapping(value="/atualizaraluno", method = RequestMethod.POST, consumes = "application/json")
	public void atualizar(@RequestBody Aluno aluno) {
	

		AlunoDao alunoDao  = new AlunoDao();
		
		try {
			
			alunoDao.update(aluno);
		
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
		
		}
		
		
	
	}	
	@RequestMapping(value = "/buscaraluno/{nome}", method = RequestMethod.GET, produces = "application/json")
	public List<Aluno> busca(@PathVariable("nome") String nome) {

		AlunoDao alunoDao  = new AlunoDao();
		
		List<Aluno> lst = new ArrayList<Aluno>();
		try {
			lst = alunoDao.findByName(nome);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
	}
	
	
	@RequestMapping(value = "/buscaralunoId/{codigo}", method = RequestMethod.GET, produces = "application/json")
	public Aluno busca(@PathVariable("codigo") Integer codigo) {

		Aluno aluno  = new Aluno();
		AlunoDao alunoDao  = new AlunoDao();
		
		try {
			aluno = alunoDao.findById(codigo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return aluno;
	}
	
	
	
	@RequestMapping(value = "/alunos", method = RequestMethod.GET)
	public List<Aluno> listar2() {

		List<Aluno> lst = new ArrayList<Aluno>();

		try {
			lst = new AlunoDao().findAll();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
	}
	

	@RequestMapping(value = "/excluiraluno/{codigo}", method = RequestMethod.DELETE, produces = "application/json")
	public void atualiza(@PathVariable Integer codigo) throws Exception {

		AlunoDao alunoDao  = new AlunoDao();
		
		alunoDao.delete(codigo);

	}

}
