import axios from "axios"
import { toast } from 'react-toastify';
import {url} from '../Services/Api'
const checkEmpty = (object) =>{
    var flag = 0;
    console.log(Object.values(object))
    Object.values(object).map(value => {if(value === null || value.length === 0) flag++});
    console.log(flag)
    return flag;
}

export const AnalyticsData = async(obj) =>{

    if(checkEmpty(obj) == 7)
    {
        toast.error("All fields cannot be null")
    }
    else{
        const newUrl =url+`/Analytics?`
                + (obj?.s_cdate ? `&s_cdate=${obj.s_cdate}`:``)
                + (obj?.e_cdate ?`&e_cdate=${obj.e_cdate}`:``)
                + (obj?.s_due_date ? `&s_due_date=${obj.s_due_date}`:``)
                + (obj?.e_due_date ? `&e_due_date=${obj.e_due_date}`:``)
                + (obj?.s_base_date ?`&s_base_date=${obj.s_base_date}`:``)
                + (obj?.e_base_date ? `&e_base_date=${obj.e_base_date}`:``)
                + (obj?.invoice_currency ? `&invoice_currency=${obj.invoice_currency}`:``)
        const response = await axios.get(newUrl,{
            headers:{
                'Content-type':'application/json'
            }
        }).catch(err=>{
            console.log("Received error", err)
            toast.error("Error occured,please try again", {
                position: toast.POSITION.TOP_CENTER, autoClose:800});
        })
        console.log(response)
        return response.data;
        
    }
}