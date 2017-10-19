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
	
	@RequestMapping(value="/gravarpagamento", method = RequestMethod.POST, consumes = "application/json")
	public void gravaràgamento(@RequestBody Aluno aluno) {
	
		AlunoDao alunoDao  = new AlunoDao();
		
		
		try {
			
			alunoDao.createFinanceiro(aluno);
		
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
		
		}
		
		
	
	}	
	@RequestMapping(value="/estornapagamento", method = RequestMethod.POST, consumes = "application/json")
	public void estornapagamento(@RequestBody Aluno aluno) {
	
		AlunoDao alunoDao  = new AlunoDao();
		
		
		try {
			
			alunoDao.deleteFinanceiro(aluno);
		
			
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
	
	
	@RequestMapping(value = "/buscarFinanceiro/{mes}/{ano}", method = RequestMethod.GET, produces = "application/json")
	public List<Aluno> buscaFinanceiro(@PathVariable("mes") String mes, @PathVariable("ano") Integer ano) {

		AlunoDao alunoDao  = new AlunoDao();
		
		List<Aluno> lst = new ArrayList<Aluno>();
		try {
			lst = alunoDao.findByFinanceiro(mes, ano);
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
	
	
	@RequestMapping(value = "/buscaralunoIdtreino/{codigo}", method = RequestMethod.GET, produces = "application/json")
	public List<Aluno> buscaTreino(@PathVariable("codigo") Integer codigo) {

		Aluno aluno  = new Aluno();
		AlunoDao alunoDao  = new AlunoDao();
		List<Aluno> lst = new ArrayList<Aluno>();
		
		try {
			lst = alunoDao.findByIdTreino(codigo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
	}
	
	

	@RequestMapping(value = "/buscaralunoIdtreinovinculado/{codigo}", method = RequestMethod.GET, produces = "application/json")
	public List<Aluno> buscaTreinoVinculado(@PathVariable("codigo") Integer codigo) {

		Aluno aluno  = new Aluno();
		AlunoDao alunoDao  = new AlunoDao();
		List<Aluno> lst = new ArrayList<Aluno>();
		
		try {
			lst = alunoDao.findByIdTreinoVinculado(codigo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
	}
	
	
	@RequestMapping(value = "/buscaralunoIdAula/{codigo}", method = RequestMethod.GET, produces = "application/json")
	public List<Aluno> buscaAula(@PathVariable("codigo") Integer codigo) {

		Aluno aluno  = new Aluno();
		AlunoDao alunoDao  = new AlunoDao();
		List<Aluno> lst = new ArrayList<Aluno>();
		
		try {
			lst = alunoDao.findByIdAula(codigo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
	}
	
	@RequestMapping(value = "/buscaralunoIdAulavinculado/{codigo}", method = RequestMethod.GET, produces = "application/json")
	public List<Aluno> buscaAulaVinculado(@PathVariable("codigo") Integer codigo) {

		Aluno aluno  = new Aluno();
		AlunoDao alunoDao  = new AlunoDao();
		List<Aluno> lst = new ArrayList<Aluno>();
		
		try {
			lst = alunoDao.findByIdAulaVinculado(codigo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
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
	
	@RequestMapping(value = "/alunoHora", method = RequestMethod.GET)
	public List<Aluno> listarAlunoHora() {

		List<Aluno> lst = new ArrayList<Aluno>();

		try {
			lst = new AlunoDao().findAllAlunoHora();
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
	
	@RequestMapping(value="/alteravalor", method = RequestMethod.POST, consumes = "application/json")
	public void atualizarValor(@RequestBody Aluno aluno) {
	

		AlunoDao alunoDao  = new AlunoDao();
		
		try {
			
			alunoDao.updateValor(aluno);
		
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
		
		}
		
		
	
	}	

}
