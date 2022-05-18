import {makeStyles} from '@material-ui/core';

import hrclogo from '../assets/HRCLogo.svg';
import abclogo from '../assets/ABCLogo.svg';
import Box from '@mui/material/Box';
import { Grow } from '@mui/material';
const useStyle=makeStyles({
  // main_nav :{
  //   display: 'flex',
  //   justifyContent:'spaceBetween',
  //   alignItems: 'center',
  //   flexWrap: 'wrap',
  //   margin: '0.3rem',
  
  // },
  alogo:{
    maxWidth: '230px',
  },
  hlogo:{
    maxWidth: '200px',
   
  },
  list:{
    display: 'inline-block',
    color: 'white',
    marginLeft:'2.2rem',
    padding:'0rem 0.7rem 0.5rem 0'
  }
})
export const NavBar = () => {

  const classes =useStyle();
  
  return (
      <>
      <nav >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexGrow:1,
          p: 2, 
          ml:2 
        }}
      >
       <img src = {abclogo} alt = "ABC logo" className={classes.alogo}/>
        <img src = {hrclogo} alt = "HRC logo" className={classes.hlogo} /> 
       
        <img src = {hrclogo} style={{visibility:"hidden "}}alt = "Empty image" className={classes.hlogo} /> 
      </Box>      
      </nav>
       <h3 className={classes.list}>Invoice List</h3>
      </>
      
  );
};
export default NavBar;