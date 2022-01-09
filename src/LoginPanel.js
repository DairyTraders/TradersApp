import React, {useContext} from 'react';
import { authContext } from './ContextAPI/Authentication';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import $ from 'jquery';
import loader from './assets/icecream_8.gif';
import image from './assets/undraw_ice_cream_s2rh.png';
import { urlContext } from './ContextAPI/ServerURL';


const showloader = () => {
  $(".overlay_loader").show(); 
}

function useAuth() {
    return useContext(authContext);
}

function Copyright() {
    return (
      <h4>Copyright © IcreamStoreManagner
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </h4>
    );
  }
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    fontFamily: [
        'Arial',
        "Times New Roman",
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
  },
  image: {    
    backgroundImage:`url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  links:{
    color: '#00ffe7',
  }
}));

export default function SignInSide() {
  var url = useURL();
  const classes = useStyles();
  var found = false;
  function useURL() {
    return useContext(urlContext);
  }
  $(document).ready(function(){
      $(".overlay_loader").hide();        
  });
  let auth = useAuth();
  let login = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "username": document.getElementById('user').value,
      "pass": document.getElementById('pass').value
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(url + "user/validate", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result == true) {          
          showloader();  
          setTimeout(function(){                 
            auth.signin();
          }, 1200);             
        }  
        else{
          $(".overlay_loader").hide();
          $('#failed').addClass("text-danger").text("Invalid Username or password");    
          document.getElementById('failed').style.display = 'block';               
        }
      })
      .catch(error => console.log('error', error));    
  };
  function createAccountPanel(){
    $('.overlay_CreateAccount').show();
  }
  $(document).mouseup(function(e) 
  {
      var container = $(".overlay_CreateAccount");
      if (!container.is(e.target) && container.has(e.target).length === 0) 
      {
          container.hide();
          $('#registerButton').prop('disabled', false);
          $('#registerButton').text("Register");
      }
  });
  function registerUser(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    if(($('#newuser').val() === "") || ($('#newpass').val() === "") || ($('#newemail').val() === "")){
      return;
    }
    var raw = JSON.stringify({
      "username": $('#newuser').val(),
      "pass":  $('#newpass').val(),
      "email":  $('#newemail').val(),
      "dob": $('#newDate').val()
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch( url + "user/createnew", requestOptions)
      .then(response => response.text())
      .then(result => {
        if(result)
        {
          $('#registerButton').text("Registered");
          $('#newuser').val("");
          $('#newpass').val("");
          $('#newemail').val("");              
          $('#registerButton').prop('disabled', true);
        }        
        else
        {
          $('#registerButton').text("Try Again Later");
          $('#registerButton').prop('disabled', true);
        }
      })
      .catch(error => console.log('error', error));
  }
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{backgroundColor: '#156064'}}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <h1>
            Sign in
          </h1>
          <form className={classes.form}>
            <TextField variant="outlined" margin="normal" required fullWidth
              id="user"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="pass"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <p id="failed" style={{display:'none'}}>Invalid Username or password.</p>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={login}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" className={classes.links}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs>
                <Link href="#" onClick={createAccountPanel} variant="body2" className={classes.links}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>            
              <Copyright />
            </Box>            
          </form>
          <div className="overlay_CreateAccount">
            <br></br>
            <h1>Sign Up</h1>
            <form>
              <label>Username</label>
              <input id="newuser" type="text" required></input>
              <br></br>
              <label>Password</label>
              <input id="newpass" type="password" required></input>
              <br></br>
              <label>Email</label>
              <input id="newemail" type="text" required></input>
              <br></br>
              <label>Date Of Birth</label>
              <input id="newDate" type="date" required></input>
              <br></br>
              <button id="registerButton" onClick={registerUser}>Register</button>
            </form>
          </div>
          <div className="overlay_loader">
          <img src={loader}></img>
        </div>
        </div>
      </Grid>
    </Grid>
  );
}