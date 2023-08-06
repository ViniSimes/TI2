package app;

import static spark.Spark.*;

import service.UsuarioService;
import service.SeguidorService;
import service.PostagemService;
import service.ComentarioService;

public class Aplicacao {

  private static UsuarioService usuarioService = new UsuarioService();
  private static SeguidorService seguidorService = new SeguidorService();
  private static PostagemService postagemService = new PostagemService();
  private static ComentarioService comentarioService = new ComentarioService();

  public static void main(String[] args) {
    port(6789);
    
    // Configuração de CORS para permitir conexão com o front-end hospedado em outra porta/servidor
    options("/*",
        (request, response) -> {

            String accessControlRequestHeaders = request
                    .headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers",
                        accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request
                    .headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods",
                        accessControlRequestMethod);
            }

            return "OK";
        });

    before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

    // Rotas de autorização
    post(
      "/registro",
      (request, response) -> usuarioService.registro(request, response)
    );
    post(
      "/login",
      (request, response) -> usuarioService.autenticar(request, response)
    );

    // Rotas de usuário
    get(
        "/usuario",
        (request, response) -> usuarioService.listarUsuario(request, response)
      );
    get(
        "/usuario/:id",
        (request, response) -> usuarioService.getUsuario(request, response)
      );
    post(
        "/usuario/tornarPremium/:id",
        (request, response) -> usuarioService.tornarPremium(request, response)
      );

    // Rotas de seguidor
    post(
        "/seguir",
        (request, response) -> seguidorService.seguir(request, response)
      );
    get(
        "/seguir/isSeguidor",
        (request, response) -> seguidorService.isSeguidor(request, response)
      );
    
    // Rotas de postagem
    post(
        "/postagem",
        (request, response) -> postagemService.postar(request, response)
      );
    get(
        "/postagem",
        (request, response) -> postagemService.listarPostagem(request, response)
      );
    get(
        "/postagem/feed/:id",
        (request, response) -> postagemService.listarPostagemFeed(request, response)
      );
    post(
        "/postagem/curtir",
        (request, response) -> postagemService.curtir(request, response)
      );
    
    // Rotas de comentario
    post(
        "/comentario",
        (request, response) -> comentarioService.comentar(request, response)
      );
    get(
        "/comentario/:id",
        (request, response) -> comentarioService.listarComentarioPorPostagem(request, response)
      );
    post(
        "/comentario/curtir",
        (request, response) -> comentarioService.curtir(request, response)
      );
  }
}
