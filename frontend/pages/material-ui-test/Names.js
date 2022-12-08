/**
 * 
 * Author: Dhruv Parthasarathy
 * Date: 14th Nov, 2022
 * 
 * ./components/material-ui-test/Names.js
 * 
 * In this file we will create a table by fetching data from an extenral end point 
 * and then using material UI library we will render the data in form of a table in the browser
 * 
 * Reference youtube tutorial
 * https://www.youtube.com/watch?v=k7bKDpw-JGk&ab_channel=BrunoAntunes
 */

 import Table from '@mui/material/Table';
 import TableBody from '@mui/material/TableBody';
 import TableCell from '@mui/material/TableCell';
 import TableContainer from '@mui/material/TableContainer';
 import TableHead from '@mui/material/TableHead';
 import TableRow from '@mui/material/TableRow';
 import Paper from '@mui/material/Paper';


export default function Names({list}){
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

Names.getInitialProps  = async () => {
    const resp = await fetch("http://localhost:3000/api/Names");
    const json=  await resp.json();
    return {list: json};
}