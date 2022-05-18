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
import { Grid} from '@material-ui/core';
import {styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';


// COMPONENTS ========================================================
import {AnalyticsData} from '../Services/AnalyticsData'
import  PieChart  from '../Charts/PieChart';
import  BarChart  from '../Charts/BarChart';
const DateInput  = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(0),
    
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 12px',
      margin:"0rem 0 0.8rem 1rem"
      // Use the system font instead of the default Roboto font.
    
    },
  }));
const useStyles = makeStyles(() => ({
  WindowHeader: {
    background: '#2A3E4C',
    color: '#FFFFFF',

  },
  ChartHeader:{
    backgroundColor:'white', 
    color:'#2A3E4C',
  
  }
}))
const initState = {
    s_cdate:'',
    e_cdate:'',
    s_due_date:'',
    e_due_date:'',
    s_base_date:'',
    e_base_date:'',
    invoice_currency:''
  }
export default function AnalyticsDialog({open, setOpen}) {

  const classes = useStyles();

  const [openChart,setChartOpen]=useState(false)
  const [params, setParams] = useState(initState)
  const [data, setData] = useState({})
  const [didSubmit, setSubmit] = useState(false)

  const handleClose = () => {
    setParams(initState)  
    
    setTimeout(() => {
      //setChartOpen(false)
      setOpen(false);  
    }, 1000);
    
    
  }

  useEffect(() => {
    if(!open)
    {
      setChartOpen(false)
    }
  }, [open])

  // const handleQuit = () =>{
  //   setOpen(false);
  // }
  const handleSearch = async () =>{
    setSubmit(true);
    const response = await AnalyticsData(params);
    if(response)
    {
      setData(response);
    }
    
    console.log(response)
  }

  useEffect(() => {
    console.log(data)
    if(didSubmit)
      setChartOpen(true);
  }, [data])



  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));


  

  return (
  <Dialog
    fullScreen={fullScreen}
    aria-labelledby="responsive-dialog-title"      
    open={open} 
    onClose={handleClose}
    style={
      openChart ? {width:'100vw'}: {}
    } >
      {openChart ?
        <div >
          <DialogTitle className={classes.ChartHeader} id="responsive-dialog-title">
            <Box display="flex" alignItems="center">
              <Box flexGrow={1} style={{color:'#2A3E4C'}}> {"Analytics View"}</Box>
              <Box><Button onClick={handleClose}>Close</Button> </Box>
            </Box>            
          </DialogTitle>
          <DialogContent className={classes.ChartHeader} >
            <Grid container  >         
                <Grid item xs={6} sm={6} >
                  <BarChart b_code_data={data.businessAnalytics} />
                </Grid>
                <Grid item xs={6} sm={6}>
                    <PieChart b_code_data={data.currencyAnalytics} />
                </Grid>            
            </Grid>   
          </DialogContent>
        </div>
      :
    <div>
      <DialogTitle className={classes.WindowHeader} id="responsive-dialog-title">
        {"Analytics View"}
      </DialogTitle>
      <DialogContent className={classes.WindowHeader}>
      <Grid container >           
          <Grid item  xs={6} sm={6}>
              <InputLabel shrink htmlFor="date-input" style={{color:"white"}}>
              Clear date
              </InputLabel>
              <DateInput onChange={(e)=>setParams({...params, s_cdate: e.target.value})} fullWidth defaultValue="react-date" id="date-input" type="date" />
              <DateInput onChange={(e)=>setParams({...params, e_cdate: e.target.value})} fullWidth defaultValue="react-date" id="date-input" type="date" />  
          </Grid>
          <Grid item xs={6} sm={6}>
              <InputLabel shrink htmlFor="date-input" style={{color:"white"}}>
                Due date
              </InputLabel>
              <DateInput onChange={(e)=>setParams({...params, s_due_date: e.target.value})} fullWidth defaultValue="react-date" id="date-input" type="date" />
              <DateInput onChange={(e)=>setParams({...params, e_due_date: e.target.value})} fullWidth defaultValue="react-date" id="date-input" type="date" />
          </Grid>
          <Grid item xs={6} sm={6}>
              <InputLabel shrink htmlFor="date-input" style={{color:"white"}}>
                Baseline Create date
              </InputLabel>
              <DateInput onChange={(e)=>setParams({...params, s_base_date: e.target.value})} fullWidth defaultValue="react-date" id="date-input" type="date" />
              <DateInput onChange={(e)=>setParams({...params, e_base_date: e.target.value})} fullWidth defaultValue="react-date" id="date-input" type="date" />
          </Grid>
          <Grid item xs={6} sm={6}>
              <InputLabel shrink htmlFor="date-input" style={{color:"white"}}>
                Invoice Currency
              </InputLabel>
              <DateInput onChange={(e)=>setParams({...params, invoice_currency: e.target.value})} fullwidth placeholder='Invoice Currency' id="date-input"/>
          </Grid>
      </Grid>   
      </DialogContent>

      <DialogActions className={classes.WindowHeader}>
          <Button  fullWidth={true} style={{color: "white",border: '1px solid white'}} variant="outlined" onClick={()=>{handleSearch()}}>SUBMIT</Button>   
              
          <Button onClick={() => handleClose()} fullWidth={true} style={{color: "white",border: '1px solid white'}} variant="outlined">CANCEL</Button>
      </DialogActions>
    </div>
  }
  </Dialog>
  );
}