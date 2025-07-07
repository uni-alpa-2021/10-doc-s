package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/customers")
    public List<Customer> get_customers_by_last_name(@RequestParam String lastName) {
        return customerRepository.findByLastName(lastName);
    }

    @PostMapping("/customers")
    public Customer create_customer(@RequestBody Customer customer) {
        return customerRepository.save(customer);
    }
}
