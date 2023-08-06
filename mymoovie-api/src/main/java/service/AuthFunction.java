package service;
import model.Usuario;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import io.jsonwebtoken.Jwts;
import java.security.Key;
import javax.crypto.spec.SecretKeySpec;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Base64;

public class AuthFunction {
	public AuthFunction() {}

	public String gerarJWT(Usuario usuario) {
		String secret = "Y2hhcnRzdGlmZnBpZ2NvbnN0cnVjdGlvbmV4ZXJjaXNlbm90Zm9ncmVtYXJrYWJsZWI=";

		Key hmacKey = new SecretKeySpec(Base64.getDecoder().decode(secret), 
		                            SignatureAlgorithm.HS256.getJcaName());
		
		return Jwts.builder()
      .claim("nomeUsuario", usuario.getNomeUsuario())
      .claim("email", usuario.getEmail())
      .claim("isPremium", usuario.getIsPremium())
      .claim("id", usuario.getCodigo())
      .signWith(hmacKey)
      .compact();
	}
	
	public String encriptarSenha(String senha) {
    String passwordToHash = senha;
    String generatedPassword = null;

    try 
    {
      MessageDigest md = MessageDigest.getInstance("MD5");
      md.update(passwordToHash.getBytes());
      byte[] bytes = md.digest();
      StringBuilder sb = new StringBuilder();
      for (int i = 0; i < bytes.length; i++) {
        sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
      }
      generatedPassword = sb.toString();
    } catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
    }
    return generatedPassword;
	}
}
