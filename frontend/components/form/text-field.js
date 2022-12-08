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