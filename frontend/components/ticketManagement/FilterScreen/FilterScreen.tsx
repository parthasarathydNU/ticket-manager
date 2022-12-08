import { Button, Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './_filterScreen.module.scss';
import { makeStyles } from '@material-ui/core/styles';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { saveSelectedFilter } from '../../../store/slice/ticketManagementSlice';
import * as state from '../../../service/ticket-management/ticket-management-service';



const useStyles = makeStyles(() => (state.Autocomplete));

function FilterScreen() {

    /**
     * Filter Screen will perform Column Customer Filter
     * Combination of filters will be return ticket Data
     * If Filters applied , a small red dot appears on top of the button  ,if filters are empty 
     * the red dot will disappear
     */

    const classes = useStyles();
    const dispatch: any = useDispatch();

    let [dropDownValues, selectedFilters] = useSelector((state: any) => [
        { ...state.ticketManagement.dropDownValues },
        {...state.ticketManagement.selectedFilters},
        state.ticketManagement.filterState ,

    ], shallowEqual);

// To set Dropdown Values
    const inputEvent = (type: any, value: any) => {
        selectedFilters[type] = value;

    }

// Apply filters will filter in TIcket menu
    const submitChange = () => {
        // every items in the list will be check if there is empty then reset filter state
        let validateArray: any = [];
        Object.values(selectedFilters).forEach((x: any) => {
            if (x.length > 0) {
                validateArray.push(true)
            } else {
                validateArray.push(false);
            }
        })
        if (validateArray.every((x: any) => !x)) {
            // setFilterState to false and filters 
            dispatch(saveSelectedFilter({ filters: selectedFilters, filterState: false }));

        } else {
            dispatch(saveSelectedFilter({ filters: selectedFilters, filterState: true }));
        }

    }


    return (
        <div className={styles.FilterMain}>

            <div className={styles.FilterDiv}>Choose filters</div>

            <div className={styles.FilterItems}>
                <div className={styles.FilterItem}>
                    <span>Agents</span>
                    <Autocomplete
                        id="tags-standard"
                        suppressContentEditableWarning
                        fullWidth
                        multiple
                        disableClearable
                        limitTags={2}
                        classes={{ inputRoot: classes.inputRoot }}
                        options={dropDownValues['agent']}
                        defaultValue = {selectedFilters['agent']}
                        onChange={(event, value: any) => inputEvent('agent', value)}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue= {(option, value) =>  option.name === value.name}
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    placeholder="Agents"
                                />
                            )
                        }
                        }
                    />

                </div>
                <div className={styles.FilterItem}>
                    <span>Contacts</span>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        classes={{ inputRoot: classes.inputRoot }}
                        fullWidth
                        disableClearable
                        limitTags={2}
                        options={dropDownValues['customer']}
                        onChange={(event, value: any) => inputEvent('customer', value)}
                        defaultValue={selectedFilters['customer']}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Customer Contact"
                            />
                        )}
                    />
                </div>
                <div className={styles.FilterItem}>
                    <span>State</span>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        onChange={(event, value: any) => inputEvent('state', value)}
                        classes={{ inputRoot: classes.inputRoot }}
                        options={dropDownValues['state']}
                        defaultValue={selectedFilters['state']}
                        fullWidth
                        disableClearable
                        limitTags={2}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        getOptionLabel={(option) => option.name}

                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="State"
                            />
                        )}
                    />

                </div>
                <div className={styles.FilterItem}>
                    <span>Priority</span>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        fullWidth
                        disableClearable
                        limitTags={2}
                        classes={{ inputRoot: classes.inputRoot }}
                        onChange={(event, value: any) => inputEvent('priority', value)}
                        options={dropDownValues['priority']}
                        defaultValue={selectedFilters['priority']}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Priority"
                            />
                        )}
                    />

                </div>
                <div className={styles.FilterItem}>
                    <span>Status</span>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        fullWidth
                        disableClearable
                        limitTags={2}
                        classes={{ inputRoot: classes.inputRoot }}
                        options={dropDownValues['status']}
                        defaultValue={selectedFilters['status']}
                        onChange={(event, value: any) => inputEvent('status', value)}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Status"
                            />
                        )}
                    />


                </div>
            </div>
            <div className={styles.FilterButton}>
                <Button
                    variant="contained"
                    onClick={submitChange}
                    sx={{
                        color: 'white',
                        // boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        // background: '#12344D',
                        marginRight: '10px',
                        // ':hover': {
                        //     bgcolor: '#ECEFF3', // theme.palette.primary.main
                        //     color: '#12344D',
                        // },

                    }}
                >Apply
                </Button>
                {/* <Button
                    variant="contained"
                    onClick={resetFilters}
                    sx={{
                        color: 'white',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        background: '#12344D',
                        ':hover': {
                            bgcolor: '#ECEFF3', // theme.palette.primary.main
                            color: '#12344D',
                        },

                    }}
                >Reset
                </Button> */}
            </div>



        </div>
    );
}

export default FilterScreen;


