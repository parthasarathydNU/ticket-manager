import * as React from 'react';
import { useEffect } from 'react';
import styles from "./_ticketManagement.module.scss";
import TicketMenu from './TicketMenu/TicketMenu';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { openFilterDrawer, defaultFilterDropdown, commonSortFilters, unselectTicket, fetchRows, getAllUserDetails } from '../../store/slice/ticketManagementSlice';
import FilterScreen from './FilterScreen/FilterScreen';
import * as state from '../../service/ticket-management/ticket-management-service';
import { Autocomplete, IconButton, TextField } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import { setCurrentView } from '../../store/slice/appSlice';

import Ticket from './Ticket/Ticket';

const useStyles = makeStyles(() => (state.Autocomplete));

function TicketManagement() {

    const dispatch : any = useDispatch()

    useEffect(() => {
        dispatch(unselectTicket())
        // dispatch(defaultFilterDropdown({}));
        dispatch(fetchRows());
        dispatch(setCurrentView("Ticket Management"));
        // dispatch(getAllUserDetails());

    }, []);

    const [filterDrawerState, sortFilters, ticketSelected , filterState] = useSelector((state: any) => [
        state.ticketManagement.filterDrawerOpen,
        { ...state.ticketManagement.sortFilters },
        state.ticketManagement.ticketSelected ,
         state.ticketManagement.filterState
    ]);

    let sortOrder: any = ['Asc', 'Desc'];

    let [ sort , setSort] = React.useState(sortFilters);

    const classes = useStyles();


    const handleDrawerOpen = () => {
        dispatch(openFilterDrawer({ filterDrawerOpen: filterDrawerState }));
    }

    const CloseFilterDrawer = () => {
        dispatch(openFilterDrawer({ filterDrawerOpen: true }));
    }


    const handleSortTable = (value: any) => {
        // sortFilters['type'] = value;
        // sortFilters['order'] = sortFilters['order'];
        sort.type = value;
        setSort(sort)
        dispatch(commonSortFilters({sortFilters : sort}));
    }

    const handleSortOrder = (newValue: any) => {
        // sortFilters['type'] = sortFilters['type'];
        // sortFilters['order'] = value;
        // sort.order = value;
        sort = {
            type : sort.type,
            order : newValue
        }
        setSort(sort);
        dispatch(commonSortFilters({sortFilters : sort}));
    }

    return (

        <>
            {(!ticketSelected)
                ?
                (
                    /* Components Needed
        - Nav Options -
        -  List of Tickets - card View Table View
        - Mock Data for Tickets
        - Possible Filters
         */
                    <div className={styles.TicketMangement}>

                        <div className={styles.TicketHeader}>
                            {/* checkbox sort by , dropdown , filter Screen Button  */}
                            <div className={styles.SortSection}>
                                <span>Sort By : &nbsp;</span>

                                <Autocomplete

                                    id="tags-standard"
                                    onChange={(event: any, newValue: any) => {
                                        handleSortTable(newValue);
                                    }}
                                    fullWidth
                                    disableClearable

                                    classes={{ inputRoot: classes.inputRoot }}
                                    options={state.sortByDropdown}
                                    value = {sort['type']}
                                    sx={{ width: '200px', fontSize: '12px' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Sort by"
                                        />
                                    )}
                                />

                                <Autocomplete
                                    id="tags-standard"
                                    fullWidth
                                    disableClearable
                                    onChange={(event: any, newValue: any) => {
                                        handleSortOrder(newValue);
                                    }}
                                    classes={{ inputRoot: classes.inputRoot }}
                                    options={sortOrder || []}
                                    value = {sort['order']}
                                    sx={{ width: '125px', padding: '5px' }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Sort Order"
                                        />
                                    )}
                                />
                            </div>

                            <div className='FilterScreen'>
                                <div className={filterState ?styles.RedIcon : ""}></div>
                                <Button
                                    variant="contained"
                                    onClick={handleDrawerOpen}
                                    sx={{
                                        color: 'white',
                                        // boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                        // background: '#12344D',
                                        ':hover': {
                                            // bgcolor: '#ECEFF3', // theme.palette.primary.main
                                            color: 'white',
                                        },

                                    }}
                                >
                                    <KeyboardDoubleArrowRightIcon sx={{
                                        color: 'white',
                                        ':hover': {
                                            color: '#12344D',
                                        },
                                    }} />
                                    Filter</Button>

                            </div>

                        </div>
                        <div>

                            {/* Component to Show Tickets either in Card / Ticket View  */}
                            <TicketMenu></TicketMenu>
                        </div>
                        <div>
                            <Drawer
                                PaperProps={{
                                    sx: {
                                        width: '28%',
                                        top: '17%',
                                        backgroundColor: '#ebeff3',
                                        color: 'black',
                                        boxShadow: 'rgb(0 0 0 / 25%) 0px 54px 55px, rgb(0 0 0 / 12%) 0px -12px 30px, rgb(0 0 0 / 12%) 0px 4px 6px, rgb(0 0 0 / 17%) 0px 12px 13px, rgb(0 0 0 / 9%) 0px -3px 5px'
                                    }
                                }}
                                variant="persistent"
                                anchor="right"
                                open={filterDrawerState}
                                onClose={handleDrawerOpen}
                            >
                                <div>
                                    <IconButton
                                        sx={{
                                            position: 'absolute',
                                            color: 'white',
                                            top: '15px',
                                            left: '13px',
                                            zIndex: 100
                                        }}
                                        onClick={CloseFilterDrawer}
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                </div>
                                <FilterScreen></FilterScreen>
                            </Drawer>
                        </div>


                    </div>
                )
                :
                (<Ticket />)
            }
        </>

    )
}

export default TicketManagement;