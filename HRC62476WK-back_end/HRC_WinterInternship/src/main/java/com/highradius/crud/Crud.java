package com.highradius.crud;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import com.highradius.pojo.InvoiceDetails;


public class Crud {

	public static Connection getConnection()
	{
		 Connection conn =null;
		 String url ="jdbc:mysql://localhost:3306/grey_goose";
		 String user = "root";
		 String pass ="H@1aamigo";
				
				try {
					Class.forName("com.mysql.cj.jdbc.Driver");
					conn =DriverManager.getConnection(url,user,pass);
				} catch (ClassNotFoundException e) {
					
					e.printStackTrace();
				} catch (SQLException e) {
					e.printStackTrace();
					
				}
				
				return conn;

		}
	public int getRows(String b_code, String cust_number, 
			String clear_date, String b_year)
	{
		try {
			Connection conn = getConnection();
			String query = "SELECT COUNT(*) AS COUNT FROM winter_internship WHERE "
					+ (b_code!=null ? "doc_id = ? AND ":"")
					+ (cust_number!=null ?" cust_number = ? AND ":"")
					+ (clear_date!=null ? " invoice_id = ? AND ":"")
					+ (b_year!=null ? " buisness_year = ? AND":"")
					+ " is_deleted=0;";
			
			PreparedStatement pst = conn.prepareStatement(query);
			
			int c = 1;
			
			if(b_code!=null)  pst.setString(c++, b_code);
			if(cust_number!=null) pst.setInt(c++, Integer.parseInt(cust_number));
			if(clear_date!=null) pst.setString(c++, clear_date);
			if(b_year!=null) pst.setInt(c, Integer.parseInt(b_year));
			System.out.println(pst);
			ResultSet rs = pst.executeQuery();
			rs.next();				
			return rs.getInt("count");
			
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println("exception occured in getrows");
			return -1;
		}
	}

	public HashMap<Object, Object>  getData(String b_code, String cust_number, 
			String clear_date, String b_year, int limit, int offset)
	{
		ArrayList<InvoiceDetails> data = new ArrayList<InvoiceDetails>();
		HashMap<Object, Object> hm = new HashMap<Object, Object>();
		
		
		try 
		{
		Connection conn = getConnection();
		
		int rows = getRows(b_code, cust_number, clear_date, b_year);
		hm.put("rows", rows);
		if(rows<0)
		{
		
		return hm;
		}
		
		
		String sql_query = "SELECT * FROM winter_internship WHERE "
		+ (b_code!=null ? "doc_id = ? AND ":"")
		+ (cust_number!=null ?" cust_number = ? AND":"")
		+ (clear_date!=null ? " invoice_id = ? AND ":"")
		+ (b_year!=null ? " buisness_year = ? AND":"")
		+ " is_deleted=0 LIMIT ? OFFSET ?;";
		
		
		
		
		PreparedStatement pst = conn.prepareStatement(sql_query);
		
		int c = 1;
		
		if(b_code!=null)  pst.setString(c++, b_code);
		if(cust_number!=null) pst.setInt(c++, Integer.parseInt(cust_number));
		if(clear_date!=null) pst.setString(c++, clear_date);
		if(b_year!=null) pst.setInt(c++, Integer.parseInt(b_year));
		pst.setInt(c++, limit);
		pst.setInt(c,  offset);
		
		System.out.println(pst);
		
		ResultSet rs = pst.executeQuery();
		System.out.println(rs);
		while(rs.next())
		{
		
		InvoiceDetails s = new InvoiceDetails();
			
		s.setSl_no(rs.getInt("sl_no"));
		s.setBusiness_code(rs.getString("business_code"));
		s.setCust_number(rs.getLong("cust_number"));
		s.setClear_date(rs.getString("clear_date"));
		s.setBuisness_year(rs.getInt("buisness_year"));
		s.setDoc_id(rs.getString("doc_id"));
		s.setPosting_date(rs.getString("posting_date"));
		s.setDocument_create_date(rs.getString("document_create_date1"));
		s.setDue_in_date(rs.getString("due_in_date"));
		s.setInvoice_currency(rs.getString("invoice_currency"));
		s.setDocument_type(rs.getString("document_type"));
		s.setPosting_id(Integer.parseInt(rs.getString("posting_id")));
		s.setArea_business(rs.getString("area_business"));
		s.setTotal_open_amount(rs.getDouble("total_open_amount"));
		s.setBaseline_create_date(rs.getString("baseline_create_date"));
		s.setCust_payment_terms(rs.getString("cust_payment_terms"));						
		s.setInvoice_id(Integer.parseInt(rs.getString("invoice_id")));
		s.setIsOpen( rs.getInt("isOpen"));
		s.setAging_bucket(rs.getString("aging_bucket"));		
		
		data.add(s);
		
		
		}
		
		hm.put("data", data);
		System.out.println(hm.get("data"));
		
		
		
		}
		catch (Exception e) {
		e.printStackTrace();
		System.out.println("exception occured");
		}		
		return hm;	
		}

