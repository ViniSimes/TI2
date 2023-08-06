package service;

import com.google.gson.Gson;
import java.util.List;
import dao.UsuarioDAO;
import model.Usuario;
import spark.Request;
import spark.Response;
import model.Resp;

public class UsuarioService {

  private static AuthFunction authFunc = new AuthFunction();

  private UsuarioDAO usuarioDAO = new UsuarioDAO();

  public UsuarioService() {}

  public String registro(Request request, Response response) {
    Gson gson = new Gson();
    String nomeUsuario = request.queryParams("nomeUsuario");
    String email = request.queryParams("email");
    String senha = request.queryParams("senha");

    Usuario usuario = new Usuario(-1, nomeUsuario, email, authFunc.encriptarSenha(senha), false);
    
    try {
    	usuarioDAO.insert(usuario);
      response.status(201);
      String sucesso = "Usuario Cadastrado";
      return gson.toJson(new Resp(true, sucesso));
    } catch(Exception e) {
      response.status(200);
      return gson.toJson(new Resp(false, e.getMessage()));
    }
  }

  public String autenticar(Request request, Response response) {
    Gson gson = new Gson();
    response.type("application/json");
    String email = request.queryParams("email");
    String senha = request.queryParams("senha");
    
    try {
    	if (usuarioDAO.autenticar(email, senha) == true) {
        response.status(201);
        Usuario usuario = usuarioDAO.getByEmail(email);
        return gson.toJson(new Resp(true, authFunc.gerarJWT(usuario)));
    	} else {
        response.status(200);
        return gson.toJson(new Resp(false, "Login Incorreto"));
    	}
    } catch(Exception e) {
      response.status(200);
      return gson.toJson(new Resp(false, e.getMessage()));
    }
  }

  public String listarUsuario(Request request, Response response) {
    Gson gson = new Gson();
    response.type("application/json");
    
    try {
    	List<Usuario> usuarioLista = usuarioDAO.getOrderByNomeUsuario();
    	return gson.toJson(usuarioLista);
    } catch (Exception e) {
    	return gson.toJson(e);
    }
  }

  public String getUsuario(Request request, Response response) {
    Gson gson = new Gson();
    response.type("application/json");
    int userId = Integer.parseInt(request.params(":id"));
    
    try {
    	Usuario usuario = usuarioDAO.get(userId);
    	return gson.toJson(usuario);
    } catch (Exception e) {
    	return gson.toJson(e);
    }
  }

  public String tornarPremium(Request request, Response response) {
    Gson gson = new Gson();
    int userId = Integer.parseInt(request.params(":id"));
    
    try {
    	usuarioDAO.update(userId);
      response.status(201);
      String sucesso = "Usuario Atualizado para Premium";
      return gson.toJson(new Resp(true, sucesso));
    } catch(Exception e) {
      response.status(200);
      return gson.toJson(new Resp(false, e.getMessage()));
    }
  }
}
