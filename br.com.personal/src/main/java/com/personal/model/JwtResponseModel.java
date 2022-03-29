package com.personal.model;

import java.io.Serializable;

import lombok.Getter;

@Getter
public class JwtResponseModel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3362691557100807036L;

	private final String token;

	public JwtResponseModel(String token) {
		this.token = token;
	}
	
	
	
}
