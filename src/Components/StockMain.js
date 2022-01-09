import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { PurchasesStock } from './icecreamData';
import { urlContext } from '../ContextAPI/ServerURL';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
function useURL() {
  return useContext(urlContext);
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '50vh',
  },
  card: {
    marginBottom:'5vh',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '22.4vh',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: 'coral',
  },
  card2: {
    marginBottom:'5vh',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '22.4vh',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: 'blueviolet',
  },

}));


export default function Dashboard() {
  const classes = useStyles();
  // GET STOCK DATA FROM API
  const [flavourDetail, setFlavourDetail] = useState(PurchasesStock.FlavoursDetail);
  const [available, setAvailable] = useState(0);
  const [totalIcecreams, setTotalIcecreams] = useState(0);
  var url = useURL();
  useEffect(() => {    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(url+"stock", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setTotalIcecreams(result.totalQuantity);
        setAvailable(result.totalFlavours);
        setFlavourDetail(result.FlavoursDetail);
      })
      .catch(error => console.log('error', error));
  }, []);
  return (
  <main className={classes.content}>
    <div className={classes.appBarSpacer} />
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Recent SalesPanel */}
        <Grid item xs={12} md={8} lg={7}>
          <Paper className={classes.paper}>
          <Tooltip title="Creation of Mandatory Reports" placement="top" arrow TransitionComponent={Zoom}>
            <h3>Stocks Summary</h3>
          </Tooltip>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><b>PRODUCT NAME</b></TableCell>
                  <TableCell><b>QUANTITY AVAILABLE</b></TableCell>
                </TableRow>
              </TableHead>
              {
                <TableBody>
                  {flavourDetail.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.flavourName}</TableCell>
                      <TableCell>{row.Quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              }            
            </Table>
          </Paper>          
        </Grid>  
        <Grid item xs={12} md={4} lg={5}>
          <Paper className={classes.card}>
            <h2> {totalIcecreams}  </h2>   
            <p>TOTAL STOCK OF PRODUCTS</p>   
          </Paper> 
          <Paper className={classes.card2}>
            <h2> {available}  </h2> 
            <p>AVAILABLE PRODUCTS CATEGORY</p>            
          </Paper>          
        </Grid>        
      </Grid>      
    </Container>
  </main>
    );
}