package ubb.project.ubb.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ubb.project.ubb.data.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


public class ITSMUserDetails  implements UserDetails{

    @Getter
    private final User user;
    List<? extends GrantedAuthority> authorities = new ArrayList<>();

    public ITSMUserDetails(User user) {
        this.user = user;
        this.authorities = user.getRoles().stream()
            .map(role-> new SimpleGrantedAuthority(role.getRoleName().name()))
                .toList();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }


}
