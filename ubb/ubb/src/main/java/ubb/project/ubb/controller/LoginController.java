package ubb.project.ubb.controller;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ubb.project.ubb.dto.JwtInfoDto;
import ubb.project.ubb.dto.LoginRequestDto;
import ubb.project.ubb.dto.LoginResponseDto;
import ubb.project.ubb.exception.NotExistsException;
import ubb.project.ubb.exception.NotMatchException;
import ubb.project.ubb.service.JwtTokenService;
import ubb.project.ubb.service.LoginService;

@RestController
@RequestMapping("/login")
public class LoginController {
    private LoginService service;
    private final JwtTokenService jwtTokenService;

    public LoginController(LoginService service, JwtTokenService jwtTokenService) {
        this.service = service;
        this.jwtTokenService = jwtTokenService;
    }

    @PostMapping()
    public JwtInfoDto attemptLogin(@RequestBody LoginRequestDto requestDto) throws NotExistsException, NotMatchException {
        LoginResponseDto responseDto = this.service.loginResponse(requestDto);
        return new JwtInfoDto(jwtTokenService.createJwtToken(responseDto));
    }

    @PostMapping("/guest/{id}")
    public ResponseEntity<JwtInfoDto> loginGuestUser(@PathVariable Long id)
    {
        try{
            LoginResponseDto responseDto = service.loginResponseGuest(id);
            return ResponseEntity.ok().body(new JwtInfoDto(jwtTokenService.createJwtToken(responseDto)));
        }
        catch(IllegalArgumentException e)
        {
            return ResponseEntity.status(401).body(null);
        }
    }

    @GetMapping("/healthcheck")
    public ResponseEntity<?> healthcheck() {
        return ResponseEntity.ok().build();
    }
}