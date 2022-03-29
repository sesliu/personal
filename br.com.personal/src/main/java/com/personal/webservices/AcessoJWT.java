package com.personal.webservices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.personal.model.JwtRequestModel;
import com.personal.model.JwtResponseModel;
import com.personal.security.JwtUser;
import com.personal.security.TokenManagement;

@RestController
@CrossOrigin
public class AcessoJWT {

	@Autowired
	private JwtUser user;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private TokenManagement tokenManager;

	@PostMapping("/login")
	public ResponseEntity createToken(@RequestBody JwtRequestModel request) throws Exception {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.getLogin(), request.getSenha()));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
		final UserDetails userDetails = user.loadUserByUsername(request.getLogin());
		final String jwtToken = tokenManager.generateJwtToken(userDetails);
		return ResponseEntity.ok(new JwtResponseModel(jwtToken));
	}

}
