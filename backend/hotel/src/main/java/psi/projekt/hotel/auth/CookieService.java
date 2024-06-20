package psi.projekt.hotel.auth;

import org.springframework.stereotype.Service;
import jakarta.servlet.http.Cookie;

@Service
public class CookieService {
    public Cookie generateCookie(String name,String value,int exp){
        Cookie cookie = new Cookie(name,value);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(exp);
        return cookie;
    }

    public Cookie removeCookie(Cookie[] cookies, String name){
        for (Cookie cookie:cookies){
            if (cookie.getName().equals(name)){
                cookie.setPath("/");
                cookie.setMaxAge(0);
                cookie.setHttpOnly(true);
                return cookie;
            }
        }
        return null;
    }
}