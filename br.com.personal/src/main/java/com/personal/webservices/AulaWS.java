package com.personal.webservices;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.personal.modelo.Aula;
import com.personal.modelo.Personal;
import com.personal.modelo.RetornaPDF;
import com.personal.modelo.Treino;
import com.personal.persistence.AulaDao;
import com.personal.persistence.TreinoDao;


@RestController
@RequestMapping("/api")

public class AulaWS {

// '/cadastrarNovaAula/'+idAluno+'/'+tipAula+'/'+horario+'/'+databanco+'/'+diaSemana)
	
	@RequestMapping(value = "/cadastrarNovaAula/{idAluno}/{tiAula}/{horario}/{databanco}/{diaSemana}", method = RequestMethod.GET)
	public void cadastrarNovaAula(@PathVariable("idAluno") Integer idAluno,@PathVariable("tiAula") String tipAula, 
								@PathVariable("horario") String horario, @PathVariable("databanco") String databanco, 
								@PathVariable("diaSemana") String diaSemana){


		try {
			new AulaDao().cadastrarNovaAula(idAluno, tipAula, horario, diaSemana,databanco);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	
	
	@RequestMapping(value="/gravaraula", method = RequestMethod.POST, consumes = "application/json")
	public void gravar(@RequestBody Aula aula) {
	
		AulaDao aulaDao  = new AulaDao();
		
		
		try {
			
			aulaDao.create(aula);
		
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
		
		}
		
	}
		@RequestMapping(value="/gravarpersonal", method = RequestMethod.POST, consumes = "application/json")
		public void gravarPersonal(@RequestBody Personal personal) {
		
			AulaDao aulaDao  = new AulaDao();
			
			
			try {
				
				aulaDao.createPersonal(personal);
			
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
			
			}
		
	}	
	
		
		@RequestMapping(value="/atualizarpersonal", method = RequestMethod.POST, consumes = "application/json")
		public void atualizarPersonal(@RequestBody Personal personal) {
		
			AulaDao aulaDao  = new AulaDao();
			
			
			try {
				
				aulaDao.updatePersonal(personal);
			
				
			} catch (Exception e) {
				// TODO Auto-generated catch block
			
			}
		
	}	
		
		
		@RequestMapping(value="/excluirpersonal", method = RequestMethod.DELETE)
		public void excluirrPersonal() {
		
			AulaDao aulaDao  = new AulaDao();
			
			
			try {
				
				aulaDao.excluirPersonal();
			
				
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
	
	
	@RequestMapping(value = "/personal", method = RequestMethod.GET)
	public Personal listarPersonal() {

		Personal p = new Personal();

		try {
			  p = new AulaDao().findPersonal();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return p;
	}
	
	
	@RequestMapping(value="/atualizarauladodia", method = RequestMethod.POST, consumes = "application/json")
	public void atualizarAulaDia(@RequestBody Aula aula) {
	
		AulaDao aulaDao  = new AulaDao();
		
		try {
			
			aulaDao.updateAulaDia(aula);
		
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
		
		}
		
		
	
	}	
	
	
	@RequestMapping(value = "/verificarAulaAluno/{mes}/{ano}/{idAluno}/{dias}", method = RequestMethod.GET, produces = "application/json")
	public Aula verficarDiasAluno(@PathVariable("mes") String mes, @PathVariable ("ano") String ano, 
			                        @PathVariable("idAluno") Integer idAluno, @PathVariable("dias") String dias) {

		AulaDao aulaDao  = new AulaDao();
		Aula a = new Aula();
		try {
			 a = aulaDao.verificarAlunoAula(mes, ano, dias, idAluno);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		 return a;
	}
	
	
	
	
	@RequestMapping(value = "/relatorioTreino/{mes}/{ano}/{lista}", method = RequestMethod.GET, produces = "application/json")
	public RetornaPDF geraRelatorio(@PathVariable("mes") String mes, @PathVariable ("ano") String ano, 
			                        @PathVariable("lista") String lista ) {

		AulaDao aulaDao  = new AulaDao();
		RetornaPDF relatorio = new RetornaPDF();
		List<Aula> lst = new ArrayList<Aula>();
		try {
			 relatorio = aulaDao.geraRelatorioTreino(mes, ano, lista);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		 return relatorio;
	}
	
	@RequestMapping(value = "/relatorioTreinoAnterior/{mes}/{ano}/{lista}", method = RequestMethod.GET, produces = "application/json")
	public List<Aula> geraRelatorioAnterior(@PathVariable("mes") String mes, @PathVariable ("ano") String ano, 
			                        @PathVariable("lista") String lista ) {

		AulaDao aulaDao  = new AulaDao();
		
		List<Aula> lst = new ArrayList<Aula>();
		try {
			lst = aulaDao.geraRelatorioTreinoAnterior(mes, ano, lista);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
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
	
	
	@RequestMapping(value = "/listaaulasDia/{dia}", method = RequestMethod.GET, produces = "application/json")
	public List<Aula> listaAulaDia(@PathVariable("dia") String dia) {

		AulaDao aulaDao  = new AulaDao();
		
		List<Aula> lst = new ArrayList<Aula>();
		try {
			lst = aulaDao.findByAulaDia(dia);
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
	
	@RequestMapping(value = "/buscarDadosAula/{codigo}", method = RequestMethod.GET, produces = "application/json")
	public Aula buscaDadosAula(@PathVariable("codigo") Integer codigo) {

		Aula aula  = new Aula();
		AulaDao aulaDao  = new AulaDao();
		
		try {
			aula = aulaDao.findByDadosAula(codigo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return aula;
	}
	
	@RequestMapping(value = "/vincularaulaaluno/{obj}", method = RequestMethod.GET, produces = "application/json")
	public void buscaAuloAluna(@PathVariable("obj") List<Integer> obj) {

		
		System.out.println(obj);
		
		AulaDao aulaDao  = new AulaDao();
		
		try {
			aulaDao.vincularAluno(obj);
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
			e.printStackTrace();
		}
		
	}
	
	@RequestMapping(value = "/vincularaulaalunotreino/{codigo}/{obj}", method = RequestMethod.GET, produces = "application/json")
	public void busca(@PathVariable("codigo")  Integer codigo, @PathVariable("obj") List<Integer> obj) {

		
		AulaDao aulaDao  = new AulaDao();
		
		try {
			aulaDao.vincularAula(codigo, obj);
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
			e.printStackTrace();
		}

	}
	
	@RequestMapping(value = "/vincularaula/{obj}", method = RequestMethod.GET, produces = "application/json")
	public void buscaAula(@PathVariable("obj") List<Integer> obj) {

		
		
		
		AulaDao aulaDao  = new AulaDao();
		
		try {
			aulaDao.vincularTreino(obj);
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
			e.printStackTrace();
		}
		
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
	
	@RequestMapping(value = "/aulasDias/{codigo}/{mes}/{ano}", method = RequestMethod.GET)
	public List<Aula> listar2(@PathVariable("codigo") Integer codigo,@PathVariable("mes") String mes, 
								@PathVariable("ano") String ano){

		List<Aula> lst = new ArrayList<Aula>();

		try {
			lst = new AulaDao().findByDiasAula(codigo, mes, ano);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
	}
	
	
	@RequestMapping(value = "/aulasAluno/{codigo}/{mes}/{ano}", method = RequestMethod.GET)
	public List<Aula> listarDias(@PathVariable("codigo") Integer codigo,@PathVariable("mes") String mes, 
								@PathVariable("ano") String ano){

		List<Aula> lst = new ArrayList<Aula>();

		try {
			lst = new AulaDao().findByDiasAulaAluno(codigo, mes, ano);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
	}
	
	@RequestMapping(value = "/aulasAlunoAnterior/{codigo}/{mes}/{ano}", method = RequestMethod.GET)
	public List<Aula> listarDiasAnterior(@PathVariable("codigo") Integer codigo,@PathVariable("mes") String mes, 
								@PathVariable("ano") String ano){

		List<Aula> lst = new ArrayList<Aula>();

		try {
			lst = new AulaDao().findByDiasAulaAlunoAnterior(codigo, mes, ano);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return lst;
	}
	
	
	@RequestMapping(value = "/listaaulas", method = RequestMethod.GET)
	public List<Aula> listarAula() {

		List<Aula> lst = new ArrayList<Aula>();

		try {
			lst = new AulaDao().findAulas();
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
