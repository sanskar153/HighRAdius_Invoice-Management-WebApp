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
@WebServlet("/AddInvoice")

public class AddInvoice extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddInvoice() {
        super();
        
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    final static int NO_OF_ROWS_TO_GET = 10;
    Crud fetchdata=new Crud();

	protected void doPost(HttpServletRequest request, HttpServletResponse rs) throws ServletException, IOException {
		
		//doGet(request, response);
		InvoiceDetails s = new InvoiceDetails();
		BufferedReader reader = request.getReader();
		String invoice = reader.readLine();
		System.out.println(invoice);

//		invoice =  invoice.substring(1, invoice.length() - 1);
		String final_values[] = invoice.split(",");
		System.out.println("length: "+final_values.length);
		for(int i = 0; i < final_values.length; ++i) {
			final_values[i] = final_values[i].split(":")[1];
			final_values[i] = final_values[i].substring(1, final_values[i].length() - 1);
			System.out.println("Test: "+final_values[i]);
		}
		
		s.setBusiness_code(final_values[0]);
		s.setCust_number(Integer.parseInt(final_values[1]));
		s.setClear_date(final_values[2]);
		s.setBuisness_year(Integer.parseInt(final_values[3]));
		s.setDoc_id(final_values[4]);
		s.setPosting_date(final_values[5]);
		s.setDocument_create_date(final_values[6]);
		s.setDue_in_date(final_values[7]);
		s.setInvoice_currency(final_values[8]);
		s.setDocument_type(final_values[9]);
		s.setPosting_id(Integer.parseInt(final_values[10]));
		s.setTotal_open_amount(Double.parseDouble(final_values[11]));
		s.setBaseline_create_date(final_values[12]);
		s.setCust_payment_terms(final_values[13]);
		
		String test[]=final_values[14].split("\"");
	    String testid=test[0];
	    System.out.println("Test cast: "+testid);	
		s.setInvoice_id(Integer.parseInt(testid));
		 	
		
		HashMap<String, String> hm = fetchdata.addData(s);
		Gson gson = new Gson();
		rs.setStatus(Integer.parseInt(hm.get("code")));
		String respData = gson.toJson(hm);
		rs.getWriter().append(respData);
		//rs.setHeader("Access-Control-Allow-Origin","*");
		System.out.println("test "+hm.get("message"));
		
	}




}

