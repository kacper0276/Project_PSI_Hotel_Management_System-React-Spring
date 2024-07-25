package psi.projekt.hotel.config;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import psi.projekt.hotel.entity.Uzytkownicy;
import psi.projekt.hotel.entity.projection.UzytkownicyDTO;
import psi.projekt.hotel.uzytkownicy.UzytkownicyRepository;
import psi.projekt.hotel.uzytkownicy.UzytkownicyService;

import java.util.Collections;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UzytkownicyRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Uzytkownicy> user = userRepository.findByEmail(username);

//        return new org.springframework.security.core.userdetails.User(
//                user.getUsername(),
//                user.getPassword(),
//                Collections.singleton(new SimpleGrantedAuthority(user.getRole().name()))
//        );
        return user.map(CustomUserDetails::new).orElseThrow(()-> new UsernameNotFoundException("User not found with name: "+ username));
    }
}