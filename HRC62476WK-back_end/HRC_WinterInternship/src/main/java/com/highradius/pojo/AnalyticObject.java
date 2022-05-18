package com.highradius.pojo;

public class AnalyticObject {
	String identifier;
	int count;
	double sum;

	public AnalyticObject(String identifier,int count,	double sum) {
		this.identifier = identifier;
		this.count = count;
		this.sum = sum;
		// TODO Auto-generated constructor stub
	}

	public String getIdentifier() {
		return identifier;
	}


	public void setIdentifier(String identifier) {
		this.identifier = identifier;
	}


	public int getCount() {
		return count;
	}


	public void setCount(int count) {
		this.count = count;
	}

	public double getSum() {
		return sum;
	}

	public void setSum(double sum) {
		this.sum = sum;
	}

}