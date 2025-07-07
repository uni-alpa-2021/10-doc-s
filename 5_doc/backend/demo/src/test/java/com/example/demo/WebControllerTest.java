package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

@SpringBootTest
@AutoConfigureMockMvc
public class WebControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    public void testGetForm() throws Exception {
        mvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(view().name("form"));
    }

    @Test
    public void testPostValidForm() throws Exception {
        mvc.perform(post("/")
                .param("name", "John")
                .param("age", "18"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/results"));
    }

    @Test
    public void testPostInvalidForm() throws Exception {
        mvc.perform(post("/")
                .param("name", "")
                .param("age", "15"))
                .andExpect(status().isOk())
                .andExpect(view().name("form"));
    }
}
