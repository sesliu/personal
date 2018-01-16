package com.personal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.ImportResource;


@SpringBootApplication

public class Main extends SpringBootServletInitializer{
		
	

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Main.class);
    }
	
		public static void main(String[] args) throws Exception{
			SpringApplication.run(Main.class, args);
		}
		
		
		

}
