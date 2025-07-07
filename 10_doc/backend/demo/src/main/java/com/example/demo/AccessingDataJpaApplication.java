package com.example.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AccessingDataJpaApplication {

    private static final Logger log = LoggerFactory.getLogger(AccessingDataJpaApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(AccessingDataJpaApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(CustomerRepository repository) {
        return (args) -> {
            log.info("customers_found_with_find_all:");
            repository.findAll().forEach(customer -> log.info(customer.toString()));

            Customer customer = repository.findById(1L).orElse(null);
            log.info("customer_found_with_find_by_id_1L:");
            log.info(customer != null ? customer.toString() : "not_found");

            log.info("customers_found_with_find_by_last_name_Bauer:");
            repository.findByLastName("Bauer").forEach(b -> log.info(b.toString()));
        };
    }
}
