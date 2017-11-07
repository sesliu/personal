package com.personal.persistence;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.personal.modelo.Aula;


public class AulaDao extends Dao {

	private String procListaAulas = "call sp_buscaAula()";
	private String procCadastraAula = "call sp_cadastraAula(?,?,?,?,?,?)";
	private String procBuscaAula = "";
	private String procDeletaAula = "call sp_excluiAula(?)";
	private String procBuscaAulaID = "call sp_buscaAulaId(?)";
	private String procAtualizaAula = "call sp_atualizaAula(?,?,?,?,?,?,?,?,?,?,?,?)";
	private String procReorganizaAlunoAula = "call sp_reogarnizarAlunoAula(?)";
	private String procCadastrarAulaTreino = "call sp_cadastrarAulaTreino(?,?)";
	private String procCadastrarAulaAluno = "call sp_cadastrarAlunoAula(?,?)";
	
	private String proclistaAulaAluno = "call sp_verificaDiasAula(?,?,?)";
	private String proclistaAulaAlunoAnterior = "call sp_verificaDiasAulaAnterior(?,?,?)";
	
	private String procListaAulaDia = "call sp_buscaAulaDia(?)";
	
	private String procDadosAula = "call sp_DadosAula(?)";
	
	private String procDiaAula = "call sp_buscaDiaAlunoId(?,?,?)";
	
	private String procAtualizaDiaAula = "call sp_atualizaAuladoDia(?,?,?,?,?,?,?)";
	
	private String procRelTreino = "call sp_rl_geraTreino(?,?,?)";
	
	private String procRelTreinoAnterior = "call sp_rl_geraTreinoResultado(?,?,?)";
	
	private static Integer idAlula;



	public List<Aula> geraRelatorioTreino(String mes, String ano, String lista)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		ArrayList<Aula> aulas = new ArrayList<Aula>();
		
		stmt = con.prepareStatement(procRelTreino);
		stmt.setString(1, mes);
		stmt.setString(2, ano);
		stmt.setString(3, lista);
		rs = stmt.executeQuery();
		
		while (rs.next()) {
			Aula a = new Aula();
			a.setNomeAluno(rs.getString(1));
			a.setDataAula(rs.getString(2));
			
			aulas.add(a);
		}

		rs.close();
		stmt.close();

		close();

