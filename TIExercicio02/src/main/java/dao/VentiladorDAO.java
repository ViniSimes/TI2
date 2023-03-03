package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import model.Ventilador;

public class VentiladorDAO extends DAO {
	
	public VentiladorDAO() {
		super();
		conectar();
	}

	public void finalize() {
		close();
	}
	
	
	public boolean insert(Ventilador ventilador) {
		boolean status = false;
		try {  
			Statement st = conexao.createStatement();
			String sql = "INSERT INTO ventilador (codigo, cor, tamanho, local) "
				       + "VALUES ("+ventilador.getCodigo()+ ", '" + ventilador.getCor() + "', '"  
				       + ventilador.getTamanho() + "', '" + ventilador.getLocal() + "');";
			System.out.println(sql);
			st.executeUpdate(sql);
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		return status;
	}

	
	public Ventilador get(int codigo) {
		Ventilador ventilador = null;
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			String sql = "SELECT * FROM produto WHERE id=" + codigo;
			System.out.println(sql);
			ResultSet rs = st.executeQuery(sql);	
	        if(rs.next()){            
	        	 ventilador = new Ventilador(rs.getInt("codigo"), rs.getString("cor"), rs.getString("tamanho"), rs.getString("local"));
	        }
	        st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return ventilador;
	}
	
	
	public List<Ventilador> get() {
		return get("");
	}

	
	public List<Ventilador> getOrderByCodigo() {
		return get("codigo");		
	}
	
	
	public List<Ventilador> getOrderByCor() {
		return get("cor");		
	}
	
	
	public List<Ventilador> getOrderByLocal() {
		return get("local");		
	}
	
	
	private List<Ventilador> get(String orderBy) {	
	
		List<Ventilador> ventiladors = new ArrayList<Ventilador>();
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			String sql = "SELECT * FROM ventilador" + ((orderBy.trim().length() == 0) ? "" : (" ORDER BY " + orderBy));
			System.out.println(sql);
			ResultSet rs = st.executeQuery(sql);	           
	        while(rs.next()) {	            	
	        	Ventilador u = new Ventilador(rs.getInt("codigo"), rs.getString("cor"), rs.getString("tamanho"), rs.getString("local"));
	            ventiladors.add(u);
	        }
	        st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return ventiladors;
	}


	public List<Ventilador> getLocalMesa() {
		List<Ventilador> ventiladors = new ArrayList<Ventilador>();
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			String sql = "SELECT * FROM ventilador WHERE ventilador.local LIKE 'mesa'";
			System.out.println(sql);
			ResultSet rs = st.executeQuery(sql);	           
	        while(rs.next()) {	            	
	        	Ventilador u = new Ventilador(rs.getInt("codigo"), rs.getString("cor"), rs.getString("tamanho"), rs.getString("local"));
	            ventiladors.add(u);
	        }
	        st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return ventiladors;
	}
	
	
	public boolean update(Ventilador ventilador) {
		boolean status = false;
		try {  
			Statement st = conexao.createStatement();
			String sql = "UPDATE ventilador SET cor = '" + ventilador.getCor() + "', tamanho = '"  
				       + ventilador.getTamanho() + "', local = '" + ventilador.getLocal() + "'"
					   + " WHERE codigo = " + ventilador.getCodigo();
			System.out.println(sql);
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
			String sql = "DELETE FROM ventilador WHERE codigo = " + codigo;
			System.out.println(sql);
			st.executeUpdate(sql);
			st.close();
			status = true;
		} catch (SQLException u) {  
			throw new RuntimeException(u);
		}
		return status;
	}
	
	
	public boolean autenticar(String cor, String tamanho) {
		boolean resp = false;
		
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
			String sql = "SELECT * FROM ventilador WHERE cor LIKE '" + cor + "' AND tamanho LIKE '" + tamanho  + "'";
			System.out.println(sql);
			ResultSet rs = st.executeQuery(sql);
			resp = rs.next();
	        st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return resp;
	}	
}