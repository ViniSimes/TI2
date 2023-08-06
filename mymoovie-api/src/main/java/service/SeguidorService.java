package service;

import com.google.gson.Gson;
import dao.SeguidorDAO;
import spark.Request;
import spark.Response;
import model.Resp;

public class SeguidorService {

  private SeguidorDAO seguidorDAO = new SeguidorDAO();

  public SeguidorService() {}

  public String seguir(Request request, Response response) {
    Gson gson = new Gson();
    int usuarioQueSegue = Integer.parseInt(request.queryParams("usuarioQueSegue"));
    int usuarioSeguido = Integer.parseInt(request.queryParams("usuarioSeguido"));
    
    if (seguidorDAO.insert(usuarioQueSegue, usuarioSeguido) == true) {
      response.status(201);
      return gson.toJson(new Resp(true, "Usuário Seguido"));
    } else {
      response.status(200);
      return gson.toJson(new Resp(false, "Você já segue este usuário"));
    }
  }

  public String isSeguidor(Request request, Response response) {
    Gson gson = new Gson();
    int usuarioQueSegue = Integer.parseInt(request.queryParams("usuarioQueSegue"));
    int usuarioSeguido = Integer.parseInt(request.queryParams("usuarioSeguido"));
    
    if (seguidorDAO.isSeguidor(usuarioQueSegue, usuarioSeguido) == true) {
      response.status(201);
      return gson.toJson(new Resp(true, "Usuário seguido"));
    } else {
      response.status(200);
      return gson.toJson(new Resp(false, "Usuário não segue"));
    }
  }
}
