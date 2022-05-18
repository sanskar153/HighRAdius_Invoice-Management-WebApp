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
@WebServlet("/Servlet")

public class Servlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Servlet() {
        super();
        
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */

    Crud fetchdata=new Crud();
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		response.getWriter();
		 //int NO_OF_ROWS_TO_GET = 1000;
		 int page=0,rowsNo=10;
		 if(request.getParameter("page")!= null || request.getParameter("rowsNo")!= null) {
			 String pageInURL = request.getParameter("page");
			 
			 String rowInURL= request.getParameter("rowsNo");
			      
			 page = Integer.parseInt(pageInURL);
			 rowsNo=Integer.parseInt(rowInURL);
			 System.out.println(page);
			 System.out.println(rowsNo);
		 }
  		  
		// String sql_statement = "SELECT * from winter_internship LIMIT 1000";
		 HashMap<Object, Object> data = fetchdata.getData(request.getParameter("doc_id"),
					request.getParameter("cust_number"),
					request.getParameter("invoice_id"),
					request.getParameter("buisness_year"),rowsNo,page);
		 // System.out.println(data);
		  	
		  	Gson gson = new Gson();
			String respData = gson.toJson(data);
			
			response.getWriter().print(respData);
	}
}

