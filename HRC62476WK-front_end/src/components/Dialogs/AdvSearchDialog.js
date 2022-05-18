import {useEffect, useState} from 'react';
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

const useStyles = makeStyles((theme) => ({
 
  WindowHeader: {
    background: '#2A3E4C',
    color: '#FFFFFF',
},
}))
export default function AdvSearch({open, setOpen, setSearchParams, params}) {
  
  const classes = useStyles();

  const [doc_id, setDocId] = useState("")
  const [cust_number, setCNum] = useState(0)
  const [invoice_id, setInvId] = useState("")
  const [business_year, setBYear] = useState(0)

  useEffect(() => {
    setDocId(params?.doc_id);
    setCNum(params?.c_num);
    setInvId(params?.inv_id);
    setBYear(params?.b_year);
    //console.log(params)
  }, [])
  
  const handleClose = () => {
    setOpen(false);
}
  const handleAdvSearch = () =>{ 
   console.log(doc_id,cust_number,invoice_id,business_year)
     
      if(doc_id !== null || cust_number !== null|| invoice_id!== null || business_year!==null){
        setOpen(false)
        setSearchParams({ 
          doc_id: doc_id,
          c_num: cust_number,
          inv_id: invoice_id,
          b_year: business_year })
      }
      // else if(business_year < 1901 || business_year > 2155)
      // {
      //     toast.error("Invalid business year. Must be between 1901 and 2155.")
      // }
      // else if(doc_id > 6 )
      // {
      //     toast.error("Invalid id. Must be greater than 6.")
      // }
      // else if(invoice_id > 6)
      // {
      //     toast.error("Invalid id. Must be greater than 6.")
      // }
      else{
        toast.error('Please fill atleast one detail', {
          
          position: toast.POSITION.TOP_CENTER, autoClose:800}) 
         // setOpen(false)
          console.log("Test====null") 
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
       
      >
        <DialogTitle className={classes.WindowHeader} id="responsive-dialog-title" sx={{
          pb: 5}}>
          {"Advance Search"}
        </DialogTitle>
        <DialogContent className={classes.WindowHeader}>
            <Grid container spacing={3} >
                <Grid item  xs={6}>
                  <TextField 
                  required
                  className={classes.textfield}
                  id="outlined-error-helper-text"
                  fullWidth style={{background:'white',borderRadius:'5px'}}  
                  label="Document Id" size='small' variant="filled" 
                  defaultValue={doc_id}
                 
                  onChange={(e) => setDocId( e.target.value )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                  fullWidth style={{background:'white',borderRadius:'5px'}}  
                  label="Customer Number" size='small' variant="filled" 
                  defaultValue={cust_number}
                  onChange={(e) => setCNum( e.target.value )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField 
                  fullWidth style={{background:'white',borderRadius:'5px'}}  
                  label="Invoice Id" size='small' variant="filled" 
                  defaultValue={invoice_id}
                  onChange={(e) => setInvId( e.target.value )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                  fullWidth style={{background:'white',borderRadius:'5px'}}  
                  label="Business Year" size='small' variant="filled" 
                  defaultValue={business_year}
                  onChange={(e) => setBYear( e.target.value )}
                  />
                </Grid>
              </Grid>   
        </DialogContent>
        
        <DialogActions className={classes.WindowHeader}>
            <Button 
             fullWidth="true"
             style={{color: "white",border: '1px solid white'}} 
             variant="outlined" onClick = {handleAdvSearch}>SEARCH</Button>
            <Button  fullWidth="true" style={{color: "white",border: '1px solid white'}} onClick={handleClose} variant="outlined">CANCEL</Button>   
        </DialogActions>
      </Dialog>
    </div>
  );
}