package demo.usercart.model;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/user")
public class StoreController {
	
	@GetMapping("/checkLogin")
    public ResponseEntity<Boolean> checkLogin(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        // 檢查是否有 JWT token
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            // 驗證 token 是否有效（略）
            boolean valid = JwtUtility.validateToken(token);
            return ResponseEntity.ok(valid);
        }
        return ResponseEntity.ok(false);
    }
}