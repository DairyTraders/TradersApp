import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
    justifyContent: 'center'
  },

}));

export default function PurchasesPanel(props) {

  console.log(props.limit);
  const classes = useStyles();
  const [Data, setData] = useState(props.data);
  return (
    <React.Fragment className={classes.seeMore}>
        <h2> {Data}  </h2> 
        <p>Available Flavours</p>            
    </React.Fragment>
  );
}