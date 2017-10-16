package com.personal.persistence;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.personal.modelo.Aluno;


public class AlunoDao extends Dao{


	private String procCadastraAluno = "call sp_cadastraAluno(?,?,?,?,?,?,?,?,?,?)";
	private String procBuscaAluno = "call sp_buscaAluno(?)";
	private String procDeletaAluno = "call sp_excluiAluno(?)";
	private String procBuscaAlunoID = "call sp_buscaAlunoId(?)";
	private String procAtualizaAluno = "call sp_atualizaAluno(?,?,?,?,?,?,?,?,?,?,?)";
	private String procVerificaAlunoTreino = "call sp_verificaAlunoTreino(?)";
	private String procListaAlunoTreino = "call sp_listaAlunoTreino(?)";
	private String procVerificaAlunoAula = "call sp_verificaAlunoAula(?)";
	private String procListaAlunoAula = "call sp_listaAlunoAula(?)";

	
	public void create(Aluno a)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		stmt = con.prepareStatement(procCadastraAluno);
		stmt.setString(1, a.getNome());
		stmt.setString(2, a.getEmail());
		stmt.setString(3, a.getSexo());
		stmt.setString(4, a.getDataNascimento());
		stmt.setString(5, a.getProfissao());
		stmt.setString(6, a.getTelefoneResidencial());
		stmt.setString(7, a.getTelefoneComercial());
		stmt.setString(8, a.getTelefoneCelular());
		stmt.setDouble(9, a.getHoraAula());
		stmt.setDouble(10, a.getAjuste());
	
		stmt.execute();
		stmt.close();

		close();

	}
	
	
	public void update(Aluno a)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		stmt = con.prepareStatement(procAtualizaAluno);
		stmt.setString(1, a.getNome());
		stmt.setString(2, a.getEmail());
		stmt.setString(3, a.getSexo());
		stmt.setString(4, a.getDataNascimento());
		stmt.setString(5, a.getProfissao());
		stmt.setString(6, a.getTelefoneResidencial());
		stmt.setString(7, a.getTelefoneComercial());
		stmt.setString(8, a.getTelefoneCelular());
		stmt.setDouble(9, a.getHoraAula());
		stmt.setDouble(10, a.getAjuste());
		stmt.setDouble(11, a.getIdAluno());
		stmt.execute();
		stmt.close();

		close();

	}

	public List<Aluno> findByName(String nome)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		ArrayList<Aluno> alunos = new ArrayList<Aluno>();

		stmt = con.prepareStatement(procBuscaAluno);
		stmt.setString(1, nome);
		rs = stmt.executeQuery();
		while (rs.next()) {

			Aluno a = new Aluno();

			a.setIdAluno(rs.getInt(1));
			a.setNome(rs.getString(2));
			a.setEmail(rs.getString(3));
			a.setTelefoneResidencial(rs.getString(7));
			a.setTelefoneCelular(rs.getString(9));
			
			alunos.add(a);
		}

		rs.close();
		stmt.close();

		close();

		return alunos;

	}
	
	public Aluno findById(Integer codigo)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		Aluno a = new Aluno();
		stmt = con.prepareStatement(procBuscaAlunoID);
		stmt.setInt(1, codigo);
		rs = stmt.executeQuery();
		if (rs.next()) {

			a.setIdAluno(rs.getInt(1));
			a.setNome(rs.getString(2));
			a.setEmail(rs.getString(3));
			a.setSexo(rs.getString(4));
			a.setDataNascimento(rs.getString(5));
			a.setProfissao(rs.getString(6));
			a.setTelefoneResidencial(rs.getString(7));
			a.setTelefoneComercial(rs.getString(8));
			a.setTelefoneCelular(rs.getString(9));
			a.setHoraAula(rs.getDouble(10));
			a.setAjuste(rs.getDouble(11));
			
			
		}

		rs.close();
		stmt.close();

		close();

		return a;

	}

	public List<Aluno> findByIdTreino(Integer codigo)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();


		ArrayList<Aluno> alunos = new ArrayList<Aluno>();
		stmt = con.prepareStatement(procVerificaAlunoTreino);
		stmt.setInt(1, codigo);
		rs = stmt.executeQuery();
		
		while (rs.next()) {
			Aluno a = new Aluno();
			a.setIdAluno(rs.getInt(1));
			a.setNome(rs.getString(2));
			
			alunos.add(a);
			
		}

		rs.close();
		stmt.close();

		close();

		return alunos;

	}

	public List<Aluno> findByIdTreinoVinculado(Integer codigo)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();


		ArrayList<Aluno> alunos = new ArrayList<Aluno>();
		stmt = con.prepareStatement(procListaAlunoTreino);
		stmt.setInt(1, codigo);
		rs = stmt.executeQuery();
		
		while (rs.next()) {
			Aluno a = new Aluno();
			a.setIdAluno(rs.getInt(1));
			a.setNome(rs.getString(2));
			
			alunos.add(a);
			
		}

		rs.close();
		stmt.close();

		close();

		return alunos;

	}

	public List<Aluno> findByIdAula(Integer codigo)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();


		ArrayList<Aluno> alunos = new ArrayList<Aluno>();
		stmt = con.prepareStatement(procVerificaAlunoAula);
		stmt.setInt(1, codigo);
		rs = stmt.executeQuery();
		
		while (rs.next()) {
			Aluno a = new Aluno();
			a.setIdAluno(rs.getInt(1));
			a.setNome(rs.getString(2));
			
			alunos.add(a);
			
		}

		rs.close();
		stmt.close();

		close();

		return alunos;

	}
	
	
	public List<Aluno> findByIdAulaVinculado(Integer codigo)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();


		ArrayList<Aluno> alunos = new ArrayList<Aluno>();
		stmt = con.prepareStatement(procListaAlunoAula);
		stmt.setInt(1, codigo);
		rs = stmt.executeQuery();
		
		while (rs.next()) {
			Aluno a = new Aluno();
			a.setIdAluno(rs.getInt(1));
			a.setNome(rs.getString(2));
			
			alunos.add(a);
			
		}

		rs.close();
		stmt.close();

		close();

		return alunos;

	}
	
	
	public List<Aluno> findAll()
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		ArrayList<Aluno> alunos = new ArrayList<Aluno>();

		stmt = con.prepareStatement("select * from aluno ");
		rs = stmt.executeQuery();
		while (rs.next()) {

			Aluno a = new Aluno();


			a.setIdAluno(rs.getInt(1));
			a.setNome(rs.getString(2));
			

			alunos.add(a);
		}

		rs.close();
		stmt.close();

		close();

		return alunos;

	}
	
	public void delete(int codigo)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		stmt = con.prepareStatement(procDeletaAluno);
		stmt.setInt(1, codigo);
		stmt.execute();
		stmt.close();

		close();

	}

}
