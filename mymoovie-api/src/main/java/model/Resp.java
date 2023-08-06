package model;

public class Resp {
	private boolean status = false;
  private String mensagem = "";
  public Resp(){}
  
  public Resp(boolean status, String mensagem) {
  	this.status = status;
  	this.mensagem = mensagem;
  }
}
