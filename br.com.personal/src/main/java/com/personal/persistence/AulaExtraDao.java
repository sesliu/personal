package com.personal.persistence;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.personal.model.AulaExtra;

@Repository
public class AulaExtraDao extends Dao {

	

	private String procListaAulaExtra = "call sp_buscaDadosAulaExtra(?,?)";
	
	
	public List<AulaExtra> findByAulaExtra(String mes, Integer ano)
			throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {

		open();

		ArrayList<AulaExtra> aulas = new ArrayList<AulaExtra>();

		stmt = con.prepareStatement(procListaAulaExtra);
		stmt.setString(1, mes);
		stmt.setInt(2, ano);
		rs = stmt.executeQuery();
		while (rs.next()) {

			AulaExtra a = new AulaExtra();

			a.setNomeAluno(rs.getString(1));
			a.setNomeAula(rs.getString(2));
			a.setAulaHora(rs.getString(3));
			a.setDataAula(rs.getString(4));
			a.setHorario(rs.getString(5));
			a.setDiaSemana(rs.getString(6));
			
			aulas.add(a);
		}

		rs.close();
		stmt.close();

		close();

		return aulas;

	}
	
	
	
}
