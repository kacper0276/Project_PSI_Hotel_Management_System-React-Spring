package psi.projekt.hotel.config;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import psi.projekt.hotel.entity.projection.UzytkownicyDTO;
import psi.projekt.hotel.uzytkownicy.UzytkownicyService;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UzytkownicyService UzytkownicyService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UzytkownicyDTO user = UzytkownicyService.getUserByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getHaslo(),
                Collections.singleton(new SimpleGrantedAuthority(user.getRola().name()))
        );
    }
}
