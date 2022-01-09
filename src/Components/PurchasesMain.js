import React, {useState ,useContext } from 'react';
import $ from "jquery";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PurchasesTablePanel from './PurchasesTablePanel';
import { urlContext } from '../ContextAPI/ServerURL';

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
    height: '65vh',
  },
  paper2: {
    padding: theme.spacing(3),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '65vh',
    background: 'aliceblue',
  },
}));



export default function Dashboard() {
  var url = useURL();
    const [quantityNum, setquantityNum] = useState(0);
    $("#companyName").keypress(function(event) {
      if (event.keyCode === 13) {
          $("#dataSendToDB").click();
      }
    });
    const minusOne = () => {
        if (quantityNum <= 0)
            return;
        setquantityNum(quantityNum - 1);        
    }
    const minusTen = () => {
        if (quantityNum <= 9)
            return;
        setquantityNum(quantityNum - 10);        
    }
    const addOne = () => {
            setquantityNum(quantityNum + 1);     
    }
    const addTen = () => {
        setquantityNum(quantityNum + 10);     
    }

    const addPurchase = () => {    
      if ($('#inputPurchaseSelector :selected').text() === "Choose...") {
        $('#result').text("Invalid Icecream Choice").removeClass("text-success").addClass("text-danger");  
        return;
      }
      if($('#companyName').text.length > 3){
        $('#result').text("Invalid Company Name").removeClass("text-success").addClass("text-danger");  
        return;
      }
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let str = $('#inputPurchaseSelector :selected').text();
      const myArr = str.split(" ");
      var raw = JSON.stringify({
        "cpv": myArr[0],
        "name": myArr[1],
        "company": document.getElementById('companyName').value,
        "quantity": document.getElementById('Quantity').value
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch(url + "purchase", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          $('#result').text("Data Inserted").addClass("text-success").removeClass("text-danger");  
          document.getElementById('companyName').value = "";
          $("#inputPurchaseSelector").val('Choose...');   
        })
        .catch(error => console.log('error', error));
    }
    
  const classes = useStyles();

  
  return (
  <main className={classes.content}>
    <div className={classes.appBarSpacer} />
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={2}>
        {/* Recent SalesPanel */}
        <Grid item xs={12} md={8} lg={8}>
          <Paper className={classes.paper}>
            <PurchasesTablePanel/>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Paper className={classes.paper2}>
          <h3 style={{padding:'30px 0px'}}>Add Purchases</h3>
          <form>          
          <div class="input-group mb-3">  
            <div class="input-group-prepend">
                <label class="input-group-text">Quantity</label>
            </div>          
              <input type="text" class="form-control" disabled id="Quantity" value={quantityNum} placeholder="Quantity" aria-label="Quantity" style={{fontSize:'24px'}} aria-describedby="basic-addon2"/>
              <div class="input-group-append">
                  <button class="btn btn-danger" type="button" onClick={minusTen} style={{fontFamily:'monospace'}}>-10</button>
                  <button class="btn btn-danger" type="button" onClick={minusOne} style={{fontFamily:'monospace'}}>-</button>
                  <button class="btn btn-success" type="button" onClick={addOne} style={{fontFamily:'monospace'}}>+</button>
                  <button class="btn btn-success" type="button" onClick={addTen} style={{fontFamily:'monospace'}}>+10</button>
              </div>
              </div>              
              <div class="input-group mb-3">
                  <div class="input-group-prepend">
                      <label class="input-group-text" for="inputPurchaseSelector">Item with CPV Code</label>
                   </div>
                   <select class="custom-select" id="inputPurchaseSelector" style={{height:'auto'}}>
                      <option selected value="Choose...">Choose...</option>
                      <option value="15530000-2 Butter">15530000-2 Butter</option>
                      <option value="15511700-0 Milk powder">15511700-0 Milk powder</option>
                      <option value="15511000-3 Milk">15511000-3 Milk</option>
                      <option value="15332290-3 Jams">15332290-3 Jams</option>
                      <option value="15811100-7 Bread">15811100-7 Bread</option>
                      <option value="03142500-3 Eggs">03142500-3 Eggs</option>                                            
                      <option value="15551300-8 Yoghurt">15551300-8 Yoghurt</option>                                            
                   </select>
              </div>
              <div class="input-group mb-3">
              <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1"  style={{fontFamily:'monospace',fontSize:'22px'}}>@</span>
              </div>
              <input type="text" id="companyName" class="form-control" placeholder="Company Name" aria-label="Company Name" aria-describedby="basic-addon1"/>
          </div>
            <button id="dataSendToDB" type="button" class="btn btn-primary" style={{'fontSize': '26px'}} onClick={addPurchase} onKeyPress={addPurchase}>Purchase</button>
            <p id="result"></p>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  </main>
    );
}