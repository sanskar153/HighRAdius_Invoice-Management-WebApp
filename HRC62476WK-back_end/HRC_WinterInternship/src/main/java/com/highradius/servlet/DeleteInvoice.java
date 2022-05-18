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
@WebServlet("/DeleteInvoice")

public class DeleteInvoice extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
	Crud fetchdata=new Crud();
    public DeleteInvoice() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */

    protected void doPost(HttpServletRequest request, HttpServletResponse rs) throws ServletException, IOException {
		// TODO Auto-generated method stub
    	BufferedReader reader = request.getReader();
		String slNos = reader.readLine();
		
		String[] final_value = slNos.split(",");
		int[] ids = new int[final_value.length];

		for(int i=0; i<final_value.length; i++) {

		    ids[i] = Integer.parseInt(final_value[i]);
		    //System.out.println("test"+ ids[i]);
		
		}	
		int resp = fetchdata.deleteData(ids);
		rs.setStatus(resp);
		
	}
}

