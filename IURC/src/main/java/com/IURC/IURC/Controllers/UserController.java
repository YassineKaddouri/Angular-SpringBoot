package com.IURC.IURC.Controllers;

import com.IURC.IURC.DTOs.Mappers;
import com.IURC.IURC.DTOs.PatientDto;
import com.IURC.IURC.DTOs.RoleDto;
import com.IURC.IURC.DTOs.UserDto;
import com.IURC.IURC.Entities.Patient;
import com.IURC.IURC.Entities.Role;
import com.IURC.IURC.Entities.Secretaire;
import com.IURC.IURC.Entities.User;
import com.IURC.IURC.Exceptions.ResourceNotFoundException;
import com.IURC.IURC.Repositories.RoleRepository;
import com.IURC.IURC.Repositories.UserRepository;
import com.IURC.IURC.Services.ImageService;
import com.IURC.IURC.Services.RoleService;
import com.IURC.IURC.Services.UserService;
import fr.xebia.extras.selma.Selma;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/iurc")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private ImageService imageService;
    @Autowired
    private  UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleService roleService;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired(required = false)
    private Mappers selmaMapper = Selma.mapper(Mappers.class);

    @GetMapping("/users")
//    public ResponseEntity<List<User>>getUsers(){
//
//        return ResponseEntity.ok().body(userService.getUsers());
//    }
    public List<UserDto> getUsers(){
        List<User> allUsers = userService.getUsers();
        List<UserDto> allUsersDto = allUsers.stream().map((i)->
                selmaMapper.userToUserDTO(i))
                .collect(Collectors.toList());
        return allUsersDto;
    }
    @GetMapping("user/{id}")
    public User findById(@PathVariable("id") Long id) {

        try {
            Optional<User> User = userService.getById(id);
            return User.isPresent() ? User.get() : new User();
        } catch (Exception e) {
            System.out.println("[ERROE]   :    " + e.getMessage());
        }
        return new User();
    }

    @Transactional
    @PostMapping("/user/save")
    public ResponseEntity<UserDto>saveUser(@RequestBody UserDto userDto){
        User user = selmaMapper.dtoToUser(userDto);
        User userCreated = userService.saveUser(user);
        return ResponseEntity.ok().body(selmaMapper.userToUserDTO(userCreated));
    }
    @PostMapping("/user/saveSecretaire")
    public ResponseEntity<Secretaire>saveUser(@RequestBody Secretaire secretaire){
        return ResponseEntity.ok().body(userRepository.save(secretaire));
    }

    @PostMapping("/role/save")
    public ResponseEntity<RoleDto>saveRole(@RequestBody RoleDto roleDto){
        Role role = selmaMapper.roleDtoToRole(roleDto);
        Role roleCreated = userService.saveRole(role);
        log.info("role:",role);
        return ResponseEntity.ok().body(selmaMapper.roleToRoleDTO(roleCreated));
    }

    @PostMapping("role/addToUser")
    public ResponseEntity<?>addRoleToUser(@RequestBody RoleToUserForm form){
        userService.addRoleToUser(form.getUsername(), form.getRoleName());
        return ResponseEntity.ok().build();
    }
    @GetMapping("/role/getRole")
    public List<RoleDto> getRoles(){
        List<Role> allUsers = roleService.getRoles();
        List<RoleDto> allUsersDto = allUsers.stream().map((i)->
                        selmaMapper.roleToRoleDTO(i))
                .collect(Collectors.toList());
        return allUsersDto;
    }



    @GetMapping("login/{username}")
    public User getUserByUsername(@PathVariable("username") String username){

        return userRepository.findByUsername(username);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUsers( @PathVariable("id") Long id, @RequestPart ("signupRequest") User userDetails, @RequestPart("file") MultipartFile file  ){
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));

        String fileName = this.imageService.uploadImage(file);
        String imageUrl =  ServletUriComponentsBuilder.fromCurrentRequest().replacePath(null).toUriString()+"/images/"+fileName;
        user.setImage(imageUrl);

        user.setUsername(userDetails.getUsername());
        user.setName(userDetails.getName());
        User updateUsers = userRepository.save(user);
        return ResponseEntity.ok(updateUsers);

    }
}



@Data
class RoleToUserForm{
    private String username;
    private String roleName;
}