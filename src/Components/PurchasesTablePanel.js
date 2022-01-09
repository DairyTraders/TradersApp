import React, {useState, useEffect, useContext} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { Purchases } from './icecreamData';
import { urlContext } from '../ContextAPI/ServerURL';
function useURL() {
  return useContext(urlContext);
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
    color: 'blue',
    cursor: 'pointer',
  },
}));

export default function PurchasesPanel(props) {
  var limit;
  if (props.limit == null)
    limit = false
  else 
    limit = true

  // GET DATA FROM API
  var url = useURL();

  const [searchTerm,setSearchTerm] = useState("");

  const [purchase, setPurchase] = useState(Purchases);    
    useEffect(() => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }; 
      setTimeout(function(){       
        fetch(url + "purchase", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result);
            setPurchase(result.reverse());
          })
          .catch(error => console.log('error', error));  
      }, 700);      
    }, []);

  const classes = useStyles();
  return (
    <React.Fragment>
      <h3>Purchases Report</h3>
      <div class="input-group mb-3">
      <Tooltip title="Internal search engine allows the user to filter" arrow TransitionComponent={Zoom}>
          <div class="input-group-prepend">              
              <label class="input-group-text"><SearchIcon></SearchIcon></label>
          </div>
        </Tooltip>
        <input type="text" className="form-control"  type="text" placeholder="search" onChange={(event) => {setSearchTerm(event.target.value);}}/>
      </div> 
      <Table size="small">
        <TableHead>
          <TableRow>             
                <TableCell><b>DATE</b></TableCell>    
                <TableCell><b>COMPANY</b></TableCell>  
                <TableCell><b>QUANTITY</b></TableCell>  
                <TableCell><b>CPV</b></TableCell>  
                <TableCell><b>NAME</b></TableCell>  
          </TableRow>
        </TableHead>
        {
          limit? 
          <TableBody>
            {purchase.slice(0,5).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date.split(':')[0].substring(0, 10)}</TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <Tooltip title="Common Procurement Vocabulary (CPV) is standard product classification" arrow TransitionComponent={Zoom}>
                  <TableCell>{row.cpv}</TableCell>
                </Tooltip>
                <TableCell>{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          :
          <TableBody>
            {purchase.filter((val) => {
                if(searchTerm === ""){
                  return val;
                }
                else{ 
                  try{
                    if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                      return val;
                    }else if(val.company.toLowerCase().includes(searchTerm.toLowerCase())){
                      return val;
                    }else if(val.cpv.toLowerCase().includes(searchTerm.toLowerCase())){
                      return val;
                    }else if(val.date.toLowerCase().includes(searchTerm.toLowerCase())){
                      return val;
                    }
                  }catch(err) {
                    return;
                  }
                }
              }).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date.split(':')[0].substring(0, 10)}</TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <Tooltip title="Common Procurement Vocabulary (CPV) is standard product classification" arrow TransitionComponent={Zoom}>
                  <TableCell>{row.cpv}</TableCell>
                </Tooltip>
                <TableCell>{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        }
        
      </Table>
      {
        limit? 
        <div className={classes.seeMore}>
          <Link onClick={() => window.location.href = '/purchases'}>
            See more
          </Link>
        </div>: null
      }
      
    </React.Fragment>
  );
}