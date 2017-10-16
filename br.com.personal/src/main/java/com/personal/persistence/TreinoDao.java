package com.personal.persistence;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.personal.modelo.Treino;

public class TreinoDao extends Dao {

	private String procCadastraTreino = "call sp_cadastraTreino(?)";
	private String procBuscaTreino = "call sp_buscaTreino(?)";
	private String procDeletaTreino = "call sp_excluiTreino(?)";
	private String procBuscaTreinoID = "call sp_buscaTreinoId(?)";
	private String procAtualizaTreino = "call sp_atualizaTreino(?,?)";
	private String procReorganizaAlunoTreino = "call sp_reogarnizarAlunoTreino(?)";
	private String procCadastrarAlunoTreino = "call sp_cadastrarAlunoTreino(?,?)";

	public void create(Treino t)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		stmt = con.prepareStatement(procCadastraTreino);
		stmt.setString(1, t.getNome());
		stmt.execute();
		stmt.close();

		close();

	}
	
	
	public void update(Treino t)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		stmt = con.prepareStatement(procAtualizaTreino);
		stmt.setString(1, t.getNome());
		stmt.setInt(2, t.getIdTreino());
		stmt.execute();
		stmt.close();

		close();

	}

	public List<Treino> findByName(String nome)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		ArrayList<Treino> treinos = new ArrayList<Treino>();

		stmt = con.prepareStatement(procBuscaTreino);
		stmt.setString(1, nome);
		rs = stmt.executeQuery();
		while (rs.next()) {

			Treino t = new Treino();

			t.setIdTreino(rs.getInt(1));
			t.setNome(rs.getString(2));

			treinos.add(t);
		}

		rs.close();
		stmt.close();

		close();

		return treinos;

	}
	
	public Treino findById(Integer codigo)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		Treino t = new Treino();
		stmt = con.prepareStatement(procBuscaTreinoID);
		stmt.setInt(1, codigo);
		rs = stmt.executeQuery();
		if (rs.next()) {

			

			t.setIdTreino(rs.getInt(1));
			t.setNome(rs.getString(2));

			
		}

		rs.close();
		stmt.close();

		close();

		return t;

	}

	public List<Treino> findAll()
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		ArrayList<Treino> treino = new ArrayList<Treino>();

		stmt = con.prepareStatement("select * from treino ");
		rs = stmt.executeQuery();
		while (rs.next()) {

			Treino t = new Treino();

			t.setIdTreino(rs.getInt(1));
			t.setNome(rs.getString(2));

			treino.add(t);
		}

		rs.close();
		stmt.close();

		close();

		return treino;

	}
	
	public void delete(int codigo)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		stmt = con.prepareStatement(procDeletaTreino);
		stmt.setInt(1, codigo);
		stmt.execute();
		stmt.close();

		close();

	}
	
	
	private void excluirAlunoTreino(int codigo) throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException{
		
		open();

		stmt = con.prepareStatement(procReorganizaAlunoTreino);
		stmt.setInt(1, codigo);
		stmt.execute();

		stmt.close();
		close();

	}
	
	
	public void vincularTreino(int codigo, List<Integer> lista)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		
		
		try {
			excluirAlunoTreino(codigo);
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
			
			stmt = con.prepareStatement(procCadastrarAlunoTreino);	
			stmt.setInt(1, codigo);
			stmt.setInt(2, id);
			stmt.execute();
			
		}	
			
			
		}
		
		
		stmt.close();
		close();

	}

}
