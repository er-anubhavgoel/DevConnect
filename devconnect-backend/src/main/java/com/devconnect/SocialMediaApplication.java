package com.devconnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SocialMediaApplication {

	public static void main(String[] args) {
		try {
			SpringApplication.run(SocialMediaApplication.class, args);
		} catch (Throwable t) {
			t.printStackTrace();
			throw t;
		}
	}

}
