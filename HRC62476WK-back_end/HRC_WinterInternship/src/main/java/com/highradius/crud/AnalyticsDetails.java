package com.highradius.crud;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import com.highradius.pojo.InvoiceDetails;
import com.highradius.pojo.AnalyticObject;
import com.highradius.crud.Crud;
public class AnalyticsDetails {

	
	public ArrayList<AnalyticObject>  getBusinessCodeAnalytics(String scd, String ecd,
											 String sdd, String edd,
											 String sbcd, String ebcd, String invc)
	{
		Crud fetchdata=new Crud();
		ArrayList<AnalyticObject> data = new ArrayList<AnalyticObject>();
		
		
		
		try 
		{
			Connection conn = fetchdata.getConnection();
			String sql_query;
			if(invc == null || invc.length()==0)
			{
				
			sql_query="SELECT  business_code,COUNT(DISTINCT(cust_number)) AS COUNT,  "
					+ "SUM(converted_usd) AS amount FROM ( "
					+ "SELECT business_code, cust_number,  "
					+ "CASE WHEN invoice_currency=\"CAD\"  "
					+ "THEN total_open_amount*0.79  "
					+ "ELSE total_open_amount END AS converted_usd  "
					+ "FROM winter_internship WHERE  "
					+ (scd!=null? " clear_date > '"+scd+"' AND ":"")
					+ (ecd!=null ?"  clear_date < '"+ecd+"' AND":"")
					+ (sdd!=null? " due_in_date > '"+sdd+"' AND ":"")
					+ (edd!=null ?"  due_in_date < '"+edd+"' AND":"")
					+ (sbcd!=null? "  baseline_create_date > '"+sbcd+"' AND ":"")
					+ (ebcd!=null ? " baseline_create_date < '"+ebcd+"' AND ":"")
					+ " is_deleted=0) newTable GROUP BY business_code ";
			}
			else
			{
				sql_query="SELECT business_code, COUNT(DISTINCT(cust_number)) AS count, "
						+ "SUM(total_open_amount) AS amount from winter_internship WHERE "
						+ (scd!=null? " clear_date > '"+scd+"' AND ":"")
						+ (ecd!=null ?" clear_date < '"+ecd+"' AND ":"")
						+ (sdd!=null? " due_in_date > '"+sdd+"' AND ":"")
						+ (edd!=null ?"  due_in_date < '"+edd+"' AND ":"")
						+ (sbcd!=null? "  baseline_create_date > '"+sbcd+"' AND ":"")
						+ (ebcd!=null ? " baseline_create_date < '"+ebcd+"' AND ":"")
						+ (invc!=null ? " invoice_currency = '"+invc+"' AND ":"")
						+ " is_deleted=0 GROUP BY business_code ";
			}
			

			
			
			
					
			PreparedStatement pst = conn.prepareStatement(sql_query);
			
			 System.out.println(pst);
			 
			 ResultSet rs = pst.executeQuery();
			 while(rs.next())
			 {
				 
				 data.add(new AnalyticObject(rs.getString("business_code"),
						 rs.getInt("count"), rs.getDouble("amount") ));
			 }
			 
			return data;
			
			 
		 
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println("exception occured");
			return data;
		}
		
		
		
		
		
	}
	
	public ArrayList<AnalyticObject> getCurrencyAnalytics(String scd, String ecd,
											 String sdd, String edd, String sbcd, 
											 String ebcd, String invc)
	{
		Crud fetchdata=new Crud();
		ArrayList<AnalyticObject> data = new ArrayList<AnalyticObject>();
		
		try 
		{
			Connection conn = fetchdata.getConnection();
			
			String sql_query="SELECT invoice_currency, COUNT(*) AS count, "
					+ " SUM(total_open_amount) as amount "
					+ "from winter_internship WHERE "
					+ (scd != null ? "clear_date > '"+scd+"' AND ":"")
					+ (ecd != null  ?" clear_date < '"+ecd+"' AND":"")
					+ (sdd != null ? "due_in_date > '"+sdd+"' AND ":"")
					+ (edd != null  ?" due_in_date < '"+edd+"' AND":"")
					+ (sbcd != null ? " baseline_create_date > '"+sbcd+"' AND ":"")
					+ (ebcd != null  ? " baseline_create_date < '"+ebcd+"' AND ":"")
					+ " is_deleted=0 GROUP BY invoice_currency ";
			
					
			PreparedStatement pst = conn.prepareStatement(sql_query);
			
			 System.out.println(pst);
			 
			 ResultSet rs = pst.executeQuery();
			 while(rs.next())
			 {
				 
				 data.add(new AnalyticObject(rs.getString("invoice_currency"),
						 rs.getInt("count"), rs.getDouble("amount") ));
			 }
			 
			return data;
			
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println("exception occured");
			return data;
		}
		
		
	}
	
	
	
	public HashMap<String, Object> getAnalytics(String scd, String ecd, String sdd, String edd,
			 String sbcd, String ebcd, String invc)
	{
		HashMap<String, Object> hm = new HashMap<String, Object>();
		try {
			ArrayList<AnalyticObject> data = getCurrencyAnalytics(scd, ecd, sdd, edd, sbcd, ebcd, invc);
			hm.put("currencyAnalytics", data);
		}
		catch(Exception e)
		{
			hm.put("code", 500);
			return hm;
		}
		try {
			ArrayList<AnalyticObject> data = getBusinessCodeAnalytics(scd, ecd, sdd, edd, sbcd, ebcd, invc);
			hm.put("businessAnalytics", data);
		}
		catch(Exception e)
		{
			hm.put("code", 500);
			return hm;
		}
		hm.put("code",200);
		return hm;
		
	}
}

