package ubb.project.ubb.service;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ubb.project.ubb.data.User;
import ubb.project.ubb.repository.IUserRepository;

// nume stupid. TODO sa dea cineva refactor daca are o idee mai buna pentru clasa

@Service
@Transactional
public class ITSMUserDetailsService implements UserDetailsService {

    private final IUserRepository userRepository;

    public ITSMUserDetailsService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }


    // makes more sense
    public User loadUserByEmail(String email) throws UsernameNotFoundException {
        return (User) loadUserByUsername(email);
    }

    // username is actually email
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findUserWithRoles(email).orElseThrow(()->new UsernameNotFoundException("E-mail was not found."));
    }
}
