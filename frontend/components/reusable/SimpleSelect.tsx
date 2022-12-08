/**
 * File Name: components/reusable/SimpleSelect.tsx
 * Author: Dhruv Parthasarathy
 * File Created:
 * Last Modified: Dec, 8th, Thu
 * 
 * About: 
 * This file contains Simple Select component, 
 * this is used to provide a user with drop down with dynamic listss as options
 * 
 * When an option is changed that is returned back to the parent throuhg the
 * selecChanged class
 */

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectLabels({options, selected, selectChanged}:{options:Array<string>, selected:string, selectChanged:Function}) {
  const [option, setOption] = React.useState(selected);

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value);
    selectChanged(event.target.value);

  };

  return (
    <div>
      <FormControl   sx={{ fontSize: '10px' , padding: 'none', height: 'fit-content', width: '100%', margin: '0.5rem 0' }}
>
        <Select
          value={option}
          onChange={handleChange}
          displayEmpty
          sx={{fontSize: '13px'}}
          inputProps={{ 'aria-label': 'Without label' }}
        >
            {options.map((op:string, index:number) => {
                return <MenuItem key={index} value={op}>{op}</MenuItem>
            })}

        </Select>
      </FormControl>
    </div>
  );
}