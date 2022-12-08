import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from "./_focusCard.module.scss"

type Props = {
    type: string;
    number: number;
  };
  
const FocusCard:React.FC<Props> = ({type, number}) => {

    return (
        <Card sx={{ minWidth: 150 }} className={styles.wrapper}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {type}
          </Typography>
          <Typography variant="h5" component="div">
            {number}
          </Typography>
          </CardContent>
          </Card>
    )
}

FocusCard.prototype = {
    title: String ,
    count : Number
}

export default FocusCard;