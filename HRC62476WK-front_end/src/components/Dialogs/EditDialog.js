import * as React from 'react';
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {url} from '../Services/Api'
const useStyles = makeStyles(() => ({
  WindowHeader: {
    background: '#2A3E4C',
    color: '#FFFFFF',

  },
}))

export default function EditDialog({open,setOpen,selectedInvoice}) {
 
  const classes = useStyles();
  const [info, setInfo] = useState({
    invoice_currency: "",
    cust_payment_terms: "",    
  });
  const handleClose = () => {
    setOpen(false);
}
  useEffect(() => {
    if (selectedInvoice[0]) {
      setInfo({
        sl_no: selectedInvoice[0].sl_no,
        invoice_currency: selectedInvoice[0].invoice_currency,
        cust_payment_terms: selectedInvoice[0].cust_payment_terms,
        
      });
    }
  }, [selectedInvoice[0]]);

  const handleSave = () => {
      const config = {
        mode: 'no-cors',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoice_currency: info.invoice_currency + "",  
          cust_payment_terms:info.cust_payment_terms+"",
          sl_no: info.sl_no + "",
          
        }),
        
      };
      if(info.cust_payment_terms !== '' && info.invoice_currency!==''){
        fetch(url+"/EditInvoice", config)
        .then((res) => res.json())
        toast.success('Successfully edited', {
          position: toast.POSITION.TOP_CENTER, autoClose:800})
        handleClose();
      }
      else{
        toast.error('Please fill the details', {
          position: toast.POSITION.TOP_CENTER, autoClose:800})    
      }
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        aria-labelledby="responsive-dialog-title"
        
        open={open} 
        onClose={handleClose}
      >
        <DialogTitle className={classes.WindowHeader} id="responsive-dialog-title">
          {"Edit"}
        </DialogTitle>
        <DialogContent className={classes.WindowHeader}>
            <TextField
              style={{background:'white',borderRadius:'5px',marginRight:'2rem'}}  
              label="Invoice Currency" variant="filled" 
              defaultValue={info.invoice_currency}
              onChange={(e) => setInfo({ ...info, invoice_currency: e.target.value })}
            />
            <TextField    
              style={{background:'white',borderRadius:'5px'}}  
              label="Customer Payment Terms" variant="filled" 
              defaultValue={info.cust_payment_terms}         
              onChange={(e) => setInfo({ ...info,cust_payment_terms: e.target.value })}
            />               
        </DialogContent>
        <DialogActions className={classes.WindowHeader}>
            <Button  fullWidth="true" style={{color: "white",border: '1px solid white'}} onClick={handleSave} variant="outlined">EDIT</Button>
           
            <Button onClick={handleClose} fullWidth="true" style={{color: "white",border: '1px solid white'}} variant="outlined">CANCEL</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
