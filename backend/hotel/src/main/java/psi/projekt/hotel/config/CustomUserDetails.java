package psi.projekt.hotel.config;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import psi.projekt.hotel.entity.Uzytkownicy;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class CustomUserDetails implements UserDetails {
    private final Uzytkownicy user;

    public CustomUserDetails(Uzytkownicy user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getRola() == null ? Collections.emptyList() :
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRola().name()));
    }

    @Override
    public String getPassword() {
        return user.getHaslo();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

