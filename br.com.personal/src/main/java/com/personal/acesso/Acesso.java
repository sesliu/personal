package com.personal.acesso;

import java.util.HashSet;
import java.util.Set;

import com.personal.modelo.Personal;
import com.personal.persistence.AulaDao;

public class Acesso {
	
	
	private Set<String> usuariosLogados = new HashSet<>();
	
	
   public void deslogar(String usuario) {
		usuariosLogados.remove(usuario);
	}
	
	
	public boolean isLogado(String usuario) {

		boolean resultado = false;

		if (usuariosLogados.contains(usuario)) {

			resultado = true;
		} else {
			resultado = false;
		}
		return resultado;
	}

}