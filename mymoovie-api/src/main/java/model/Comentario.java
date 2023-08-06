package model;

public class Comentario {

  private int id;
  private int codigoUsuario;
  private int codigoPostagem;
  private int quantidadeCurtidas;
  private String descricao;
  

  public Comentario() {
    this.id = -1;
    this.codigoUsuario = -1;
    this.codigoPostagem = -1;
    this.quantidadeCurtidas = 0;
    this.descricao = "";
  }

  public Comentario(int id, int codigoUsuario, int codigoPostagem, int quantidadeCurtidas, String descricao) {
    this.id = id;
    this.codigoUsuario = codigoUsuario;
    this.codigoPostagem = codigoPostagem;
    this.quantidadeCurtidas = quantidadeCurtidas;
    this.descricao = descricao;
  }

  public int getCodigo() {
    return id;
  }

  public void setCodigo(int id) {
    this.id = id;
  }

  public int getCodigoUsuario() {
    return codigoUsuario;
  }

  public void setCodigoUsuario(int codigoUsuario) {
    this.codigoUsuario = codigoUsuario;
  }

  public int getCodigoPostagem() {
    return codigoPostagem;
  }

  public void setCodigoPostagem(int codigoPostagem) {
    this.codigoPostagem = codigoPostagem;
  }

  public int getQuantidadeCurtidas() {
    return quantidadeCurtidas;
  }

  public void setQuantidadeCurtidas(int quantidadeCurtidas) {
    this.quantidadeCurtidas = quantidadeCurtidas;
  }

  public String getDescricao() {
    return descricao;
  }

  public void setDescricao(String descricao) {
    this.descricao = descricao;
  }
}