		return aulas;

	}
	
	
	public List<Aula> geraRelatorioTreinoAnterior(String mes, String ano, String lista)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		ArrayList<Aula> aulas = new ArrayList<Aula>();
		
		stmt = con.prepareStatement(procRelTreinoAnterior);
		stmt.setString(1, mes);
		stmt.setString(2, ano);
		stmt.setString(3, lista);
		rs = stmt.executeQuery();
		
		// presenca, falta, faltajusticada, obsjustificada, observacao, resultado, tr.nome 
		
		while (rs.next()) {
			Aula a = new Aula();
			a.setNomeAluno(rs.getString(1));
			a.setDataAula(rs.getString(2));
			a.setPresenca(rs.getString(3));
			a.setFalta(rs.getString(4));
			a.setFaltajusticada(rs.getString(5));
			a.setObsjustificada(rs.getString(6));
			a.setObservacao(rs.getString(7));
			a.setResultado(rs.getString(8));
			a.setListaTreino(rs.getString(9));
			
			aulas.add(a);
		}

		rs.close();
		stmt.close();

		close();

		return aulas;

	}
	
	
	
	
	public void create(Aula a)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();
		
				
		stmt = con.prepareStatement(procCadastraAula );
		stmt.setInt(1, 0);
		stmt.setString(2, a.getDiaSemana());
		stmt.setString(3, a.getDataAula());
		stmt.setString(4, a.getTipo());
		stmt.setString(5, a.getHorario());
		stmt.setString(6, a.getObservacao());
		ResultSet rs = stmt.executeQuery();
		
		if(rs.next()){
			
			idAlula = rs.getInt(1);
			
			
		}

		
		stmt.close();
		close();

	}
	
	public void updateAulaDia(Aula a)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		stmt = con.prepareStatement(procAtualizaDiaAula);
		
		stmt.setString(1, a.getObservacao());
		stmt.setString(2, a.getPresenca());
		stmt.setString(3, a.getFalta());
		stmt.setString(4, a.getFaltajusticada());
		stmt.setString(5, a.getObsjustificada());
		stmt.setString(6, a.getResultado());
		stmt.setInt(7, a.getIdAula());
		
		stmt.execute();
		stmt.close();

		close();

	}
	
	
	
	
	public void update(Aula a)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		stmt = con.prepareStatement(procAtualizaAula);
		
		stmt.setInt(1, 0);
		stmt.setString(2, a.getDiaSemana());
		stmt.setString(3, a.getDataAula());
		stmt.setString(4, a.getTipo());
		stmt.setString(5, a.getHorario());
		stmt.setString(6, a.getObservacao());
		stmt.setString(7, a.getPresenca());
		stmt.setString(8, a.getFalta());
		stmt.setString(9, a.getFaltajusticada());
		stmt.setString(10, a.getObsjustificada());
		stmt.setString(11, a.getResultado());
		stmt.setInt(12, a.getIdAula());
		
		stmt.execute();
		stmt.close();

		close();

	}
	
	public List<Aula> findByDiasAula(Integer codigo, String mes, String ano)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		ArrayList<Aula> aulas = new ArrayList<Aula>();
		
		stmt = con.prepareStatement(procDiaAula);
		stmt.setInt(1, codigo);
		stmt.setString(2, mes);
		stmt.setString(3, ano);
		rs = stmt.executeQuery();
		
		while (rs.next()) {
			Aula a = new Aula();
			
			a.setIdAluno(rs.getInt(1));
			a.setDataAula(rs.getString(2));
			
			
			aulas.add(a);
		}

		rs.close();
		stmt.close();

		close();

		return aulas;

	}

	public List<Aula> findByDiasAulaAluno(Integer codigo, String mes, String ano)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		ArrayList<Aula> aulas = new ArrayList<Aula>();
		
		stmt = con.prepareStatement(proclistaAulaAluno);
		stmt.setInt(1, codigo);
		stmt.setString(2, mes);
		stmt.setString(3, ano);
		rs = stmt.executeQuery();
		
		while (rs.next()) {
			Aula a = new Aula();
			
			a.setTexto(rs.getString(1));
			a.setDias(rs.getString(2));
			
			
			aulas.add(a);
		}

		rs.close();
		stmt.close();

		close();

		return aulas;

	}

	
	public List<Aula> findByDiasAulaAlunoAnterior(Integer codigo, String mes, String ano)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		ArrayList<Aula> aulas = new ArrayList<Aula>();
		
		stmt = con.prepareStatement(proclistaAulaAlunoAnterior);
		stmt.setInt(1, codigo);
		stmt.setString(2, mes);
		stmt.setString(3, ano);
		rs = stmt.executeQuery();
		
		while (rs.next()) {
			Aula a = new Aula();
			
			a.setTexto(rs.getString(1));
			a.setDias(rs.getString(2));
			
			
			aulas.add(a);
		}

		rs.close();
		stmt.close();

		close();

		return aulas;

	}
	
	
	
	public Aula findByDadosAula(Integer codigo)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		Aula a = new Aula();
		stmt = con.prepareStatement(procDadosAula);
		stmt.setInt(1, codigo);
		rs = stmt.executeQuery();
		if (rs.next()) {

			a.setHorario(rs.getString(1));
			a.setNomeAluno(rs.getString(2));
			a.setListaTreino(rs.getString(3));
			a.setObservacao(rs.getString(4));
			a.setPresenca(rs.getString(5));
			a.setFalta(rs.getString(6));
			a.setFaltajusticada(rs.getString(7));
			a.setObsjustificada(rs.getString(8));
			a.setResultado(rs.getString(9));
			a.setIdAula(rs.getInt(10));
		}

		rs.close();
		stmt.close();

		close();

		return a;

	}

	
	public List<Aula> findByAulaDia(String dia)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		ArrayList<Aula> aulas = new ArrayList<Aula>();

		stmt = con.prepareStatement(procListaAulaDia);
		stmt.setString(1, dia);
		rs = stmt.executeQuery();
		while (rs.next()) {

			Aula a = new Aula();

			a.setIdAula(rs.getInt(1));
			a.setHorario(rs.getString(2));
			a.setNomeAluno(rs.getString(3));
			aulas.add(a);
		}

		rs.close();
		stmt.close();

		close();

		return aulas;

	}

	public List<Aula> findByName(String nome)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		ArrayList<Aula> aulas = new ArrayList<Aula>();

		stmt = con.prepareStatement(procBuscaAula);
		stmt.setString(1, nome);
		rs = stmt.executeQuery();
		while (rs.next()) {

			Aula a = new Aula();

			a.setIdAula(rs.getInt(1));
			
			a.setDataAula(rs.getString(4));
			a.setDiaSemana(rs.getString(5));
			a.setTipo(rs.getString(6));
			a.setHorario(rs.getString(7));
			
			aulas.add(a);
		}

		rs.close();
		stmt.close();

		close();

		return aulas;

	}
	
	public Aula findById(Integer codigo)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		Aula a = new Aula();
		stmt = con.prepareStatement(procBuscaAulaID);
		stmt.setInt(1, codigo);
		rs = stmt.executeQuery();
		if (rs.next()) {

			a.setIdAula(rs.getInt(1));
			a.setIdAluno(rs.getInt(2));
			a.setDataAula(rs.getString(3));
			a.setDiaSemana(rs.getString(4));
			a.setHorario(rs.getString(5));
			a.setTipo(rs.getString(6));
			a.setResultado(rs.getString(7));
			a.setPresenca(rs.getString(8));
			a.setFalta(rs.getString(9));
			a.setFaltajusticada(rs.getString(10));
			a.setObservacao(rs.getString(11));
			a.setObsjustificada(rs.getString(12));
		}

		rs.close();
		stmt.close();

		close();

		return a;

	}

	public List<Aula> findAulas()
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		ArrayList<Aula> aula = new ArrayList<Aula>();

		
		stmt = con.prepareStatement(procListaAulas);
		rs = stmt.executeQuery();
		while (rs.next()) {

			Aula a = new Aula();

			a.setIdAula(rs.getInt(1));
			a.setNomeAluno(rs.getString(2));
			a.setDataAula(rs.getString(3));
			a.setDiaSemana(rs.getString(4));
			a.setHorario(rs.getString(5));
			a.setTipo(rs.getString(6));
			a.setResultado(rs.getString(7));
			a.setPresenca(rs.getString(8));
			a.setFalta(rs.getString(9));
			a.setFaltajusticada(rs.getString(10));
			
			aula.add(a);
		}

		rs.close();
		stmt.close();

		close();

		return aula;

	}
	
	
	
	public List<Aula> findAll()
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		ArrayList<Aula> aula = new ArrayList<Aula>();

		stmt = con.prepareStatement("select * from aula ");
		rs = stmt.executeQuery();
		while (rs.next()) {

			Aula a = new Aula();

			a.setIdAula(rs.getInt(1));
			
			a.setDataAula(rs.getString(4));
			a.setDiaSemana(rs.getString(5));
			a.setTipo(rs.getString(6));
			a.setHorario(rs.getString(7));
			aula.add(a);
		}

		rs.close();
		stmt.close();

		close();

		return aula;

	}
	
	public void delete(int codigo)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		stmt = con.prepareStatement(procDeletaAula);
		stmt.setInt(1, codigo);
		stmt.execute();
		stmt.close();

		close();

	}
