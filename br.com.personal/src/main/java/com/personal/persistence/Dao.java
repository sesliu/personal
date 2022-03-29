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

	
	public void open() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		
		String url = "jdbc:mysql://k3xio06abqa902qt.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/g6fm0cjyyh9cnayj?connectTimeout=0&socketTimeout=0&autoReconnect=true";
		String user = "qjm3kc2blqyt1gce";
		String password = "hzfv08k6vqht7wsj";
		
		Class.forName("com.mysql.jdbc.Driver");
		con = DriverManager.getConnection(url,user,password);
	
	}

	public void close() {

		try {
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}
