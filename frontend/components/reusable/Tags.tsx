/**
 * File Name: components/reusable
 * Author: Dhruv Parthasarathy
 * File Created:
 * Last Modified: Dec, 8th, Thu
 * 
 * About: 
 * This file contains the reusable tags component
 * Given a list of tags, this component will render them 
 * but it is not possible to add new tags through this component
 * 
 */

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';



export default function Tags({tags}:{tags:string[]}) {
    return (
      <Autocomplete
        multiple
        limitTags={2}
        id="multiple-limit-tags"
        options={tags}
        getOptionLabel={(option) => option}
        defaultValue={[...tags]}
        renderInput={(params) => (
          <TextField sx={{fontSize:'12px'}} {...params} label="" placeholder="" />
        )}
        sx={{ height: 'fit-content', margin: '0.5rem 0', fontSize:'12px' }}
      />
    );
  }
  