private void excluirAlunoAula(int codigo) throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException{
		
		open();

		stmt = con.prepareStatement(procReorganizaAlunoAula);
		stmt.setInt(1, codigo);
		stmt.execute();

		stmt.close();
		close();

	}
	
	
	public void vincularTreino(List<Integer> lista)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {
		
		open();
		
		for(Integer id: lista){
			
		if(id != null){
			
		
			stmt = con.prepareStatement(procCadastrarAulaTreino);	
			stmt.setInt(1, idAlula);
			stmt.setInt(2, id);
			stmt.execute();
			
		}	
			
		
		}
		
		
		stmt.close();
		close();

	}


	public void vincularAluno(List<Integer> lista)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {
		
		open();
		
		for(Integer id: lista){
			
		if(id != null){
			
		
			stmt = con.prepareStatement(procCadastrarAulaAluno);	
			stmt.setInt(1, idAlula);
			stmt.setInt(2, id);
			stmt.execute();
			
		}	
			
		
		}
		
		
		stmt.close();
		close();

	}

	public void vincularAula(int codigo, List<Integer> lista)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		try {
			excluirAlunoAula(codigo);
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		open();

	
		for (Integer id : lista) {

			if (id != null) {

				stmt = con.prepareStatement(procCadastrarAulaAluno);
				stmt.setInt(1, codigo);
				stmt.setInt(2, id);
				stmt.execute();

			}

		}

		stmt.close();
		close();

	}
	
	
}
