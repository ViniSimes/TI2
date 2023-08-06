package model;

public class Usuario {

  private int id;
  private String nomeUsuario;
  private String email;
  private String senha;
  private boolean isPremium;

  public Usuario() {
    this.id = -1;
    this.nomeUsuario = "";
    this.email = "";
    this.senha = "";
    this.isPremium = false;
  }

  public Usuario(
    int id,
    String nomeUsuario,
    String email,
    String senha,
    boolean isPremium
  ) {
    this.id = id;
    this.nomeUsuario = nomeUsuario;
    this.email = email;
    this.senha = senha;
    this.isPremium = isPremium;
  }

  public int getCodigo() {
    return id;
  }

  public void setCodigo(int id) {
    this.id = id;
  }

  public String getNomeUsuario() {
    return nomeUsuario;
  }

  public void setNomeUsuario(String nomeUsuario) {
    this.nomeUsuario = nomeUsuario;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getSenha() {
    return senha;
  }

  public void setSenha(String senha) {
    this.senha = senha;
  }

  public boolean getIsPremium() {
    return isPremium;
  }

  public void setIsPremium(boolean isPremium) {
    this.isPremium = isPremium;
  }

  @Override
  public String toString() {
    return (
      "Usuario [id=" +
      id +
      ", nome_usuario=" +
      nomeUsuario +
      ", email=" +
      email +
      ", senha=" +
      senha +
      ", is_premium=" +
      isPremium +
      "]"
    );
  }
}
