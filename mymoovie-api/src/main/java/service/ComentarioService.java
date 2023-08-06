package service;

import java.util.List;

import com.google.gson.Gson;
import dao.ComentarioDAO;
import spark.Request;
import spark.Response;
import model.Comentario;
import model.Resp;

public class ComentarioService {

  private ComentarioDAO comentarioDAO = new ComentarioDAO();

  public ComentarioService() {}

  public String comentar(Request request, Response response) {
    Gson gson = new Gson();
    Comentario comentario = gson.fromJson(request.body(), Comentario.class);
    
    if(comentarioDAO.insert(comentario) == true) {
      return gson.toJson(new Resp(true, "Comentario registrado com sucesso!"));
    } else {
      return gson.toJson(new Resp(false, "Erro no registro do comentario"));
    }
  }

  public String listarComentarioPorPostagem(Request request, Response response) {
    Gson gson = new Gson();
    response.type("application/json");
    int postagemId = Integer.parseInt(request.params(":id"));
    
    try {
    	List<Comentario> comentarioLista = comentarioDAO.getComentario(postagemId);
    	return gson.toJson(comentarioLista);
    } catch (Exception e) {
    	return gson.toJson(e);
    }
  }

  public String curtir(Request request, Response response) {
    Gson gson = new Gson();
    int codigo = Integer.parseInt(request.queryParams("codigo"));
    
    if(comentarioDAO.curtir(codigo) == true) {
      return gson.toJson(new Resp(true, "Comentario curtido com sucesso!"));
    } else {
      return gson.toJson(new Resp(false, "Erro na curtida do comentario"));
    }
  }
}
