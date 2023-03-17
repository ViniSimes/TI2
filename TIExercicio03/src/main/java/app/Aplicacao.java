package app;

import java.util.List;
import java.util.Scanner;

import dao.DAO;
import dao.VentiladorDAO;
import model.Ventilador;

public class Aplicacao {
    static int numero;
	
	public static void main(String[] args) throws Exception {
		
        Scanner entrada = new Scanner(System.in);
        VentiladorDAO ventiladorDAO = new VentiladorDAO();
        
        while (true){
            menu();
            
			switch (numero) {
                case 1:
                    System.out.println("\n\n==== Inserir ventilador === ");
                    Ventilador ventilador = new Ventilador(11, "azul", "grande","teto");
                    if(ventiladorDAO.insert(ventilador) == true) {
                        System.out.println("Inserção com sucesso -> " + ventilador.toString());
                    } 
                break;

                case 2:
                    System.out.println("\n\n==== Atualizar tamanho (código (" + ventilador.getCodigo() + ") === ");
                    ventilador.setTamanho(DAO.toMD5("grande"));
                    ventiladorDAO.update(ventilador);
                break;

                case 3:
                    System.out.println("\n\n==== Excluir ventilador (código " + ventilador.getCodigo() + ") === ");
                    ventiladorDAO.delete(ventilador.getCodigo());
                break;

                case 4:
                    System.out.println("\n\n==== Mostrar ventiladores ordenados por código === ");
                    List<Ventilador> ventiladors = ventiladorDAO.getLocalMesa();
                    ventiladors = ventiladorDAO.getOrderByCodigo();
                    for (Ventilador u: ventiladors) {
                        System.out.println(u.toString());
                    }

                    System.out.println("\n\n==== Mostrar ventiladores ordenados por cor === ");
                    ventiladors = ventiladorDAO.getOrderByCor();
                    for (Ventilador u: ventiladors) {
                        System.out.println(u.toString());
                    }
                break;

                case 5:
                    System.exit(0);
                break;

                default:
                System.out.println("O número escolhido é inválido! Digite um número entre 1 a 5.");
            }
        }		
	}

    private static void menu() {
	    Scanner scanner = new Scanner (System.in);
            System.out.println("1. INSERIR\n");
            System.out.println("2. ATUALIZAR\n");
            System.out.println("3. EXCLUIR\n");
            System.out.println("4. LISTAR \n");
            System.out.println("5. FIM\n");
            numero = scanner.nextInt();
		scanner.nextLine();
	}
}