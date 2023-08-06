package service;

import java.util.List;

import com.google.gson.Gson;
import dao.PostagemDAO;
import spark.Request;
import spark.Response;
import model.Postagem;
import model.Resp;

public class PostagemService {

  private PostagemDAO postagemDAO = new PostagemDAO();

  public PostagemService() {}

  public String postar(Request request, Response response) {
    Gson gson = new Gson();
    Postagem postagem = gson.fromJson(request.body(), Postagem.class);
    
    if(postagemDAO.insert(postagem) == true) {
      return gson.toJson(new Resp(true, "Postagem registrada com sucesso!"));
    } else {
      return gson.toJson(new Resp(false, "Erro no registro da postagem"));
    }
  }

  public String listarPostagem(Request request, Response response) {
    Gson gson = new Gson();
    response.type("application/json");
    String filter = request.queryParams("filterBy");
    String key = request.queryParams("key");
    
    try {
    	List<Postagem> postagemLista = postagemDAO.get(filter,key);
    	return gson.toJson(postagemLista);
    } catch (Exception e) {
    	return gson.toJson(e);
    }
  }

  public String listarPostagemFeed(Request request, Response response) {
    Gson gson = new Gson();
    response.type("application/json");
    int userId = Integer.parseInt(request.params(":id"));
    
    try {
    	List<Postagem> postagemLista = postagemDAO.getFeed(userId);
    	return gson.toJson(postagemLista);
    } catch (Exception e) {
    	return gson.toJson(e);
    }
  }

  public String curtir(Request request, Response response) {
    Gson gson = new Gson();
    int codigo = Integer.parseInt(request.queryParams("codigo"));
    
    if(postagemDAO.curtir(codigo) == true) {
      return gson.toJson(new Resp(true, "Postagem curtida com sucesso!"));
    } else {
      return gson.toJson(new Resp(false, "Erro na curtida da postagem"));
    }
  }
}
