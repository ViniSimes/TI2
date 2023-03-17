package model;

public class Ventilador {
	private int codigo;
	private String cor;      
	private String tamanho;  
	private String local;   
	
	public Ventilador() {
		this.codigo = -1;
		this.cor = "";
		this.tamanho = "";
		this.local = "";
	}
	
	public Ventilador(int codigo, String cor, String tamanho, String local) {
		this.codigo = codigo;
		this.cor = cor;
		this.tamanho = tamanho;
		this.local = local;
	}

	public int getCodigo() {
		return codigo;
	}

	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}

	public String getCor() {
		return cor;
	}

	public void setCor(String cor) {
		this.cor = cor;
	}

	public String getTamanho() {
		return tamanho;
	}

	public void setTamanho(String tamanho) {
		this.tamanho = tamanho;
	}

	public String getLocal() {
		return local;
	}

	public void setLocal(String local) {
		this.local = local;
	}

	@Override
	public String toString() {
		return "Ventilador [codigo=" + codigo + ", cor=" + cor + ", tamanho=" + tamanho + ", local=" + local + "]";
	}	
}