		public HashMap<String, String> addData(InvoiceDetails s)
		{
			Connection conn;
			HashMap<String, String> hm = new HashMap<String, String>();
			
			try {
				 conn = getConnection();
				 String sql_query= "SELECT * FROM customer WHERE cust_number = ?";
				 PreparedStatement pst = conn.prepareStatement(sql_query);
				  pst.setLong(1, s.getCust_number());
				 // System.out.println(s.getCust_number()+"+"+pst);

				 ResultSet rs = pst.executeQuery();
				 //rs.next();
				 //System.out.println(pst.executeQuery());
				 
				 if(rs.next()==false)
				 {
					 hm.put("code", "500");
					 hm.put("message", "Customer number does not exist");
					 
					 return hm;
				 }
				 sql_query= "SELECT * FROM business WHERE business_code = ?";
				 pst = conn.prepareStatement(sql_query);
				 pst.setString(1, s.getBusiness_code());
				  System.out.println(s.getBusiness_code()+"+"+pst);

				 rs = pst.executeQuery();
				 //rs.next();
				 //System.out.println(pst.executeQuery());
				 
				 if(rs.next()==false)
				 {
					 hm.put("code", "500");
					 System.out.println(hm.get("code"));
					 hm.put("message", "Business code does not exist");
					 return hm;
				 }	 
				 
				 try {
					 
					  sql_query="INSERT INTO winter_internship (business_code, cust_number, clear_date, buisness_year, "
					 		+ "doc_id, posting_date, document_create_date1, due_in_date, invoice_currency, document_type, "
					 		+ "posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id, isOpen, is_deleted)"
					 		+ "VALUES (?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0);";
					 
					 pst = conn.prepareStatement(sql_query);
					
					pst.setString(1, s.getBusiness_code()); ;
					pst.setLong(2, s.getCust_number());
					pst.setString(3, s.getClear_date());
					pst.setInt(4, s.getBuisness_year());
					pst.setString(5, s.getDoc_id());
					pst.setString(6, s.getPosting_date());
					pst.setString(7, s.getDocument_create_date());
					pst.setString(8, s.getDue_in_date());
					pst.setString(9, s.getInvoice_currency());
					pst.setString(10, s.getDocument_type());
					pst.setLong(11, s.getPosting_id());
					pst.setDouble(12, s.getTotal_open_amount());
					pst.setString(13, s.getBaseline_create_date());
					pst.setString(14, s.getCust_payment_terms());						
					pst.setInt(15, s.getInvoice_id());			
						
					 pst.executeUpdate();
					 System.out.println(pst);
					 System.out.println(sql_query);
					 hm.put("code", "200");
					 System.out.println(hm.get("code"));
					 return hm;
					 
					 				 
					}
					catch (Exception e) {
						e.printStackTrace();
						System.out.print("Busi error "+e.getMessage()+","+e.getCause());
						
						hm.put("code", "500");
						return hm;
					}
				 
				 
			}
			catch(Exception e)
			{
				e.printStackTrace();
				System.out.print(e.getMessage()+","+e.getCause());
				
				hm.put("code", "500");
				return hm;
			}	
				
		}
		public int deleteData( int[] sl_no )
		{
			try {
				 Connection conn = getConnection();
				 for(int i=0;i<sl_no.length; i++)
				 {
					String sql_query= "UPDATE winter_internship SET is_deleted = 1 WHERE sl_no = ?";
						 
					PreparedStatement pst = conn.prepareStatement(sql_query);
					
					pst.setInt(1, sl_no[i]);
					System.out.println(pst);
					System.out.println(sql_query);
						
					pst.executeUpdate();
				 }
											 
				 return 200;
				 				 				 
				}
				catch (Exception e) {
					e.printStackTrace();
					return 500;
				}
				
		}
		public HashMap<String, String> updateBucket( int[] sl_no, String[] aging_bucket )
		{
			HashMap<String, String> hm = new HashMap<String, String>();
			try {
				 Connection conn = getConnection();
				 for(int i=0;i<sl_no.length; i++)
				 {
					// System.out.println(sl_no[i]);
					String sql_query= "UPDATE winter_internship "
						 		+ "SET aging_bucket = ? "
						 		+ "WHERE sl_no = ?;";
						 
					PreparedStatement pst = conn.prepareStatement(sql_query);
					String ag[]=aging_bucket[i].split("\"");
				    
					pst.setString(1, ag[0]);
					System.out.println(ag[0]);
					pst.setInt(2, sl_no[i]);
					
					System.out.println(pst);
						
					pst.executeUpdate();
				 }
				 
				
				 hm.put("code", "200");
				 hm.put("message", "Successful");
				 return hm;
				 
				 				 
				}
				catch (Exception e) {
					e.printStackTrace();
					hm.put("code", "500");
					hm.put("message", e.getMessage());
					return hm;
				}
				
		}
			
}
