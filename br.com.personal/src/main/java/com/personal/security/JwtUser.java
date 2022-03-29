package com.personal.security;

import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.personal.model.Personal;
import com.personal.persistence.AulaDao;

@Service
public class JwtUser implements UserDetailsService{

	@Autowired
	private AulaDao aulaDao;
	
	@Override 
	   public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Personal personal = new Personal();
		  try {
			personal = aulaDao.findPersonalbyName(username);
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
				  
	      if (personal.getLogin().equals(username)) { 
	         return new User(personal.getLogin(),personal.getSenha(), 
	            new ArrayList<>()); 
	      } else { 
	         throw new UsernameNotFoundException("User not found with username: " + username); 
	      } 
	   } 

}
