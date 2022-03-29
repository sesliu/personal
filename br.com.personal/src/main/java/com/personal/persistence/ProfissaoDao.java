package com.personal.persistence;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.personal.model.Profissao;

@Repository
public class ProfissaoDao extends Dao {

	
	private String procCadastraProfissao = "call sp_cadastraProfissao(?,?,?)";
	private String procAtualizaProfissao = "call sp_atualizaProfissao(?,?,?,?)";
	private String procExcluirProfissao =  "call sp_excluiProfissao(?)";
	private String procBuscaProfissao = "call sp_buscaProfissao()";
	private String procBuscaProfissaoId = "call sp_buscaProfissaoId(?)";
	
	
	public void create(Profissao p)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		stmt = con.prepareStatement(procCadastraProfissao);
		stmt.setInt(1, p.getDia());
		stmt.setInt(2, p.getMes());
		stmt.setString(3, p.getNome());
		
		stmt.execute();
		stmt.close();

		close();

	}
	
	
	public void update(Profissao p)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		stmt = con.prepareStatement(procAtualizaProfissao);
		stmt.setInt(1, p.getDia());
		stmt.setString(2, p.getNome());
		stmt.setInt(3, p.getMes());
		stmt.setInt(4, p.getIdProfissao());
		
		stmt.execute();
		stmt.close();

		close();

	}
	
	public Profissao findById(Integer codigo)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		Profissao p = new Profissao();
		stmt = con.prepareStatement(procBuscaProfissaoId);
		stmt.setInt(1, codigo);
		rs = stmt.executeQuery();
		if (rs.next()) {

			p.setIdProfissao(rs.getInt(1));
			p.setNome(rs.getString(2));
			p.setDia(rs.getInt(3));
			p.setMes(rs.getInt(4));
	
		}

		rs.close();
		stmt.close();

		close();

		return p;

	}


	public List<Profissao> findAll()
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		ArrayList<Profissao> profissoes = new ArrayList<Profissao>();

		stmt = con.prepareStatement(procBuscaProfissao);
		rs = stmt.executeQuery();
		while (rs.next()) {

			Profissao p = new Profissao();


			p.setIdProfissao(rs.getInt(1));
			p.setNome(rs.getString(2));
			p.setDia(rs.getInt(3));
			p.setMesNome(rs.getString(4));
			
			

			profissoes.add(p);
		}

		rs.close();
		stmt.close();

		close();

		return profissoes;

	}
	
	public void delete(int codigo)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		stmt = con.prepareStatement(procExcluirProfissao);
		stmt.setInt(1, codigo);
		stmt.execute();
		stmt.close();

		close();

	}
	
	
}
