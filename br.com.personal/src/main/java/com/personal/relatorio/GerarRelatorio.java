package com.personal.relatorio;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;



import org.apache.commons.codec.binary.Base64;


import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
public class GerarRelatorio {


	private static byte[] pdf;

	public GerarRelatorio() {

	}

	public <T> void imprimirPdf(List<T> lista, String arquivo) throws JRException {

		String caminho = null;
		String caminhoPdf = null;
		
		
			caminho =  arquivo+".jrxml";
			
			 URL nome = getClass().getClassLoader().getResource(caminho);
			File file = new File(nome.getFile());
				
		JasperReport relatorio = JasperCompileManager.compileReport(file.getAbsolutePath());
		JasperPrint imprime = JasperFillManager.fillReport(relatorio, null, new JRBeanCollectionDataSource(lista));
		pdf= JasperExportManager.exportReportToPdf(imprime); // exportReportToPdfFile(imprime, filePDF.getAbsolutePath());

		
	}


	public static String getUrl() {

		return "data:application/pdf;base64," +  Base64.encodeBase64String(pdf);


	}

}
