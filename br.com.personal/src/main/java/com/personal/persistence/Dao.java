package com.personal.persistence;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Dao {

	
	public Connection con = null;
	public ResultSet rs = null;
	public PreparedStatement stmt = null;
	
	
	public void open() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException{
		
		String url = "jdbc:mysql://thh2lzgakldp794r.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/fcpqky1zldibdigg";
		String user =  "yoekozx8o4n7yzad";               
		String password =  "itqcwcn3qrb8l6em";              

		Class.forName("com.mysql.jdbc.Driver");
		 con = DriverManager.getConnection(url, user, password);

		
	}
	
	
	public void close(){
		
		try {
			con.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
}
