package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import model.Postagem;

public class PostagemDAO extends DAO {

  public PostagemDAO() {
    super();
    conectar();
  }

  public void finalize() {
    close();
  }

  public boolean insert(Postagem postagem) {
    boolean status = false;
    try {
      Statement st = conexao.createStatement();
      String sql =
        "INSERT INTO postagem (nota, comentario, codigo_filme, quantidade_curtidas, destaque, isimpulsionado, codigo_usuario) " +
        "VALUES ('" +
        postagem.getNota() +
        "', '" +
        postagem.getComentario() +
        "', '" +
        postagem.getCodigoFilme() +
        "', '" +
        postagem.getQuantidadeCurtidas() +
        "', '" +
        postagem.getIsDestaque() +
        "', '" +
        postagem.getIsImpulsionar() +
        "', '" +
        postagem.getCodigoUsuario() +
        "');";
      // System.out.println(sql);
      st.executeUpdate(sql);
      st.close();
      status = true;
    } catch (SQLException u) {
      throw new RuntimeException(u);
    }
    
    return status;
  }
  
  public List<Postagem> get(String filter, String key) throws Exception {
    List<Postagem> postagens = new ArrayList<Postagem>();

    try {
      Statement st = conexao.createStatement(
        ResultSet.TYPE_SCROLL_INSENSITIVE,
        ResultSet.CONCUR_READ_ONLY
      );
      String sql = "SELECT * FROM postagem WHERE " + filter + "=" + "\'" + key + "\'";
      // System.out.println(sql);
      ResultSet rs = st.executeQuery(sql);
      while (rs.next()) {
        Postagem p = new Postagem(
          rs.getInt("id"),
          rs.getInt("nota"),
          rs.getString("comentario"),
          rs.getBoolean("destaque"),
          rs.getBoolean("isimpulsionado"),
          rs.getString("codigo_filme"),
          rs.getInt("codigo_usuario"),
          rs.getInt("quantidade_curtidas")
        );
        postagens.add(p);
      }
      st.close();
    } catch (Exception e) {
    	throw new Exception(e);
    }
    return postagens;
  }

  public List<Postagem> getFeed(int userId) throws Exception {
    List<Postagem> postagens = new ArrayList<Postagem>();

    try {
      Statement st = conexao.createStatement(
        ResultSet.TYPE_SCROLL_INSENSITIVE,
        ResultSet.CONCUR_READ_ONLY
      );
      String sql = "SELECT * FROM postagem WHERE codigo_usuario IN (SELECT usuario_seguido FROM seguidor WHERE usuario_que_segue = '" + userId + "\')";
      // System.out.println(sql);
      ResultSet rs = st.executeQuery(sql);
      while (rs.next()) {
        Postagem p = new Postagem(
          rs.getInt("id"),
          rs.getInt("nota"),
          rs.getString("comentario"),
          rs.getBoolean("destaque"),
          rs.getBoolean("isimpulsionado"),
          rs.getString("codigo_filme"),
          rs.getInt("codigo_usuario"),
          rs.getInt("quantidade_curtidas")
        );
        postagens.add(p);
      }
      st.close();
    } catch (Exception e) {
    	throw new Exception(e);
    }
    return postagens;
  }

  public boolean curtir(int codigo) {
    boolean status = false;
    try {
      Statement st = conexao.createStatement();
      String sql = "UPDATE postagem SET quantidade_curtidas = quantidade_curtidas + 1 WHERE id = " + codigo;
      // System.out.println(sql);
      st.executeUpdate(sql);
      st.close();
      status = true;
    } catch (SQLException u) {
      throw new RuntimeException(u);
    }
    return status;
  }

  public boolean delete(int codigo) {
    boolean status = false;
    try {
      Statement st = conexao.createStatement();
      String sql = "DELETE FROM postagem WHERE id = " + codigo;
      // System.out.println(sql);
      st.executeUpdate(sql);
      st.close();
      status = true;
    } catch (SQLException u) {
      throw new RuntimeException(u);
    }
    return status;
  }
}
