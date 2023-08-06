package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import model.Comentario;

public class ComentarioDAO extends DAO {

  public ComentarioDAO() {
    super();
    conectar();
  }

  public void finalize() {
    close();
  }

  public boolean insert(Comentario comentario) {
    boolean status = false;
    try {
      Statement st = conexao.createStatement();
      String sql =
        "INSERT INTO comentario (descricao, codigo_usuario, codigo_postagem, quantidade_curtidas) " +
        "VALUES ('" +
        comentario.getDescricao() +
        "', '" +
        comentario.getCodigoUsuario() +
        "', '" +
        comentario.getCodigoPostagem() +
        "', '" +
        comentario.getQuantidadeCurtidas() +
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

  public List<Comentario> getComentario(int postagemId) throws Exception {
    List<Comentario> comentarios = new ArrayList<Comentario>();

    try {
      Statement st = conexao.createStatement(
        ResultSet.TYPE_SCROLL_INSENSITIVE,
        ResultSet.CONCUR_READ_ONLY
      );
      String sql = "SELECT * FROM comentario WHERE codigo_postagem = '" + postagemId + "\'";
      // System.out.println(sql);
      ResultSet rs = st.executeQuery(sql);
      while (rs.next()) {
      	Comentario c = new Comentario(
          rs.getInt("id"),
          rs.getInt("codigo_usuario"),
          rs.getInt("codigo_postagem"),
          rs.getInt("quantidade_curtidas"),
          rs.getString("descricao")
        );
        comentarios.add(c);
      }
      st.close();
    } catch (Exception e) {
    	throw new Exception(e);
    }
    return comentarios;
  }

  public boolean curtir(int codigo) {
    boolean status = false;
    try {
      Statement st = conexao.createStatement();
      String sql = "UPDATE comentario SET quantidade_curtidas = quantidade_curtidas + 1 WHERE id = " + codigo;
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
      String sql = "DELETE FROM comentario WHERE id = " + codigo;
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
