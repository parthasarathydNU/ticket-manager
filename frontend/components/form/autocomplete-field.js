import { Autocomplete } from '@mui/material';

export default function HailAutocompleteField(props) {
  const { required = true } = props;

  return (
    <Autocomplete
      disableClearable={true}
      selectOnFocus={true}
      clearOnBlur={true}
      freeSolo={false}
      required={required}
      {...props}
    />
  );
}