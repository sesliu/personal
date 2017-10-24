package com.personal.persistence;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.personal.modelo.Aula;


public class AulaDao extends Dao {

	
	private String procCadastraAula = "call sp_cadastraAula(?,?,?,?,?,?)";
	private String procBuscaAula = "call sp_buscaAula(?)";
	private String procDeletaAula = "call sp_excluiAula(?)";
	private String procBuscaAulaID = "call sp_buscaAulaId(?)";
	private String procAtualizaAula = "call sp_atualizaAula(?,?,?,?,?,?,?)";
	private String procReorganizaAlunoAula = "call sp_reogarnizarAlunoAula(?)";
	private String procCadastrarAlunoAula = "call sp_cadastrarAlunoAula(?,?)";


	
	public void create(Aula a)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		stmt = con.prepareStatement(procCadastraAula);
		
		stmt.setString(3, a.getDiaSemana());
		stmt.setString(4, a.getDataAula());
		stmt.setString(5, a.getTipo());
		stmt.setString(6, a.getHorario());
		stmt.execute();
		stmt.close();

		close();

	}
	
	
	public void update(Aula a)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		stmt = con.prepareStatement(procAtualizaAula);
		
		stmt.setString(3, a.getDiaSemana());
		stmt.setString(4, a.getDataAula());
		stmt.setInt(5, a.getIdAula());
		stmt.setString(6, a.getTipo());
		stmt.setString(7, a.getHorario());
		stmt.execute();
		stmt.close();

		close();

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
			
			a.setDataAula(rs.getString(4));
			a.setDiaSemana(rs.getString(5));
			a.setTipo(rs.getString(6));
			a.setHorario(rs.getString(7));
		}

		rs.close();
		stmt.close();

		close();

		return a;

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
		
		int idAluno = 0;
		
		for(Integer id: lista){
			
			
			
		if(id != null){
			
			stmt = con.prepareStatement(procCadastrarAlunoAula);	
			stmt.setInt(1, codigo);
			stmt.setInt(2, id);
			stmt.execute();
			
		}	
			
			
		}
		
		
		stmt.close();
		close();

	}


}
