import React, { useState,useContext,useEffect} from 'react';
import $ from "jquery";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { sellsPrices } from './icecreamData';
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
    height: '70vh',
    background:'aliceblue',
  },  
}));


export default function Dashboard() {
    // Calculation
    var url = useURL();
    
    const [itemsDetail, setItemsDetail] = useState("");

    useEffect(() => {    
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      fetch(url+"stock", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          
          // Put available Select options
          if(result.FlavoursDetail.length > 0)
          {
            setItemsDetail(result.FlavoursDetail);
            $('#inputOrderSelector').find('option').not(':first').remove();
            result.FlavoursDetail.map((item) =>{
              $('#inputOrderSelector').append(`<option value="${item.flavourName}"> ${item.flavourName} </option>`);
            })
          }
        })
        .catch(error => console.log('error', error));
    }, []);


    const [quantityNum, setquantityNum] = useState(0);
    const [displayPrice, setDisplayPrice] = useState("$ 0");

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
    const confirm = () => {    
          //INPUT VALIDATION
          if (($('#Quantity').text() !== " ") && (!isNaN(document.getElementById('Quantity').value))) {
            if ($('#inputGroupSelect01 :selected').text() === "Choose...") {
                $('#result').text("Please Select Icecream Type").addClass("text-danger").removeClass("text-success"); 
                return;
            }
            if ($('#inputOrderSelector :selected').text() === "Choose...") {
                $('#result').text("Please Select Item").addClass("text-danger").removeClass("text-success"); 
                return;
            }
            var n =  $('#inputOrderSelector :selected').text().toString();
            n = n.replace(/\s/g, '');
            if (sellsPrices[n] * quantityNum <= 0) {
                $('#result').text("Please Enter valid quantity").addClass("text-danger").removeClass("text-success"); 
                return;
            }    
            if($('#nuts').val() === ""){
              $('#result').text("Please Enter valid NUTS code").addClass("text-danger").removeClass("text-success"); 
              return;
            }  
            // AT LAST CHECK if stock available
            let str = $('#inputOrderSelector :selected').text();
            var outofStock = false;
            const myArr = str.split(" ");
            if(!itemsDetail === " "){
              itemsDetail.map((item) => {
                if(item.flavourName === myArr[1]){
                  if(quantityNum > item.Quantity){                    
                    outofStock = true;
                    return;                    
                  } 
                }               
              })
            }            
            if(outofStock)
            {
              $('#result').text("Sorry out of stock. You may try purchasing less number of products").addClass("text-danger").removeClass("text-success"); 
              return;
            }
            $('#result').text("Hi " + sellsPrices[n]).addClass("text-danger").removeClass("text-success"); 
            setDisplayPrice("$ " + sellsPrices[n] * quantityNum);
            $('#result').text("");
            addOrder(sellsPrices[n]);            
        }    
        else
            $('#result').text("Missing Data Fields").addClass("text-danger").removeClass("text-success"); 
    }
    const addOrder = (price) => {
        const dateObj = new Date();
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        var date = new Date(Date.now()).toLocaleString().split('/');
      
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let str = $('#inputOrderSelector :selected').text();
        const myArr = str.split(" ");

        var raw = JSON.stringify({
            "date": date[0] + " " + monthNames[dateObj.getMonth()] + " " +date[2].split(',')[0],
            "nuts": $('#nuts').val(),
            "cpv": myArr[0],
            "name": myArr[1],
            "quantity": quantityNum,
            "price": price * quantityNum
          });
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        
        fetch(url + "sales", requestOptions)
        .then(response => response.text())
        .then(result => {
            $("#inputOrderSelector").val('Choose...');   
            $("#inputGroupSelect01").val('Choose...');   
            $('#result').text("Data Inserted").addClass("text-success").removeClass("text-danger"); 
            console.log(result)
        })
        .catch(error => console.log('error', error));                   
      }
  const classes = useStyles();
  return (
  <main className={classes.content}>
    <div className={classes.appBarSpacer} />
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Cashier Inputs */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={classes.paper}>
            <h3>Cashier System</h3>
                {/* BootStrap */}
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text">Quantity</label>
                </div>
                    <input type="number" disabled class="form-control" id="Quantity" placeholder={quantityNum} aria-label="Quantity" style={{fontSize:'24px'}} aria-describedby="basic-addon2"/>
                    <div class="input-group-append">
                    <button class="btn btn-danger" type="button" onClick={minusTen} style={{fontFamily:'monospace',fontSize:'22px',border:'solid 1px black'}}>-10</button>
                        <button class="btn btn-danger" type="button" onClick={minusOne} style={{fontFamily:'monospace',fontSize:'22px',border:'solid 1px black'}}>-</button>
                        <button class="btn btn-success" type="button" onClick={addOne} style={{fontFamily:'monospace',fontSize:'22px',border:'solid 1px black'}}>+</button>
                        <button class="btn btn-success" type="button" onClick={addTen} style={{fontFamily:'monospace',fontSize:'22px',border:'solid 1px black'}}>+10</button>
                    </div>
                </div> 
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text">NUTS Code</label>
                </div>
                    <input type="text" class="form-control" id="nuts" placeholder="GR43" aria-describedby="basic-addon2"/>
                </div> 
            
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text">Item</label>
                </div>
                <select class="custom-select" id="inputOrderSelector" style={{height:'auto'}}>
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
                <div class="input-group mb-3" >
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01" >Price</label>
                </div>
                    <input type="text" id="price" class="form-control" value={displayPrice} disabled aria-label="price" style={{fontSize:'24px'}} aria-describedby="basic-addon2"/>
                </div>
                <button type="button" id="buttonSell" class="btn btn-primary" style={{'fontSize': '30px'}} onClick={confirm}>Sell</button>
                <p id="result"></p>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  </main>
    );
}