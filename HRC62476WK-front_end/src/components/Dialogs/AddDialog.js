import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Grid, makeStyles } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {url} from '../Services/Api'
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
 
  WindowHeader: {
    background: '#2A3E4C',
    color: '#FFFFFF',
    // position: 'static',
},
textfield: {
  backgroundColor: "#fff",
  "&  .MuiFormHelperText-root.Mui-required": { //<--- here
    backgroundColor: "#2A3E4C",
    margin:0,
    color:"red",
    paddingLeft: 10
  },
},
}))
const initialState = {
  business_code:"", 
  cust_number:"",
  clear_date:"",
  buisness_year:"",
  doc_id:"", 
  posting_date:"",
  document_create_date:"",
  due_in_date:"",
  invoice_currency:"",
  document_type:"",
  posting_id:"",
  total_open_amount:"", 
  baseline_create_date:"", 
  cust_payment_terms:"", 
  invoice_id:""
};
export default function AddDialog(props) {
  const {open, setOpen}=props;
  const classes = useStyles();
  const [invoice, setInvoice] = React.useState(initialState);
  //console.log(invoice)
  
  const handleClose = () => {
    setOpen(false);
    setInvoice(initialState);
  }
  const checkEmpty= (invoice) =>{
    var flag = 0;
    //console.log(Object.values(invoice))
    flag = Object.values(invoice).some(value => value === null || value.length === 0);
    return flag;
}
  const addInvoice = async (e, invoice)=>{
    //this is use to prevent data to add in url part
    e.preventDefault();
    console.log(invoice);

    const config = {
        mode: 'no-cors',
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: (invoice),
       
    };
    console.log(checkEmpty(invoice))
    
    if(checkEmpty(invoice))
    {
        toast.error("One or more fields empty. All fields mandatory.",{
          position: toast.POSITION.TOP_CENTER, autoClose:1200})
    }
    else
    {
        // fetch(url+"/AddInvoice", config)
        axios.post(url+"/AddInvoice", invoice)
        .then((response) => {
          console.log(response)
              toast.success("Data successfully added,please refresh your list",{
                position: toast.POSITION.TOP_CENTER, autoClose:800});
              setOpen(false)  
          })
            .catch(function(error) {  
              console.log('Request failed', error.response);
              toast.error(error.response && error.response.data ? error.response.data.message : "Oh no, something broke");
            });
            // console.log(response);
            // console.log(response.status);
            // if(response.status==0)
            //    
            // else
           // console.log(response.status);
            
            //    if(response.headers.status==00 || response.headers.status===500)
       
            // toast.error("Server error,we can't do anything");
           
       
    }
    

}
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <div>
      <Dialog
        aria-labelledby="responsive-dialog-title"
        open={open} 
        onClose={handleClose}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "fit-content", 
            },
          },
        }}
      >
        <DialogTitle className={classes.WindowHeader} id="responsive-dialog-title">
          {"Add"}
        </DialogTitle>
        <DialogContent className={classes.WindowHeader}>
            <Grid container spacing={3} >
                <Grid item  xs={6} sm={3}>
                  <TextField 
                  required
                  className={classes.textfield}                  
                  fullWidth style={{background:'white',borderRadius:'5px'}}  
                  label="Business Code" size='small' variant="filled" 
                  name="business_code" defaultValue={invoice.business_code}
                  helperText={
                    invoice.business_code.length === 0 ||invoice.business_code.length >= 3
                      ? ""
                      : "Business Code should be of atleast 3 digits"
                  }
                  onChange={(e) => setInvoice({ ...invoice,business_code : e.target.value })}                
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                  required
                  className={classes.textfield}               
                  fullWidth style={{background:'white',borderRadius:'5px'}}  
                  label="Customer Number" size='small' variant="filled" 
                  defaultValue={invoice.cust_number}
                  helperText={
                    invoice.cust_number.length === 0 ||invoice.cust_number.length >= 9
                      ? ""
                      : "Please enter valid customer number"
                  }
                  onChange={(e) => setInvoice({ ...invoice, cust_number: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  
                  <TextField
                  fullWidth style={{background:'white',borderRadius:'5px'}}  
                  id="date-picker-dialog"
                  type="date" InputLabelProps={{
                    shrink: true,
                  }}
                  label="Clear Date" size='small' variant="filled" 
                  defaultValue={invoice.clear_date}
                  onChange={(e) => setInvoice({ ...invoice, clear_date: e.target.value })}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                  fullWidth style={{background:'white',borderRadius:'5px'}}  
                  label="Business Year" size='small' variant="filled"
                  defaultValue={invoice.buisness_year}
                  helperText={
                    invoice.buisness_year.length===0 || invoice.buisness_year >= 1901 || invoice.buisness_year <= 2155
                      ? ""
                      : "Business Year must be between 1901 and 2155. "
                  }
                  onChange={(e) => setInvoice({ ...invoice, buisness_year: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField 
                  required
                  className={classes.textfield}
                  fullWidth style={{background:'white',borderRadius:'5px'}}  
                  label="Document id" size='small' variant="filled" 
                  defaultValue={invoice.doc_id}
                  helperText={
                    invoice.doc_id.length ===0 || invoice.doc_id.length <=10
                      ? ""
                      : "Doc id should be of less than 10 digits"
                  }
                  onChange={(e) => setInvoice({ ...invoice, doc_id: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                  fullWidth style={{background:'white',borderRadius:'5px'}} 
                  id="date-picker-dialog"
                  type="date" InputLabelProps={{
                    shrink: true,
                  }} 
                  label="Posting Date" size='small' variant="filled"
                  defaultValue={invoice.posting_date}
                  onChange={(e) => setInvoice({ ...invoice, posting_date: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                  fullWidth style={{background:'white',borderRadius:'5px'}} 
                  id="date-picker-dialog"
                  type="date" InputLabelProps={{
                    shrink: true,
                  }} 
                  label="Document Create Date" size='small' variant="filled"
                  defaultValue={invoice.document_create_date}
                  onChange={(e) => setInvoice({ ...invoice, document_create_date: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                  fullWidth style={{background:'white',borderRadius:'5px'}} 
                  id="date-picker-dialog"
                  type="date" InputLabelProps={{
                    shrink: true,
                  }} 
                  label="Due Date" size='small' variant="filled" 
                  defaultValue={invoice.due_in_date}
                  onChange={(e) => setInvoice({ ...invoice,due_in_date: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField 
                  required
                  className={classes.textfield}
                  fullWidth style={{background:'white',borderRadius:'5px'}}  
                  label="Invoice Currency" size='small' variant="filled"
                  defaultValue={invoice.invoice_currency}
                  helperText={
                    invoice.invoice_currency.length === 0 ||invoice.invoice_currency.length >=3 && invoice.invoice_currency.length <=5
                      ? ""
                      : "Please use abbreviation"
                  }
                  onChange={(e) => setInvoice({ ...invoice, invoice_currency: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                  required
                  className={classes.textfield}
                  fullWidth style={{background:'white',borderRadius:'5px'}}  
                  label="Document Type" size='small' variant="filled"
                  defaultValue={invoice.document_type} 
                  helperText={
                    invoice.document_type.length === 0 ||invoice.document_type.length >=3 &invoice.document_type.length <=5
                      ? ""
                      : "Please use abbreviation"
                  }
                  onChange={(e) => setInvoice({ ...invoice, document_type: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                  required
                  className={classes.textfield}
                  fullWidth style={{background:'white',borderRadius:'5px'}}  
                  label="Posting id" size='small' variant="filled"
                  helperText={
                    invoice.document_type.length === 0 ||invoice.posting_id <=1
                      ? ""
                      : "Posting id must be 0 or 1"
                  }
                  defaultValue={invoice.posting_id}
                  onChange={(e) => setInvoice({ ...invoice,posting_id: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                  required
                  className={classes.textfield}
                  fullWidth style={{background:'white',borderRadius:'5px'}}  
                  label="Total open amount" size='small' variant="filled"
                  defaultValue={invoice.total_open_amount} 
                  helperText={
                    invoice.total_open_amount.length === 0 ||invoice.total_open_amount >0
                      ? ""
                      : "Total amount can't be zero"
                  }
                  onChange={(e) => setInvoice({ ...invoice, total_open_amount: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField 
                  fullWidth style={{background:'white',borderRadius:'5px'}} 
                  id="date-picker-dialog"
                  type="date" InputLabelProps={{
                    shrink: true,
                  }} 
                  label="Baseline Create date" size='small' variant="filled"
                  defaultValue={invoice.baseline_create_date} 
                  onChange={(e) => setInvoice({ ...invoice,baseline_create_date: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                  required
                  className={classes.textfield}
                  fullWidth style={{background:'white',borderRadius:'5px'}}  
                  label="Customer payment term" size='small' variant="filled"
                  defaultValue={invoice.cust_payment_terms} 
                  helperText={
                    invoice.cust_payment_terms.length === 0 ||invoice.cust_payment_terms.length >=4 && invoice.cust_payment_terms.length <=5
                      ? ""
                      : "Please use valid format"
                  }
                  onChange={(e) => setInvoice({ ...invoice, cust_payment_terms: e.target.value })}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                  required
                  className={classes.textfield}
                  fullWidth style={{background:'white',borderRadius:'5px'}}  
                  label="Invoice id" size='small' variant="filled" 
                  defaultValue={invoice.invoice_id}
                  helperText={
                    invoice.invoice_id.length === 0 ||invoice.invoice_id >=9
                      ? ""
                      : "Invoice id should be greater than 10"
                  }
                  onChange={(e) => setInvoice({ ...invoice,invoice_id: e.target.value })}
                  
                  />
                </Grid>

              </Grid>   
        </DialogContent>
        
        <DialogActions className={classes.WindowHeader}>
            <Button 
              fullWidth="true" variant="outlined" 
              style={{color: "white",border: '1px solid white'}}
              helperText
              onClick={e=>addInvoice(e,invoice)}
              >ADD</Button>
            <Button  fullWidth="true" style={{color: "white",border: '1px solid white'}} onClick={handleClose} variant="outlined">CANCEL</Button>   
        </DialogActions>
      </Dialog>
    </div>
  );
}
