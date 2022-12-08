
const url = 'http://localhost:8080/';

//Default Predefined Values //
const priority = ['Urgent', 'High', 'Medium', 'Low'];
const status = ['Open', 'Closed', 'Block', 'Unassigned'];
const state = ['overdue', 'due'];
const agent = ['Unassigned', 'agent 1', 'agent 2'] // fetch from api
const contact = ['user 1 ', 'user 2'] // fetch from user api
const sortOrder =  {
   priority :  {High : 2, Medium : 3, Low : 4, Urgent : 1},
   status  : { Open : 2, Block : 3, Closed : 4, Unassigned : 1}
};


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
    status: []
};

let dropDownValues = {
    agent: [],
    group: [],
    state: [],
    priority: [],
    status: []
};

const staticColumns = [
    { field: 'contact', headerName: 'Contact' , sortable : false },
    { field: 'subject', headerName: 'Subject', flex: 1 , sortable : false},
    { field: 'agent', headerName: 'Agent' , sortable : false },
    { field: 'state', headerName: 'State' , sortable : false},
    { field: 'group', headerName: 'Group' ,sortable : false },
    { field: 'priority', headerName: 'Priority' ,sortable : false},
    { field: 'status', headerName: 'Status' ,sortable : false },
];

//Default Predefined Values //

export const getAllTickets = async () => {
    return (await fetch(url + 'ticket')).json();
}

// This is used to filter the rows based on Filters applied
export const getRowFiltering = (rows, filter) => {
    let items = [];
    // checking each for filter criteria to match 
    rows.forEach(row => {
        let flag = [];
        Object.entries(filter).forEach((prop) => {
            if (prop[1].length > 0) {
                const findVal = prop[1]?.find((x) => x.label === row[prop[0]]);
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
            return filters.order === 'Asc' ?
            new Date(a.createdAt) - new Date(b.createdAt):
            new Date(b.createdAt) - new Date(a.createdAt);
        })
        break;
        case 'Date Modified' :
    
        items = rows.sort((a,b) => { 
            return filters.order === 'Asc' ?
            new Date(b.updatedAt) - new Date(a.updatedAt) :
            new Date(b.updatedAt) - new Date(a.updatedAt);
        })
        break;

        case 'Priority' : 
        items = rows.sort((a,b) => { 
            return filters.order === 'Asc' ?
            sortOrder['priority'][a.priority] - sortOrder['priority'][b.priority] :
            sortOrder['priority'][b.priority] - sortOrder['priority'][a.priority]
            ;  //a-b  asc
        })
        break;

        case 'Status' :
            items = rows.sort((a,b) => { 
                return  filters.order === 'Asc' ?
                sortOrder['status'][a.status] - sortOrder['priority'][b.status] ://a-b  asc
                sortOrder['status'][b.status] - sortOrder['priority'][a.status];  
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
            dropDownfilter['priority'] = dropDownStructure(priority);
        }
        else if (d[0] === 'status') {
            dropDownfilter['status'] = dropDownStructure(status);
        }
        else if (d[0] === 'state') {
            dropDownfilter['state'] = dropDownStructure(state);
        }
        else if (d[0] === 'agent') {
            dropDownfilter['agent'] = dropDownStructure(agent);
        }
        else if (d[0] === 'contact') {
            dropDownfilter['contact'] = dropDownStructure(contact);
        }
    });
    return dropDownfilter;

}

// To get Material UI structure for Autocomplete UI Component
export const dropDownStructure = (values) => {
    //to create material ui dropdown structure 
    return values.map(x => ({ label: x }));
}

export { Autocomplete, staticColumns, dropDownValues, sortByDropdown, selectedFilters };