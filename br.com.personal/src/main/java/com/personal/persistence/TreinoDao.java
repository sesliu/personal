package com.personal.persistence;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.personal.modelo.Treino;

public class TreinoDao extends Dao {

	private String procCadastraTreino = "call sp_cadastraTreino(?)";
	private String procBuscaTreino = "call sp_buscaTreino()";
	private String procDeletaTreino = "call sp_excluiTreino(?)";
	private String procBuscaTreinoID = "call sp_buscaTreinoId(?)";
	private String procAtualizaTreino = "call sp_atualizaTreino(?,?)";
	private String procReorganizaAlunoTreino = "call sp_reogarnizarAulaTreino(?)";
	private String procCadastrarAlunoTreino = "call sp_cadastrarAlunoTreino(?,?)";
	private String procVinculaTreino = "call sp_verificaAulaTreino(?)";
	private String procTreinoVinculado = "call sp_verificaAulaVinculada(?)";
	private String procCadastrarAulaTreino = "call sp_cadastrarAulaTreino(?,?)";
	
	

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

	public List<Treino> findByName()
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		ArrayList<Treino> treinos = new ArrayList<Treino>();

		stmt = con.prepareStatement(procBuscaTreino);
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

	public List<Treino> vincularTreinoVinculado(Integer codigo)
			throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {

		open();
		List<Treino> lst = new ArrayList<Treino>();
		stmt = con.prepareStatement(procTreinoVinculado);
		stmt.setInt(1, codigo);
		ResultSet rs = stmt.executeQuery();
		while (rs.next()) {

			Treino t = new Treino();
			t.setIdTreino(rs.getInt(1));
			t.setNome(rs.getString(2));

			lst.add(t);

		}

		stmt.close();
		rs.close();
		close();

		return lst;
	}

	public List<Treino> vincularAulaTreino(Integer codigo)
			throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {

		open();
		List<Treino> lst = new ArrayList<Treino>();
		stmt = con.prepareStatement(procVinculaTreino);
		stmt.setInt(1, codigo);
		ResultSet rs = stmt.executeQuery();
		while (rs.next()) {

			Treino t = new Treino();
			t.setIdTreino(rs.getInt(1));
			t.setNome(rs.getString(2));

			lst.add(t);

		}

		stmt.close();
		rs.close();
		close();

		return lst;
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

	private void excluirAulaTreino(int codigo)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

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
			excluirAulaTreino(codigo);
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

		for (Integer id : lista) {

			if (id != null) {

				stmt = con.prepareStatement(procCadastrarAulaTreino);
				stmt.setInt(1, codigo);
				stmt.setInt(2, id);
				stmt.execute();

			}

		}

		stmt.close();
		close();

	}

}
