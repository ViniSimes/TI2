package model;

public class Seguidor {

  private int id;
  private int usuarioQueSegue;
  private int usuarioSeguido;

  public Seguidor() {
    this.id = -1;
    this.usuarioQueSegue = -1;
    this.usuarioSeguido = -1;
  }

  public Seguidor(
    int id,
    int usuarioQueSegue,
    int usuarioSeguido
  ) {
    this.id = id;
    this.usuarioQueSegue = usuarioQueSegue;
    this.usuarioSeguido = usuarioSeguido;
  }

  public int getCodigo() {
    return id;
  }

  public int getUsuarioQueSegue() {
    return usuarioQueSegue;
  }
 
  public int getUsuarioSeguido() {
    return usuarioSeguido;
  }
 
  public void setCodigo(int id) {
    this.id = id;
  }
 
  public void setUsuarioQueSegue(int usuarioQueSegue) {
    this.usuarioQueSegue = usuarioQueSegue;
  } 
 
  public void setUsuarioSeguido(int usuarioSeguido) {
    this.usuarioSeguido = usuarioSeguido;
  }

  @Override
  public String toString() {
    return (
      "Seguidor [id=" +
      id +
      ", usuario_que_segue=" +
      usuarioQueSegue +
      ", usuario_seguido=" +
      usuarioSeguido +
      "]"
    );
  }
}
