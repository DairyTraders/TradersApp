import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
    justifyContent: 'center',
  },
}));

export default function PurchasesPanel(props) {
  console.log(props.data);
  const classes = useStyles();
  const [Data, setData] = useState(props.data);

  useEffect(() => {
    setTimeout(function(){
        setData(props.data);
      }, 2000);  
  }, []);
  return (
    <React.Fragment className={classes.seeMore}>      
      <h2> {Data}  </h2>   
      <p>Total Icecreams in Stock</p>   
    </React.Fragment>
  );
}