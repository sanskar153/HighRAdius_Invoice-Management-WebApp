package com.highradius.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
//import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.highradius.crud.Crud;
import com.google.gson.Gson;
import com.highradius.pojo.InvoiceDetails;

/**
 * Servlet implementation class Fetch
 */
@WebServlet("/EditInvoice")

public class EditInvoice extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EditInvoice() {
        super();
        // TODO Auto-generated constructor stub
    }

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String invoiceData = null;
		
		try {
			BufferedReader reader = request.getReader();
			invoiceData = reader.readLine();
			//System.out.println(invoiceData);
			
		invoiceData = invoiceData.substring(1,  invoiceData.length() - 1);
		String final_values[] = invoiceData.split(",");
		
		for(int i = 0; i < final_values.length; ++i) {
				final_values[i] = final_values[i].split(":")[1];
				if(final_values[i].charAt(0) == '\"') {
					final_values[i] = final_values[i].substring(1, final_values[i].length() - 1);
			    }
			//System.out.println(final_values[i]);
		}
		
		String invoiceCurrency = final_values[0];
		String custPaymentTerms = final_values[1];
		String slNo = final_values[2];
			
			Connection conn = Crud.getConnection();
		
			String sql_statement = "UPDATE winter_internship SET invoice_currency= ?, cust_payment_terms = ? WHERE sl_no = ?";
			
			PreparedStatement st = conn.prepareStatement(sql_statement);
			st.setString(1, invoiceCurrency);
			st.setString(2, custPaymentTerms);
			st.setString(3, slNo);
			
		
		System.out.println(st);
			
			st.executeUpdate();
			conn.close();
	}
		catch(Exception e) {
			e.printStackTrace();
		}
	//	doGet(request, response);
	}
	
	
}

