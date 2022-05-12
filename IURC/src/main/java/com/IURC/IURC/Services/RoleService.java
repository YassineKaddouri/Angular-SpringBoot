package com.IURC.IURC.Services;

import com.IURC.IURC.Entities.Role;
import com.IURC.IURC.Entities.User;
import com.IURC.IURC.Exceptions.ResourceNotFoundException;
import com.IURC.IURC.Repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    public void deleteRole(long id) {

        roleRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Role", "Id", id));
        roleRepository.deleteById(id);

    }
}
