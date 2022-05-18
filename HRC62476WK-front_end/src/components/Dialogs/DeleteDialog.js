import * as React from 'react';
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
import {url} from '../Services/Api'
const useStyles = makeStyles((theme) => ({
  WindowHeader: {
    background: '#2A3E4C',
    color: '#FFFFFF',
},
}))
export default function DeleteDialog(props) {
  const {open,setOpen,selected,setSelected}=props;
  //console.log(selected.length)
  const classes = useStyles();
  const handleClose = () => { 
    setOpen(false);
  }
  const deleteInvoice = async (e,selected)=>{
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
    if(selected.length!==0){
      fetch(url+"/DeleteInvoice", config)
      .then((res) => res.json())
      toast.warning('Oopps your data deleted', {
        position: toast.POSITION.TOP_CENTER, autoClose:1000})
        handleClose();
    }
    else{
      toast.error('Something  wrong, please try again', {
        position: toast.POSITION.TOP_CENTER, autoClose:1000})    
    }   
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
              Are you sure you want to detele these record[s]?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.WindowHeader}>
            <Button  fullWidth="true" style={{color: "white",border: '1px solid white'}} onClick={handleClose} variant="outlined">CANCEL</Button>
            <Button fullWidth="true" style={{color: "white",border: '1px solid white'}} onClick={e=>deleteInvoice(e,selected)} variant="outlined">DELETE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
