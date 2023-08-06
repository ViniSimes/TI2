package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import model.Usuario;
import service.AuthFunction;

public class UsuarioDAO extends DAO {
  private static AuthFunction authFunc = new AuthFunction();

  public UsuarioDAO() {
    super();
    conectar();
  }

  public void finalize() {
    close();
  }

  public boolean insert(Usuario usuario) throws Exception {
    boolean status = false;
    try {
      Statement st = conexao.createStatement();
      String sql =
        "INSERT INTO usuario (nome_usuario, email, senha, is_premium) " +
        "VALUES ('" +
        usuario.getNomeUsuario() +
        "', '" +
        usuario.getEmail() +
        "', '" +
        usuario.getSenha() +
        "', '" +
        usuario.getIsPremium() +
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

  public Usuario getByEmail(String email) {
    Usuario usuario = null;

    try {
      Statement st = conexao.createStatement(
        ResultSet.TYPE_SCROLL_INSENSITIVE,
        ResultSet.CONCUR_READ_ONLY
      );
      String sql = "SELECT id, nome_usuario, email, is_premium FROM usuario WHERE email='" + email + "\'";
      // System.out.println(sql);
      ResultSet rs = st.executeQuery(sql);
      if (rs.next()) {
        usuario =
          new Usuario(
            rs.getInt("id"),
            rs.getString("nome_usuario"),
            rs.getString("email"),
            "",
            rs.getBoolean("is_premium")
          );
      }
      st.close();
    } catch (Exception e) {
      System.err.println(e.getMessage());
    }
    return usuario;
  }

  public Usuario get(int id) {
    Usuario usuario = null;

    try {
      Statement st = conexao.createStatement(
        ResultSet.TYPE_SCROLL_INSENSITIVE,
        ResultSet.CONCUR_READ_ONLY
      );
      String sql = "SELECT * FROM usuario WHERE id=" + id;
      // System.out.println(sql);
      ResultSet rs = st.executeQuery(sql);
      if (rs.next()) {
        usuario =
          new Usuario(
            rs.getInt("id"),
            rs.getString("nome_usuario"),
            rs.getString("email"),
            rs.getString("senha"),
            rs.getBoolean("is_premium")
          );
      }
      st.close();
    } catch (Exception e) {
      System.err.println(e.getMessage());
    }
    return usuario;
  }

  public List<Usuario> get() throws Exception {
    return get("");
  }

  public List<Usuario> getOrderByCodigo() throws Exception {
    return get("id");
  }

  public List<Usuario> getOrderByEmail() throws Exception {
    return get("email");
  }

  public List<Usuario> getOrderByNomeUsuario() throws Exception {
    return get("nome_usuario");
  }

  private List<Usuario> get(String orderBy) throws Exception {
    List<Usuario> usuarios = new ArrayList<Usuario>();

    try {
      Statement st = conexao.createStatement(
        ResultSet.TYPE_SCROLL_INSENSITIVE,
        ResultSet.CONCUR_READ_ONLY
      );
      String sql =
        "SELECT * FROM usuario" +
        ((orderBy.trim().length() == 0) ? "" : (" ORDER BY " + orderBy));
      // System.out.println(sql);
      ResultSet rs = st.executeQuery(sql);
      while (rs.next()) {
        Usuario u = new Usuario(
          rs.getInt("id"),
          rs.getString("nome_usuario"),
          rs.getString("email"),
          rs.getString("senha"),
          rs.getBoolean("is_premium")
        );
        usuarios.add(u);
      }
      st.close();
    } catch (Exception e) {
    	throw new Exception(e);
    }
    return usuarios;
  }

  public boolean update(Usuario usuario) {
    boolean status = false;
    try {
      Statement st = conexao.createStatement();
      String sql =
        "UPDATE usuario SET email = '" +
        usuario.getEmail() +
        "', nome_usuario = '" +
        usuario.getNomeUsuario() +
        "', senha = '" +
        usuario.getSenha() +
        "', is_premium = '" +
        usuario.getIsPremium() +
        "'" +
        " WHERE id = " +
        usuario.getCodigo();
      // System.out.println(sql);
      st.executeUpdate(sql);
      st.close();
      status = true;
    } catch (SQLException u) {
      throw new RuntimeException(u);
    }
    return status;
  }

  public boolean update(int id) {
  	Usuario usuario = get(id);
  	usuario.setIsPremium(true);
  	return update(usuario);
  }

  public boolean delete(int codigo) {
    boolean status = false;
    try {
      Statement st = conexao.createStatement();
      String sql = "DELETE FROM usuario WHERE id = " + codigo;
      // System.out.println(sql);
      st.executeUpdate(sql);
      st.close();
      status = true;
    } catch (SQLException u) {
      throw new RuntimeException(u);
    }
    return status;
  }

  // TO-DO prevent SQL injection
  public boolean autenticar(String email, String senha) throws Exception {
    boolean resp = false;

    try {
      Statement st = conexao.createStatement(
        ResultSet.TYPE_SCROLL_INSENSITIVE,
        ResultSet.CONCUR_READ_ONLY
      );
      String sql =
        "SELECT * FROM usuario WHERE email LIKE '" +
        email +
        "' AND senha LIKE '" +
        authFunc.encriptarSenha(senha) +
        "'";
      // System.out.println(sql);
      ResultSet rs = st.executeQuery(sql);
      resp = rs.next();
      st.close();
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
    return resp;
  }
}
