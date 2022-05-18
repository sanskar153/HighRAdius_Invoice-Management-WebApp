package com.highradius.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.highradius.crud.Crud;

import com.google.gson.*;
import com.highradius.pojo.InvoiceDetails;


@WebServlet("/Predict")
public class Predict extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	Crud fetchdata;

	public Predict() {
		// TODO Auto-generated constructor stub
		super();
		fetchdata = new Crud();
		
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse rs) throws ServletException, IOException {
		rs.setHeader("Access-Control-Allow-Origin", "*");

		BufferedReader reader = request.getReader();
		String invoiceData = reader.readLine();
		//System.out.println(invoiceData);
		invoiceData = invoiceData.substring(1,  invoiceData.length() - 1);
		String final_values[] = invoiceData.split(",");
		
		for(int i = 0; i < final_values.length; ++i) {
				final_values[i] = final_values[i].split(":")[1];
				if(final_values[i].charAt(0) == '\"') {
					final_values[i] = final_values[i].substring(1, final_values[i].length() - 1);
			}
		}
		
		int sl_no[] = new int[final_values.length/2]; 
		String ag[] = new String[final_values.length/2];
		int j = 0;
		for(int i = 0; i < final_values.length; i=i+2) {
			sl_no[j] = Integer.parseInt(final_values[i]);
			ag[j] = final_values[i+1];
			//System.out.println(final_values[i]+" "+final_values[i+1]);
			j++;
		}
		

		HashMap<String, String> km = fetchdata.updateBucket(sl_no, ag);
		rs.setStatus(Integer.parseInt(km.get("code")));
		rs.getWriter().append(km.get("message"));
	}
	
}