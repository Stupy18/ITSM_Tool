package ubb.project.ubb.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ubb.project.ubb.config.JwtTokenService;
import ubb.project.ubb.dto.LoginRequestDto;
import ubb.project.ubb.dto.LoginResponseDto;
import ubb.project.ubb.dto.LoginResponseWithTokenDto;
import ubb.project.ubb.exception.NotExistsException;
import ubb.project.ubb.exception.NotMatchException;
import ubb.project.ubb.service.LoginService;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;
    private final JwtTokenService jwtTokenService;

    public LoginController(LoginService loginService, JwtTokenService jwtTokenService) {
        this.loginService = loginService;
        this.jwtTokenService = jwtTokenService;
    }

    @PostMapping
    public ResponseEntity<LoginResponseWithTokenDto> attemptLogin(@RequestBody LoginRequestDto requestDto)
            throws NotExistsException, NotMatchException {
        // Call service to authenticate and get user info
        LoginResponseDto responseDto = this.loginService.loginResponse(requestDto);

        // Generate JWT token
        String token = jwtTokenService.createJwtToken(responseDto);

        // Return response with token and user info
        LoginResponseWithTokenDto responseWithToken = new LoginResponseWithTokenDto(token, responseDto);
        return ResponseEntity.ok(responseWithToken);
    }

    @GetMapping("/healthcheck")
    public ResponseEntity<Void> healthcheck() {
        return ResponseEntity.ok().build();
    }
}
