package model;

public class Postagem {

  private int id;
  private int nota;
  private String comentario;
  private boolean destaque;
  private boolean impulsionar;
  private String codigoFilme;
  private int codigoUsuario;
  private int quantidadeCurtidas;

  public Postagem() {
  	id = -1;
    nota = 0;
    comentario = "";
    destaque = false;
    impulsionar = false;
    codigoFilme = "";
    codigoUsuario = 0;
    quantidadeCurtidas = 0;
  }

  public Postagem(int id, int nota, String comentario, boolean destaque, boolean impulsionar, String codigoFilme, int codigoUsuario, int quantidadeCurtidas) {
  	this.id = id;
    this.nota = nota;
    this.comentario = comentario;
    this.destaque = destaque;
    this.impulsionar = impulsionar;
    this.codigoFilme = codigoFilme;
    this.codigoUsuario = codigoUsuario;
    this.quantidadeCurtidas = quantidadeCurtidas;
  }

  public int getCodigo() {
    return id;
  }
  
  public void setCodigo(int id) {
    this.id = id;
  }

  public int getNota() {
    return nota;
  }
  
  public void setNota(int nota) {
    this.nota = nota;
  }
  
  public String getComentario() {
    return comentario;
  }
  
  public void setComentario(String comentario) {
    this.comentario = comentario;
  }
  
  public boolean getIsDestaque() {
    return destaque;
  }
  
  public void setDestaque(boolean destaque) {
    this.destaque = destaque;
  }
  
  public boolean getIsImpulsionar() {
    return impulsionar;
  }
  
  public void setImpulsionar(boolean impulsionar) {
    this.impulsionar = impulsionar;
  }
  
  public String getCodigoFilme() {
    return codigoFilme;
  }
  
  public void setCodigoFilme(String codigoFilme) {
    this.codigoFilme = codigoFilme;
  }
  
  public int getCodigoUsuario() {
    return codigoUsuario;
  }
  
  public void setCodigoUsuario(int codigoUsuario) {
    this.codigoUsuario = codigoUsuario;
  }

  public int getQuantidadeCurtidas() {
    return quantidadeCurtidas;
  }
  
  public void setQuantidadeCurtidas(int quantidadeCurtidas) {
    this.quantidadeCurtidas = quantidadeCurtidas;
  }

  @Override
  public String toString() {
    return (
      "Postagem [id=" +
      id +
      ", nota=" +
      nota +
      ", comentario=" +
      comentario +
      ", destaque=" +
      destaque +
      ", impulsionar=" +
      impulsionar +
      ", codigoFilme=" +
      codigoFilme +
      ", codigoUsuario=" +
      codigoUsuario +
      ", quantidadeCurtidas=" +
      quantidadeCurtidas +
      "]"
    );
  }
}
