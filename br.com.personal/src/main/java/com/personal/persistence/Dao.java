package com.personal.persistence;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

public class Dao {

	public Connection con = null;
	public ResultSet rs = null;
	public PreparedStatement stmt = null;

	
	public void open() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		// thh2lzgakldp794r.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/fcpqky1zldibdigg

		// "jdbc:mysql://personalgym.mysql.uhserver.com:3306/personalgym";

		// "jdbc:mysql://br-cdbr-azure-south-b.cloudapp.net:3306/personal";
      //		String user = "b8acf746965ef8";
	// 	String password = "4260704f";
		
		String url = "jdbc:mysql://personalgym.mysql.uhserver.com:3306/personalgym?connectTimeout=0&socketTimeout=0&autoReconnect=true";
		String user = "personalgym";
		String password = "Personal@Gym@22";
		
		
		/*String url = "jdbc:mysql://personalgymprod.mysql.uhserver.com:3306/personalgymprod?autoReconnect=true";
		String user = "persosnalgym";
		String password = "Personal@6";
		*/
		
		
		Class.forName("com.mysql.jdbc.Driver");
		con = DriverManager.getConnection(url,user,password);
	
	}

	public void close() {

		try {
			con.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
