package com.personal.model;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtRequestModel implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 8114154590670803276L;
	private String login;
	private String senha;

	
	public JwtRequestModel() {

	}
	
	public JwtRequestModel(String login, String senha) {
		super();
		this.login = login;
		this.senha = senha;
		
	}
	
	
	 
	
	
}
