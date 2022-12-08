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
  