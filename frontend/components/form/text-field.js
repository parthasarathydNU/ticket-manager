/**
 * Wrapper for Textfield component
 * Author: Aravind Dasarathy
 * Date: 08/12/2022
 *
 * @module components/form/text-field
 * @requires @mui/material
 */

import TextField from '@mui/material/TextField';

export default function HailTextField(props) {
  const { required = true } = props;

  return (
    <TextField
      autoFocus
      required={required}
      fullWidth
      variant="outlined"
      margin="normal"
      {...props}
    />
  );
}