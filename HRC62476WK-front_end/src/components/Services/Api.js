import axios from 'axios';
//replace table cell with dynamic row array
//https://stackoverflow.com/questions/64439428/dynamic-table-in-react-using-material-ui
//https://docs.oracle.com/javaee/5/api/javax/servlet/http/HttpServlet.html

//https://codesandbox.io/s/jebqk



export const url="http://localhost:8080/HRC_Project"
//axios.get(`http://localhost:8080/1830196/SendData?page=${dataPageCount}`)
// export const getData=async()=>{
//     return await axios.get(url+"/Servlet")
    
// }
export const getData = async ( noOfRows,page, params) =>{let response =await axios.get(url
                + `/Servlet?page=${page}&rowsNo=${noOfRows}`
                + (params?.doc_id ? `&doc_id=${params.doc_id}`:``)
                + (params?.c_num ?`&cust_number=${params.c_num}`:``)
                + (params?.inv_id? `&invoice_id=${params.inv_id}`:``)
                + (params?.b_year ? `&buisness_year=${params.b_year}`:``),{
                headers:{
                    'Content-type':'application/json'
                }
                
    }).catch(err=>{
        // toast.error(err.response && err.response.data ? err.response.data  : "Unknown error occured");
        console.log(err)
    })
    
    console.log(response.data.data)
    return response.data;
}




export const addInvoiceData=async(invoice)=>{ 
    const{
        cust_number,
        business_code

    } =invoice
    //destructure
    let data="cust_number="+ cust_number+"&business_code="+business_code;
    console.log(invoice)
    let response = await axios.post(url+"/Servlet?"+data);
    return response.data;
}

