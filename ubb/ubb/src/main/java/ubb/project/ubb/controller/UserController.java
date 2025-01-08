package ubb.project.ubb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ubb.project.ubb.data.User;
import ubb.project.ubb.dto.UserDto;
import ubb.project.ubb.repository.IUserRepository;

import java.util.Collections;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000","http://localhost:3000/*", "http://127.0.0.1:3000/*"}, maxAge = 3600)
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private IUserRepository userRepository;

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setName(userDto.getName());
            user.setEmail(userDto.getEmail());
            user.setPassword(userDto.getPassword());

            userRepository.save(user);

            return ResponseEntity.ok(Collections.singletonMap("message", "User updated successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", "User not found"));
        }
    }



}

