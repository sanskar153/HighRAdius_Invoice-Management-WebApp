import { useState ,useEffect} from "react";
import {Paper,Button,Grid,TableCell,TableContainer,TableRow,makeStyles,Table, TablePagination, Checkbox,useMediaQuery,} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import { TableBody, Typography } from "@mui/material";
import FormControl from '@material-ui/core/FormControl';
import RefreshIcon from '@material-ui/icons/Refresh';
import ButtonGroup from '@mui/material/ButtonGroup';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';

import { getComparator,sortedRowInfo,descendingComparator } from "../Services/utils";
import { getData} from "../Services/Api";
import TableHeader from "./TableHeader";
import { getAgeBucket, editPredictData } from '../Services/PredictData';

import AdvSearchDialog from "../Dialogs/AdvSearchDialog"
import DeleteDialog from "../Dialogs/DeleteDialog"
import EditDialog from "../Dialogs/EditDialog"
import AddDialog from "../Dialogs/AddDialog";
import AnalyticsDialog from "../Dialogs/AnalyticsDialog";



const useStyles=makeStyles(theme=>({
  root:{
    margin: "0.1rem auto",
      width: "96%",
    
      color: theme.palette.common.white,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginBottom: "0",
      },
      marginBottom: theme.spacing(2),
      color:'white',
     
      backgroundColor: "#283D4A",
  },   
      visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 0,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
      },
    
      customTableContainer: {
        overflowX: "initial"
      },
    table: {
      // "& .MuiTableCell-sizeSmall": {
      //   padding: "0px 24px 0px 16px" // <-- arbitrary value
      // },
        minWidth: 600,
        // marginLeft:"-0.9rem",
        maxHeight:300
        
      },
      Grid: {
        display: "flex",  
        flexDirection: "column",
      },
      search:{
        borderRadius:'5px',
        height:'40px'
      },
      sLabel:{
        backgroundColor:"white",
        borderRadius:'5px',
        marginLeft:'1rem'
     
      },
      input1: {
        height: 40
      },
      selectDropdown: { color: "#fff", backgroundColor: "#2D4250" },
      menuItem: {
        "&:hover": {
          backgroundColor: "#3b3f58"
        }
      },
      customTableContainer: {
        overflowY: "initial",
        maxHeight:"200",
        height: 300,
        width: '100%',
        // marginTop: theme.spacing.unit * 3,
        overflow: 'auto',
        //backgroundColor:"red"
      },
   
  }))

