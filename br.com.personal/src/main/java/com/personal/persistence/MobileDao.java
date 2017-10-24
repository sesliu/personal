package com.personal.persistence;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.personal.modelo.Mobile;

public class MobileDao extends Dao {

	private String procProximaAula = "call sp_proximaAula(?,?)";
	private String procProximaAulaAluno = "call sp_proximaAulaAluno(?,?)";
	private String procAlunoAulaTreino = "call sp_AulaAlunoTreino(?)";
	
	public Mobile findByAula(String data, String hora)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		Mobile m = new Mobile();
		stmt = con.prepareStatement(procProximaAula);
		stmt.setString(1, data);
		stmt.setString(2, hora);
		rs = stmt.executeQuery();
		if (rs.next()) {
			m.setNomeAula(rs.getString(1));
			m.setHorarioAula(rs.getString(2));
		}

		rs.close();
		stmt.close();

		close();

		return m;

	}
	
	
	
	public List<Mobile> findByAulaAluno(String data, String hora)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		List<Mobile>lst = new ArrayList<Mobile>();
		
		stmt = con.prepareStatement(procProximaAulaAluno);
		stmt.setString(1, data);
		stmt.setString(2, hora);
		rs = stmt.executeQuery();
		while (rs.next()) {
			Mobile m = new Mobile();
			m.setIdAluno(rs.getInt(1));
			m.setIdAula(rs.getInt(2));
			m.setNomeAluno(rs.getString(3));
			
			lst.add(m);
		}

		rs.close();
		stmt.close();

		close();

		return lst;

	}
	
	public List<Mobile> findByAulaAlunoTreino(Integer idAluno)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		List<Mobile>lst = new ArrayList<Mobile>();
		
		stmt = con.prepareStatement(procAlunoAulaTreino);
		stmt.setInt(1, idAluno);
		rs = stmt.executeQuery();
		while (rs.next()) {
			Mobile m = new Mobile();
			m.setNomeTreino(rs.getString(1));
			m.setIdTreino(rs.getInt(2));
			lst.add(m);
		}

		rs.close();
		stmt.close();

		close();

		return lst;

	}
}
