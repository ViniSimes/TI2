package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import model.Seguidor;

public class SeguidorDAO extends DAO {

  public SeguidorDAO() {
    super();
    conectar();
  }

  public void finalize() {
    close();
  }

  public boolean insert(int usuarioQueSegue, int usuarioSeguido) {
    boolean status = false;
    if (!isSeguidor(usuarioQueSegue, usuarioSeguido)) {
	    try {
	      Statement st = conexao.createStatement();
	      String sql =
	        "INSERT INTO seguidor (usuario_que_segue, usuario_seguido) " +
	        "VALUES ('" +
	        usuarioQueSegue +
	        "', '" +
	        usuarioSeguido +
	        "');";
	      // System.out.println(sql);
	      st.executeUpdate(sql);
	      st.close();
	      status = true;
	    } catch (SQLException u) {
	      throw new RuntimeException(u);
	    }
    }
    
    return status;
  }

  public boolean isSeguidor(int usuarioQueSegue, int usuarioSeguido) {
  	boolean resp = false;
    try {
      Statement st = conexao.createStatement(
        ResultSet.TYPE_SCROLL_INSENSITIVE,
        ResultSet.CONCUR_READ_ONLY
      );
      String sql = "SELECT id, usuario_que_segue, usuario_seguido FROM seguidor WHERE usuario_que_segue='" + usuarioQueSegue + "\'" + "AND usuario_seguido='" + usuarioSeguido + "\'";
      ResultSet rs = st.executeQuery(sql);
      if (rs.next()) {
        Seguidor seguidor =
          new Seguidor(
            rs.getInt("id"),
            rs.getInt("usuario_que_segue"),
            rs.getInt("usuario_seguido")
          );
        if (seguidor.getCodigo() > -1) {
        	resp = true;
        }
      }
      st.close();
    } catch (Exception e) {
      System.err.println(e.getMessage());
    }
    return resp;
  }

  public boolean delete(int codigo) {
    boolean status = false;
    try {
      Statement st = conexao.createStatement();
      String sql = "DELETE FROM seguidor WHERE id = " + codigo;
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
