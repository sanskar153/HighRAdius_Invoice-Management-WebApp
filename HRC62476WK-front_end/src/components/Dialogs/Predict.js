import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useStyles = makeStyles((theme) => ({
  WindowHeader: {
    background: '#2A3E4C',
    color: '#FFFFFF',
    // position: 'static',
},
}))
// const initialState = {
//   business_code:"", 
//   cust_number:"",
//   clear_date:"",
//   buisness_year:"",
//   doc_id:"", 
//   posting_date:"",
//   document_create_date:"",
//   due_in_date:"",
//   invoice_currency:"",
//   document_type:"",
//   posting_id:"",
//   total_open_amount:"", 
//   baseline_create_date:"", 
//   cust_payment_terms:"", 
//   invoice_id:""
 
  
// };

export default function Predict(props) {
  const {open,setOpen,selected,setSelected}=props;
  //console.log(selected.length)
  const classes = useStyles();
  const handleClose = () => { 
    setOpen(false);
  }
  const predictInvoice = async (e,selected)=>{
    //this is use to prevent data to add in url part
    e.preventDefault();
    console.log(selected);
    const config = {
      mode: 'no-cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: selected
    };
      fetch("http://127.0.0.1:5000/get_prediction", config)
      .then((res) => res.json())
      handleClose();
    
     
  }  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        aria-labelledby="responsive-dialog-title"
        
        open={open} 
        onClose={handleClose}
      >
        <DialogTitle className={classes.WindowHeader} id="responsive-dialog-title">
          {"Delete Records?"}
        </DialogTitle>
        <DialogContent className={classes.WindowHeader}>
          <DialogContentText color='white'>
              Prediction successfully
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Button 
      fullWidth="true" 
      style={{color: "white",border: '1px solid white'}} 
      onClick={e=>predictInvoice(e,selected)} 
      variant="outlined"
      >DELETE
      </Button>
    </div>
  );
}
