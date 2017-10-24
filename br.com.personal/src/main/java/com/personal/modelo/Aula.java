package com.personal.modelo;

public class Aula {

	
	private Integer idAula;
    private Integer nomeAluno;
	private String dataAula;
	private String diaSemana;
	private String tipo;
	private String horario;
	private String presenca;
    private String falta;
    private String faltajusticada;
    private String obsjustificada;
    private String observação;
    private String resultado;
	
	
	
	public String getHorario() {
		return horario;
	}
	public void setHorario(String horario) {
		this.horario = horario;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public Integer getIdAula() {
		return idAula;
	}
	public void setIdAula(Integer idAula) {
		this.idAula = idAula;
	}
	public String getDataAula() {
		return dataAula;
	}
	public void setDataAula(String dataAula) {
		this.dataAula = dataAula;
	}
	public String getDiaSemana() {
		return diaSemana;
	}
	public void setDiaSemana(String diaSemana) {
		this.diaSemana = diaSemana;
	}
	
	public Integer getNomeAluno() {
		return nomeAluno;
	}
	public void setNomeAluno(Integer nomeAluno) {
		this.nomeAluno = nomeAluno;
	}
	public String getPresenca() {
		return presenca;
	}
	public void setPresenca(String presenca) {
		this.presenca = presenca;
	}
	public String getFalta() {
		return falta;
	}
	public void setFalta(String falta) {
		this.falta = falta;
	}
	public String getFaltajusticada() {
		return faltajusticada;
	}
	public void setFaltajusticada(String faltajusticada) {
		this.faltajusticada = faltajusticada;
	}
	public String getObsjustificada() {
		return obsjustificada;
	}
	public void setObsjustificada(String obsjustificada) {
		this.obsjustificada = obsjustificada;
	}
	public String getObservação() {
		return observação;
	}
	public void setObservação(String observação) {
		this.observação = observação;
	}
	public String getResultado() {
		return resultado;
	}
	public void setResultado(String resultado) {
		this.resultado = resultado;
	}
	
	
	
	
}
