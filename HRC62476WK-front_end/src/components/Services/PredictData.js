import axios from "axios"
import { toast } from 'react-toastify';
import {url} from '../Services/Api'

export const getAgeBucket=async(doc_id)=>{
    const obj={"data":doc_id}
    console.log(obj)

    const response = await fetch("http://127.0.0.1:5000/get_prediction", {
    method: "POST",
    body: JSON.stringify(obj),	
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    console.log(response)
    return response.json()
}

export const editPredictData = async(details) =>{
 //details [{ sl_no, aging_bucket }]
    console.log(details)
    await axios.post(url+ "/Predict",details)
    .then((response) => {
        console.log(response);
        toast.success("Items predicted")
    })
    .catch((error) => {
        console.log(error.response);
    });
}
