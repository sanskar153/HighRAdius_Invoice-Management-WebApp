import * as React from 'react';
import {makeStyles} from '@material-ui/core';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Typography } from '@material-ui/core';
const useStyle=makeStyles({
    link:{
        marginBottom:"1rem",
       
    },
  });
  
export const Footer=()=>{
    const classes =useStyle();
    
    return(
        <>
            <Box display="flex" style={{width:"100%",flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'}}>
                <div >
                    <Link m="auto" className={classes.link}  underline="always"> {'Privacy Policy.'}</Link>
                </div>
                <Typography style={{ color: 'white' ,margin:'0'}}>
                 | <span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> 2022 Highradius Corporation. All Rights Reserved.
                </Typography>
            </Box>
         
        </>
    );
};
export default Footer;