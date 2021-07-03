package com.messaging.websocketsmessaging.controller;

import com.messaging.websocketsmessaging.storage.UserStorage;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;


import java.util.Collections;
import java.util.Map;
import java.util.Set;

@CrossOrigin
@RestController
public class UserController extends WebSecurityConfigurerAdapter{

    @GetMapping("/user")
    public Map<String,Object> register(@AuthenticationPrincipal OAuth2User principal) {
        UserStorage.getInstance().setUser(principal.getAttributes());
        return principal.getAttributes();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http
                .authorizeRequests(a -> a
                    .antMatchers("/","/error","/webjars/**").permitAll()
                        .anyRequest().authenticated()
                )
                .exceptionHandling(e -> e
                    .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                )
                .logout(l -> l
                    .logoutSuccessUrl("/").permitAll()
                )
                .oauth2Login();

    }

    @GetMapping("/fetchAllUsers")
    public Set<Map> fetchAll() {
        return UserStorage.getInstance().getUsers();
    }
}
