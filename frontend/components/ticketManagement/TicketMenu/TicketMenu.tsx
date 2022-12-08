
'use client';

// import { Table } from '@mui/material';
import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef, MuiEvent, GridRowParams, getGridStringOperators, GridFilterItem, GridRenderCellParams } from '@mui/x-data-grid';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchRows, selectTicket, deleteTicketFromMenu } from '../../../store/slice/ticketManagementSlice';
import { useRouter } from 'next/router'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: theme.palette.secondary.main,
        '& h2': {
            backgroundColor: '#12344d',
            color: 'white'
        }
    },
    vSpace: {
        margin: theme.spacing(2, 0)
    },


}));

export default function TicketMenu() {
    const stateRows: any = {}
    const [openDialog, setDialog] = useState({ state: false, stateRows });
    const dispatch: any = useDispatch();
    const classes = useStyles();
    const [pageSize, setPageSize] = useState<number>(10);

    let columns: GridColDef[] = [
        { field: 'customer', headerName: 'Contact', sortable: false ,flex: 0.25 },
        { field: 'subject', headerName: 'Subject', flex: 0.5 , sortable: false , align:'center' , headerAlign:'center' },
        { field: 'agent', headerName: 'Agent', sortable: false ,flex: 0.25,  align: 'center' , headerAlign:'center' },
        { field: 'state', headerName: 'State', sortable: false , align:'center', headerAlign:'center'},
        // { field: 'group', headerName: 'Group', sortable: false , align:'center', headerAlign:'center'},
        { field: 'priority', headerName: 'Priority', sortable: false , align:'center' , headerAlign:'center'},
        { field: 'status', headerName: 'Status', sortable: false , align:'center', headerAlign:'center'},
        {
            field: 'modify', headerName: 'Modify', sortable: false,
            renderCell: (params: GridRenderCellParams<any>) => (
                <>
                    <IconButton
                        sx={{
                            color: '#12344d',
                            zIndex: 100,
                            // margin : '5px'
                        }}
                        onClick={() => rowClicked(params)}
                    >
                        <RemoveRedEyeIcon />

                    </IconButton>
                    <IconButton
                        sx={{
                            color: '#12344d',
                            zIndex: 100
                        }}
                        onClick={() => setDialog({ state: true, stateRows: params })}
                    >
                        <DeleteIcon />
                    </IconButton>
                </>

            ),
        },
    ];

    let [rows, filterStateChange] = useSelector((state: any) => [
        state.ticketManagement.rows,
        state.ticketManagement.filterState
    ], shallowEqual);

    const rowClicked = (gridParams: any) => {
        // event.preventDefault();
        dispatch(selectTicket(gridParams.row.id));
        // router.push({
        //     pathname: `/ticket-management/ticket/[id]`,
        //     query: { id: gridParams.row.id },
        //   })
        // router.push({query: {page: 1}}, undefined, { shallow: true });
    }

    const deleteTicket = (gridParams: any) => {
        dispatch(deleteTicketFromMenu({ id: gridParams.row.id }));
        setDialog({ state: false, stateRows: {} });
    }
    return (

        <>

            <div className="TableListMainSection">

                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid

                            disableColumnFilter
                            rows={rows}
                            columns={columns}
                            autoHeight
                            rowsPerPageOptions={[5, 10, 20]}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            pagination
                            sx={{
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: "#12344D",
                                    color: "white",
                                    fontSize: 16,
                                    borderRight: 'none'
                                },
                                "& .MuiDataGrid-iconSeparator": {
                                    color: 'white'
                                },
                                "& .MuiDataGrid-menuIcon": {
                                    '& .MuiSvgIcon-root': {
                                        color: 'white'
                                    }
                                },
                                '.MuiDataGrid-columnSeparator': {
                                    display: 'none',
                                },

                            }}
                        />
                    </div>
                </div>

            </div>

            <Dialog
                open={openDialog.state}
                onClose={() => setDialog({ state: false, stateRows: {} })}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={classes.root}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Ticket#"}{openDialog.stateRows.id}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to permanently delete this ticket ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialog({ state: false, stateRows: {} })}>Cancel</Button>
                    <Button onClick={() => deleteTicket(openDialog.stateRows)} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>


        </>

    )
}