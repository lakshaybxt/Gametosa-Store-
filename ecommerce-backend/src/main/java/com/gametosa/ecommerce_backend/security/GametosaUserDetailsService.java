package com.gametosa.ecommerce_backend.security;

import com.gametosa.ecommerce_backend.domain.entities.User;
import com.gametosa.ecommerce_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GametosaUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String number) throws UsernameNotFoundException {
        User user = userRepository.findByMobileNumber(number)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with this number"));
        return new GametosaUserDetails (user);
    }
}
