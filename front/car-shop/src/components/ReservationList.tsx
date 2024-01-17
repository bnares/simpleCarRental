import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import agent from '../api/agent';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

interface Column {
    id: 'carBrand' | 'carName' | 'productionYear' | 'odometer' | 'dateFrom' | 'dateTo' | 'overallPrice' | 'username';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: readonly Column[] = [
    { id: 'carBrand', label: 'Car Brand', minWidth: 170 },
    { id: 'carName', label: 'Car Name', minWidth: 150 },
    {
      id: 'productionYear',
      label: 'Production Year',
      minWidth: 100,
      align: 'right',
      format: (value: number) => value.toLocaleString(),
    },
    {
      id: 'odometer',
      label: 'Odometer',
      minWidth: 150,
      align: 'right',
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: 'dateFrom',
      label: 'Date From',
      minWidth: 100,
      align: 'right',
      format: (value: number) => value.toFixed(2),
    },
    {
        id: 'dateTo',
        label: 'Date To',
        minWidth: 100,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'overallPrice',
        label: 'Overall Price',
        minWidth: 100,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'username',
        label: 'Username',
        minWidth: 100,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    { id: 'action', label: 'Delete', minWidth: 80 },
  ];
  
  interface Data {
    carBrand: string;
    carName: string;
    productionYear: number;
    odometer: number;
    dateFrom: string;
    dateTo: string;
    overallPrice: number,
    username: string,
    action: React.ReactNode,
  }
  

  

function ReservationList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const auth = useAuth();
    const navigate = useNavigate();
    const [reservationData, setReservationData] = React.useState<[]>([]);
    const [tableRows, setTableRows] = React.useState<Data[]>([]);

    React.useEffect(()=>{
        if(auth.contextData?.token){
            agent.user.allReservation(auth.contextData?.token).then((data)=> setReservationData(data)).catch((e)=>console.warn(e));
        }else{
            navigate("/not-found");
        }
    },[])

    React.useEffect(()=>{
        if(reservationData.length>0){
            var dataRow : Data[] = [];
            reservationData.map((item , idx)=>{
                var row : Data = {
                    carBrand: item?.car?.brand, 
                    carName: item.car.name, 
                    productionYear: item.car.productionYear, 
                    odometer: item.car.odometer, 
                    dateFrom: item.dateFrom, 
                    dateTo: item.dateTo, 
                    overallPrice: item.price, 
                    username: item.user.userName, 
                    action: 
                    <Tooltip title={item.car.name ? `Delete ${item.car.name}`: "Delete"}>
                        <IconButton color='error' aria-label="delete" size="large" onClick={()=>handleDeleteReservation(item.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    };
                dataRow.push(row);
            })
            setTableRows(dataRow);
        }
    },[reservationData])

    const handleDeleteReservation = (id: number)=>{
        if(auth.contextData?.token){
            agent.user.deleteReservation(id, auth.contextData?.token).then((e)=>console.warn(e));
            agent.user.allReservation(auth.contextData?.token).then((data)=> setReservationData(data)).catch((e)=>console.warn(e));
        }else{
            navigate("/not-found");
        }
        
    }
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    console.log("allReservation: ", reservationData);
    return (
        

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {(reservationData.length >0 && tableRows.length>0) ? (
                <>
                <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableRows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={tableRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              </>
            ) : (<p>No Reservation</p>)
                
            }
        
      </Paper>
      
    );
  
}

export default ReservationList