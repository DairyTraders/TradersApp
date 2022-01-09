import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { urlContext } from '../ContextAPI/ServerURL';
import { SalesStock,PurchasesStock } from './icecreamData';

function useURL() {
  return useContext(urlContext);
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function PurchasesPanel(props) {  
  
  const classes = useStyles();

  const [Data, setData] = useState(props.data); 
  const [pstock, setPstock] = useState(PurchasesStock);
  const [sstock, setSstock] = useState(SalesStock);
  const [flavourDetail, setFlavourDetail] = useState(props.data);

  console.log(Data);
  var url = useURL();
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }; 
  useEffect(() => {
    setTimeout(function(){       
      fetch(url + "sales/stock", requestOptions)
        .then(response => response.json())
        .then(result => {
          // console.log(result);
          setSstock(result);                    
        })
        .catch(error => console.log('error', error));  

        fetch(url + "purchase/stock", requestOptions)
        .then(response => response.json())
        .then(result => {
          // console.log(result);
          setPstock(result);                     
        })
        .catch(error => console.log('error', error));  

        // Now calc Purchases and sales
        pstock.FlavoursDetail.forEach( pitem =>{
          sstock.FlavoursDetail.forEach( sitem => {
            if (pitem.flavourName == sitem.flavourName) {
              var avaible = pitem.Quantity - sitem.Quantity;
              // FlavoursDetail.push({flavourName: pitem.flavourName, Quantity: avaible});
              setFlavourDetail(flavourDetail.push({flavourName: pitem.flavourName, Quantity: avaible}));
            }
          })
        });
    }, 700);      
  }, []);
  return (
    <React.Fragment>
      <h3>Stock Summary</h3>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Flavour</b></TableCell>
            <TableCell><b>Quantity Available</b></TableCell>
          </TableRow>
        </TableHead>
        {
          <TableBody>
            {Data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.flavourName}</TableCell>
                <TableCell>{row.Quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        }
        
      </Table>
      
    </React.Fragment>
  );
}