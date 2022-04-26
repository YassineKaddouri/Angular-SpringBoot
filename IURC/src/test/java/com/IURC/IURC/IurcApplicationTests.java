package com.IURC.IURC;

import com.IURC.IURC.Entities.User;
import com.IURC.IURC.Repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class IurcApplicationTests {

	@Test
	void contextLoads() {
	}
	@Autowired
	UserRepository userRepository;

	@Test
	void testUsername(){
		User u = userRepository.findByUsername("admin");

		System.out.println(u);
	}
}
