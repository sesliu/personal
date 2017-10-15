package com.personal;

import java.sql.SQLException;

import com.personal.persistence.TreinoDao;

public class Teste {

	
	public static void main(String[] args) {
		
		TreinoDao dao = new TreinoDao();
		
		try {
			System.out.println(dao.findAll());
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
}
