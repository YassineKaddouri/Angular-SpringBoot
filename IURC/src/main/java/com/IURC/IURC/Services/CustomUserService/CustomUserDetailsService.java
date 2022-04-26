package  com.IURC.IURC.Services.CustomUserService;


import com.IURC.IURC.Entities.User;
import com.IURC.IURC.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (null == user || ! user.getUsername().equals(username)) {
            throw new UsernameNotFoundException("No user present with username: " + username);
        } else {

            return CustomUserDetails.build(user);
        }
    }

}