package com.highradius.servlet;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.highradius.crud.AnalyticsDetails;
import com.google.gson.*;



@WebServlet("/Analytics")
public class AnalyticsServlet extends HttpServlet{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	AnalyticsDetails s;

	public AnalyticsServlet()
	{
		super();
		s = new AnalyticsDetails();
	}
	
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		
			  	
	  	Gson gson = new Gson();
	  	HashMap<String, Object> hm = new HashMap<String, Object>();
	  	hm = s.getAnalytics(
	  			request.getParameter("s_cdate"),
				request.getParameter("e_cdate"),
				request.getParameter("s_due_date"),
				request.getParameter("e_due_date"),	
				request.getParameter("s_base_date"),
				request.getParameter("e_base_date"),
				request.getParameter("invoice_currency")
				);
	  	System.out.println(hm);
	  	response.setHeader("Access-Control-Allow-Origin", "*");
	  	
	  	response.setStatus(200);  		  	
	  	
		String respData = gson.toJson(hm);
		System.out.println(respData);
		response.getWriter().append(respData);
	  	
	}

}