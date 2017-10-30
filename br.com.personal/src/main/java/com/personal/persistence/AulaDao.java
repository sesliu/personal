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
	
	private String procListaAulaDia = "call sp_buscaAulaDia(?)";
	
	private String procDadosAula = "call sp_DadosAula(?)";
	
	private String procDiaAula = "call sp_buscaDiaAlunoId(?,?,?)";
	
	private static Integer idAlula;



	
	public void create(Aula a)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();
		
				
		stmt = con.prepareStatement(procCadastraAula );
		stmt.setInt(1, a.getIdAluno());
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
	
	
	public void update(Aula a)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		stmt = con.prepareStatement(procAtualizaAula);
		
		stmt.setInt(1, a.getIdAluno());
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


}