export default function TableContent(){
    const [invoice,setList]=useState([]);
    const [isLoading, setLoading] = useState(false);
    const [selected, setSelected] = useState([]);
    const [ selectedInvoiceDetails, setSelectedInvoiceDetails ] =useState({});
    const[orderDirection,setOrderDirection]=useState('asc');
    //this is for the column value which is active right now
    const[valueToOrderBy,setvalueToOrderBy]=useState('sl_no');
   
    const [rowCount, setRowCount] = useState(700)  
    //current page number
    const[page,setPage]=useState(0);
    const[rowsPerPage,setRowsPerPage]=useState(10);

    const [ openAnalyticsDialog, setOpenAnalyticsDialog ] = useState(false);
    const [ openAdvSearchDialog, setOpenAdvSearchDialog ] = useState(false);
    const [ openAddDialog, setOpenAddDialog ] = useState(false);
    const [ openDeleteDialog, setOpenDeleteDialog ] = useState(false);
    const [ openEditDialog, setOpenEditDialog ] = useState(false);
   
    
    
    const [searchParams, setSearchParams] = useState({
      doc_id: null,
      c_num : null,
      inv_id : null,
      b_year : null
     })
     //====== FOR SORTING AND PAGINATION ======//

    const handleRequestSort = (event, property) => {
      const isAsc = (valueToOrderBy === property && orderDirection === 'asc')
      setvalueToOrderBy(property)
      setOrderDirection(isAsc ? 'desc' : 'asc')
    }

    const handleChangePage=(event ,rowPage)=>{
        setPage(rowPage)
        //console.log(rowPage)
    }
    const handleChangeRowsPerPage=(event)=>{
        setRowsPerPage(parseInt(event.target.value),10)
        setPage(0)
    }
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = invoice.map((n) => n.sl_no);
        setSelected(newSelecteds);
        console.log(newSelecteds)
        return;
      }
      setSelected([]);
    };
    const handleClick = (event, sl_no) => {
      const selectedIndex = selected.indexOf(sl_no);
      //selectedIndex=-1
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, sl_no);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      setSelected(newSelected);
    };
    

    const classes=useStyles();
    const matches = useMediaQuery("(max-width: 500px)");
    const isSelected = (sl_no) => selected.indexOf(sl_no) !== -1;
    const isDisabledEditButton = (selected.length !== 1);
    const isDisabledDeleteButton = (selected.length < 1);
     const emptyRows = rowsPerPage - Math.min(rowsPerPage, invoice.length - page * rowsPerPage);

    // ======= TO HANDLE DIALOGS FOR DIFFERENT BUTTONS======//
  
    const handleAnalyticsInvoice = () => {
      setOpenAnalyticsDialog(true);
    }
    const handleAdvSearchInvoice = () => {
      setOpenAdvSearchDialog(true);
      setLoading(false);
      console.log("adv",isLoading)
    }
    const handleAddInvoice = () => {
      setOpenAddDialog(true);
    }
    
    const handleEditInvoice = () => {
      setOpenEditDialog(true);
    }

    const handleDeleteInvoice = () => {
      setOpenDeleteDialog(true);
    
    }

    const handlePredict = async () => {
        
      var doc_id = []; var tempObject =[], rowData=[]
      console.log(selected)
      selected.forEach(index =>{
          var selectedPredictRow = invoice.filter((row) =>
                  (row.sl_no) == index
          );
          selectedPredictRow = selectedPredictRow[0]
          doc_id.push(parseInt(selectedPredictRow.doc_id))
          rowData.push(selectedPredictRow)
      })
      
      const res = await getAgeBucket(doc_id)
      console.log(res)
      // var newData = data; 
      for (const result of res){
          
          const d_id = result.doc_id.split(".")
          var predictedRow = rowData.filter((row) =>
                  (row.doc_id) == d_id[0]
              );
              
          predictedRow = predictedRow[0]
          
          // newData[ind].aging_bucket = result.aging_bucket
          tempObject.push({
              sl_no: predictedRow.sl_no,
              aging_bucket: result.aging_bucket
          })
          
      }
      
      // setData(newData)
      editPredictData(tempObject).then(()=>getInvoiceList(1))
  
}
    //========== FETCHING DATA FROM DATABASE ==========/
    const getInvoiceList = (option) =>{
      setLoading(true);
      const limit = (500)*rowsPerPage;
    
      const response = getData(option ? Math.max(invoice.length, limit) : limit, option ? 0 : invoice.length ,searchParams );
        response.then((e)=>{
            if(option === 2) { setPage(0) }
            option === 0 ?  setList([...invoice, ...e.data]) : setList(e.data) ;
      //      console.log(e.rows)
            setRowCount(e.rows);
        })
      }

    useEffect(() => {
      getInvoiceList();
    }, []);
     
    useEffect(() => {
      if(invoice.length <= (Math.min((page+1)*rowsPerPage, rowCount)) == true)
      {          
          getInvoiceList(0);
      }
      
    }, [page, rowsPerPage])

    useEffect(() =>{
        if(invoice.length || rowCount==0)
            setLoading(false)
            //console.log(invoice);
        
    }, [invoice])
    useEffect(() => {
      getInvoiceList(2);
    }, [searchParams])
     
    useEffect(() => {
      setSelectedInvoiceDetails(invoice.filter(invoice => selected.indexOf(invoice.sl_no) !== -1));
    }, [ selected ])
    useEffect(()=>{
      if(rowCount==0)
          {
            setLoading(false)
          }
    },[rowCount])
    
    return (
      <>        
        <Paper elevation={3} className={classes.root} sx={{ width: '100%', overflow: 'hidden',}}> 
          <Grid container
              direction="row"
              justifyContent={matches ? "center" : "space-between"}
              alignItems="flex-start"
          >
            <Grid item style={{ padding: "1rem" }}>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button 
                style={{ width: "25vh",color: "white",backgroundColor:"#2196f3" }} 
                color="primary" variant="contained"
                onClick={()=>{handlePredict();console.log("tes")}}
                >PREDICT</Button>
                <Button style={{color: "white" }} color="primary" variant="outlined" onClick={handleAnalyticsInvoice}>ANALYTICAL VIEW</Button>
                <Button 
                  style={{color: "white" }} 
                  color="primary" variant="outlined"
                  onClick={handleAdvSearchInvoice}                 
                >ADVANCE SEARCH
                </Button>
                <Button 
                    style={{marginLeft: "0.5rem",color: "white" }} 
                    color="primary" variant="outlined" 
                    onClick={() => { getInvoiceList(1)}}
                ><RefreshIcon/>
                </Button>          
                <FormControl className={classes.sLabel}>
                <TextField InputProps={{
                    className: classes.input1
                  }}
                  InputLabelProps={{
                    style: {
                        top: '-5px'
                    },
                  }}
                    style={{background:'white',borderRadius:'5px'}} 
                    size="small" id="filled-basic" 
                    label="Search Customer Id" variant="filled" 
                    onChange={(e)=>{                           
                      console.log(invoice.length)
                      if(e.target.value.length===9 || e.target.value.length===0) 
                        setSearchParams({...searchParams, c_num: e.target.value})                              
                      }
                    }                         
                />
                                     
                </FormControl>
                </ButtonGroup> 
                <Button 
                  style={{marginLeft: "2vh",width: "20vh",color: "white"}} 
                  color="primary" variant="outlined"
                  onClick={handleAddInvoice}
                >ADD
                </Button>
                <Button 
                  style={{width: "20vh",color: "white" }} 
                  color="primary" variant="outlined"
                  onClick={handleEditInvoice}
                  disabled={isDisabledEditButton}
                >EDIT
                </Button>
                <Button 
                  style={{width: "20vh",color: "white" }} 
                  color="primary" variant="outlined"
                  onClick={()=>{handleDeleteInvoice();setTimeout(function() { setSelected([]); }, 6000)}}
                  disabled={isDisabledDeleteButton}
                >DELETE
                </Button>
                <AnalyticsDialog 
                  open={openAnalyticsDialog}
                  setOpen={setOpenAnalyticsDialog}/>
                <AdvSearchDialog 
                  open={openAdvSearchDialog} 
                  setOpen={setOpenAdvSearchDialog} 
                  params={searchParams} 
                  setSearchParams={setSearchParams}                                     
                />  
                <AddDialog 
                  open={openAddDialog} 
                  setOpen={setOpenAddDialog} 
                />  
                <EditDialog 
                  open={openEditDialog} 
                  setOpen={setOpenEditDialog} 
                  selectedInvoice={selectedInvoiceDetails}            
                />   
                <DeleteDialog 
                  open={openDeleteDialog} 
                  setOpen={setOpenDeleteDialog} 
                  selected={selected}  
                />                                          
            </Grid>              
            {/* <TextField id="outlined-basic" label="Filled" variant="outlined" /> */}
          </Grid>
          <TableContainer sx={{ maxHeight: 200 }} className={classes.customTableContainer}>
              <Table sx={{         
            '& .MuiTableHead-root': {
              backgroundColor: 'red',
            },
          }} stickyHeader  className={classes.table} size='small' aria-labelledby="tableTitle" style={{maxHeight:"300px"}}> 
                  <TableHeader 
                    classes={classes}
                    style={{ backgroundColor: 'blue' }}
                    numSelected={selected.length}
                    valueToOrderBy={valueToOrderBy}
                    orderDirection={orderDirection}
                    onSelectAllClick={handleSelectAllClick}
                    handleRequestSort={handleRequestSort}
                    rowCount={invoice.length}
                  
                  />                                          
                  <TableBody style={{maxHeight:"200",overflowY:"auto"}}>
                  {                        
                      sortedRowInfo(invoice, getComparator(orderDirection,valueToOrderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((invoice,index) =>{
                        const isItemSelected = isSelected(invoice.sl_no)
                        const labelId = `enhanced-table-checkbox-${index}`
                        return (
                                                      
                          <TableRow 
                             
                              hover
                              onClick={(event) => handleClick(event, invoice.sl_no)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={invoice.sl_no}
                              selected={isItemSelected}
                          >
                              <TableCell padding="checkbox"> <Checkbox
                                  checked={isItemSelected}
                                  inputProps={{ 'aria-labelledby': labelId }}
                                />
                              </TableCell>
                              <TableCell id={labelId} style={{ padding:"0 3px 0 12px"}} align="left">{invoice.sl_no}</TableCell>
                              <TableCell  align="left">{invoice.business_code}</TableCell>
                              <TableCell align="left">{invoice.cust_number}</TableCell>
                              <TableCell align="left" >{invoice.clear_date}</TableCell>
                              <TableCell align="left">{invoice.doc_id}</TableCell>
                              <TableCell align="left">{invoice.posting_date}</TableCell>
                              <TableCell align="left">{invoice.document_create_date}</TableCell>
                              <TableCell align="left">{invoice.due_in_date}</TableCell>
                              <TableCell align="left">{invoice.invoice_currency}</TableCell>
                              <TableCell align="left">{invoice.document_type}</TableCell>
                              <TableCell align="left">{invoice.posting_id}</TableCell>
                              <TableCell align="left">{invoice.total_open_amount}</TableCell>   
                              <TableCell align="left">{invoice.baseline_create_date}</TableCell>                
                              <TableCell align="left">{invoice.cust_payment_terms}</TableCell>
                              <TableCell align="left">{invoice.invoice_id}</TableCell>
                              {/* <TableCell align="center">{isNaN(invoice.aging_bucket) ? "N/A": invoice.aging_bucket}</TableCell> */}
                              <TableCell align="center">{invoice?.aging_bucket?.length>0 ? invoice.aging_bucket:"N/a"}</TableCell>
                          </TableRow>
                          
                        )

                      })}
                      {/* {invoice.length && (<div style={{alignItems: "center",width: "100vw"}}>
                          <Typography style={{marginRight:"1rem"}}>No data,enter valid customer id</Typography> 
                          <LinearProgress />         
                          </div>)} */}
                        {isLoading && (
                          <TableRow >
                            <div style={{width: "100vw"}}>
                              <LinearProgress />         
                            </div>
                            <div style={{display: "flex", justifyContent: "center",alignItems: "center",padding:"3rem"}}>
                                <Typography style={{marginRight:"1rem"}}>Invoice data is loading,please wait</Typography> 
                                <CircularProgress />                               
                            </div>                           
                          </TableRow>)
                     //   :[]
                        }
                       
                        {/* {emptyRows === 0 && isLoading===false?
                            <TableRow
                              style={{
                                height:  10 * emptyRows,
                              }}
                            >
                               <div style={{display: "flex", justifyContent: "center",alignItems: "center",padding:"3rem"}}>
                                <Typography style={{marginRight:"1rem"}}>Invoice data is loading,please wait</Typography> 
                                <CircularProgress />                               
                            </div>   
                            <TableCell colSpan={6} />
                          </TableRow>
                        :[]}                          */}

                  </TableBody>                   
              </Table>               
          </TableContainer>
         
          
          
          <div>
          <Typography style={{margin:"0.5rem 0 0rem 1rem"}}>{selected.length} rows selected</Typography>
          <TablePagination
              rowsPerPageOptions={[10,20,50,100]}
              component="div"
              count={rowCount}
              style={{marginTop:"-2rem"}}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                MenuProps: { classes: { paper: classes.selectDropdown } }
              }}
              classes={{ menuItem: classes.menuItem }}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
          />
          </div>
          
            
       
        </Paper>
      </>
    )
}
    

