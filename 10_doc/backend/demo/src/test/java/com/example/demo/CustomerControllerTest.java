package com.example.demo;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class CustomerControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private CustomerRepository customerRepository;

    @BeforeEach
    void setUp() {
        customerRepository.deleteAll();
        customerRepository.save(new Customer("Jack", "Bauer"));
    }

    @Test
    void test_get_customers_by_last_name() throws Exception {
        mvc.perform(get("/customers?lastName=Bauer"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].firstName").value("Jack"))
            .andExpect(jsonPath("$[0].lastName").value("Bauer"));
    }

    @Test
    void test_create_customer() throws Exception {
        mvc.perform(post("/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"firstName\":\"Alice\",\"lastName\":\"Smith\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.firstName").value("Alice"));
    }
}
