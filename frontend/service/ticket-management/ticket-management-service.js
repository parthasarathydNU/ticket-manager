const url = 'http://localhost:8080/';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

/**
 * This Service file will provide common services like 
 * - Hardcoded Default Vlues
 * - Fetch api's for get All User , Get all tickets , Update/Delete Ticket
 * - common Functionality like Row Filtering and Sort Functionalities 
 */

//Default Predefined Values //
const priority = ['Urgent', 'High', 'Medium', 'Low'];
const status = ['Open', 'Closed', 'In Progress', 'Resolved'];
const state = ['Due', 'Overdue'];

//order to determine Filters
const sortOrder =  {
   priority :  { Urgent : 1 ,High : 2, Medium : 3, Low : 4}, // order of priority
   status  : {Open : 4 , 'In Progress' : 3, Closed : 2, Resolved : 1} // order of status
};

// Common Style used for Autocomplete Complete
const Autocomplete = {
    inputRoot: {

        '&&[class*="MuiOutlinedInput-root"] $input': {
            padding: 0,
            
        },
        "&$focused" :{
            backgroundColor: 'green',
        }
    },
    popper :{
        backgroundColor: 'green',
    },
    root: {
        padding: 0,
        
    },
}

const sortByDropdown = [
    'No Sort', 
    'Date Created',
    'Last Modified',
    'Priority',
    'Status'
];

let selectedFilters = {
    agent: [],
    group: [],
    state: [],
    priority: [],
    status: [],
    customer : []
};

let dropDownValues = {
    agent: [],
    group: [],
    state: [],
    priority: [],
    status: [],
    customer : []
};

const staticColumns  = [
    { field: 'contact', headerName: 'Contact' , sortable : false },
    { field: 'subject', headerName: 'Subject', flex: 1 , sortable : false},
    { field: 'agent', headerName: 'Agent' , sortable : false },
    { field: 'state', headerName: 'State' , sortable : false},
    { field: 'group', headerName: 'Group' ,sortable : false },
    { field: 'priority', headerName: 'Priority' ,sortable : false},
    { field: 'status', headerName: 'Status' ,sortable : false },
    { field: 'Delete', headerName: 'Delete' ,sortable : false ,
     renderCell : () => {
        <IconButton
        sx={{
            position: 'absolute',
            color: 'white',
            top: '15px',
            left: '13px',
            zIndex: 100
        }}
    >
        <DeleteIcon />
    </IconButton>
    } },
];

// Get All Users
export const getAllUserforTicket = async () =>  {
    return (await fetch(url + 'user')).json();
}

//Get all Tickets
export const getAllTickets = async () => {
    return (await fetch(url + 'ticket')).json();
}

// delete Ticket from Id 

export const deleteTicketbyId =  async (id) => {
    return (await fetch(`${url}ticket/${id}`, { method: 'DELETE' })).json();
}

// This is used to filter the rows based on Filters applied
export const getRowFiltering = (rows, filter) => {
    let items = [];
    // checking each for filter criteria to match 
    rows.forEach(row => {
        let flag = [];
        Object.entries(filter).forEach((prop) => {
            if (prop[1].length > 0) {
             
                const findVal = prop[1]?.find((x) => x.name === row[prop[0]]);
                if (findVal) {
                    flag.push(true);
                } else {
                    flag.push(false);  //false
                }
            }

        });
        if (flag.every(x => x === true)) {
            items.push(row);
        }
    });
    return items;
}

// sort rows based on top dropdown selctions - rowFilters 

export const getCommonSort = (rows , filters) =>{
    let items = [] ;
    switch(filters.type) {
        case 'Date Created' : 
        items = rows.sort((a,b) => { 
            return filters.order === 'Desc' ?
            new Date(b.createdAt) - new Date(a.createdAt):
            new Date(a.createdAt) - new Date(b.createdAt);
        })
        break;
        case 'Last Modified' :
    
        items = rows.sort((a,b) => { 
            return filters.order === 'Desc' ?
            new Date(b.updatedAt) - new Date(a.updatedAt) :
            new Date(a.updatedAt) - new Date(b.updatedAt);
        })
        break;

        case 'Priority' : 
        items = rows.sort((a,b) => { 
            return filters.order === 'Desc' ?
            sortOrder['priority'][a.priority] - sortOrder['priority'][b.priority] :
            sortOrder['priority'][b.priority] - sortOrder['priority'][a.priority]
            ;  //a-b  asc
        })
        break;

        case 'Status' :
            items = rows.sort((a,b) => { 
                return  filters.order === 'Desc' ?
                sortOrder['status'][a.status] - sortOrder['status'][b.status] ://a-b  asc
                sortOrder['status'][b.status] - sortOrder['status'][a.status];  
            })
            break;
        default : items = rows;
        break;
    }

    return items;

}

// This service to fill Dropdown Values to Filter Screen Onload 
export const fillDropdownValues = (rows, dropDownfilter) => {

    // to fill dropdown values after fetching row 

    Object.entries(dropDownfilter).forEach(d => {
        if (d[0] === 'priority') {
            dropDownfilter['priority'] =  priority.map(x => ({name :x}));
        }
        else if (d[0] === 'status') {
            dropDownfilter['status'] =  status.map(x => ({name :x}));
        }
        else if (d[0] === 'state') {
            dropDownfilter['state'] = state.map(x => ({name :x}));
        }
    });
    return dropDownfilter;

}

// To get Material UI structure for Autocomplete UI Component
export const dropDownStructure = (values , flag = true ) => {
    //to create material ui dropdown structure 
    return values.map(x => ({ label: x , id : x.id }));
}



export { Autocomplete, staticColumns, dropDownValues, sortByDropdown, selectedFilters  };