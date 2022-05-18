import {TableCell,TableHead,TableRow,TableSortLabel,Checkbox, makeStyles} from '@material-ui/core';
const useStyle = makeStyles({
    
    tableCell: {
            color: "white",
            position: "sticky",
            top: 0
        },
        tableCellText: {
        '&$active': {
            color: "white",  
        },
        "&:hover": {
           color: "#d2d2d2"
          }
        },
        active: {},
      
        
});
const colName = [
    { id: "sl_no", numeric: false,label: "Sl No" },
    { id: "business_code", numeric: true, label: "Business Code", },
    { id: "cust_number", numeric: true, label: "Custumer Number", },
    { id: "clear_date", numeric: true, label: "Clear_Date"},
    { id: "doc_id", numeric: true, label: "Document Id", },
    { id: "posting_date", numeric: true, label: "Posting Date", },
    { id: "doc_create_date", numeric: true,label: "Document Create Date" },
    { id: "due_date", numeric: true, label: "Due_Date", },
    { id: "invoice_currency", numeric: true,label: "Invoice Currency" },
    { id: "doc_type", numeric: true, label: "Doc Type", },
    { id: "posting_id", numeric: true, label: "Posting ID", },
    { id: "total_open_amount", numeric: true, label: "Total Open Amount", },
    { id: "baseline_create_date", numeric: true, label: "Baseline Create date", },
    { id: "cust_payment_terms", numeric: true, label: "Cust Payment Terms", },
    { id: "invoice_id", numeric: true,label: "Invoice id" },
    { id: "aging_bucket", numeric: true,label: "Aging bucket" },
    
  ];
export default function TableHeader(props){
    const{
        classes,
        valueToOrderBy,
        orderDirection,
        numSelected,
        onSelectAllClick,
        handleRequestSort,
        rowCount
    }=props;
    const classS =useStyle();
    //console.log(numSelected)
    //function that wrap itself as another function
    const createSortHandler = (property) => (event) => {
        //we are sending a event and a property
        handleRequestSort(event,property)

    }
    return (
        <TableHead >
            <TableRow>              
                <TableCell style={{color:"white",backgroundColor:"#283d4a" }} padding="checkbox" className={classes.head}>
                    <Checkbox   
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={onSelectAllClick}
                    inputProps={{ 'aria-label': 'select all list' }}
                    />
                </TableCell>
                {colName.map((colName) => (
            
                <TableCell className={classS.tableCell} style={{color:"white",backgroundColor:"#283d4a"}} align="left" key={colName.id} padding={colName.disablePadding ? "none" : "normal"}>
                    <TableSortLabel 
                    
                    active = {valueToOrderBy === colName.id} 
                    direction = {valueToOrderBy === colName.id ? orderDirection:'asc'}
                    classes={{root: classS.tableCellText, active: classS.active }}
                    onClick = {createSortHandler(colName.id)}
                    >
                        {colName.label}
                        {valueToOrderBy === colName.id ? (
                        <span className={classes.visuallyHidden}>
                        { orderDirection === "desc" ? "sorted descending" : "sorted ascending"}
                        </span>
                    ) : null}
                    </TableSortLabel>
                </TableCell>     
                ))}
            </TableRow>
        </TableHead>
      );
}
    

