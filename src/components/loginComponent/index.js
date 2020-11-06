import { Button, createMuiTheme, CssBaseline, Grid, makeStyles, MuiThemeProvider, Paper, TextField, Typography } from '@material-ui/core';
import React , {useState} from 'react';
import GoogleLogin from 'react-google-login';
import {Link, useHistory} from 'react-router-dom';
import Auth from '../protectedRouteComponent/authentication';
import URL from '../url';

const useStyles = makeStyles({
    paperContainer: {
        paddingTop: '3em',
        paddingLeft: '1em',
        paddingRight: '1em',
        paddingBottom: '1em'
    },
    googleLoginBtn:{
        marginTop: '1em',
        width: '100%'
    }
});

const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
          "@global": {
            body: {
              backgroundImage:
              `url(${"/crossword.png"})`
            }
          }
        }
      }
})

export default function Login(props){
    const [loginData,setLoginData] = useState({
        username: '',
        password: ''
    });
    const [message,setMessage] = useState('');
    const classes = useStyles();


    const submitLogin = async (e) => {
        e.preventDefault();
        if(loginData.username === '' || loginData.password === '' )
        {
            return setMessage("Username or password is empty");
        }
        const response = await fetch(URL.getUrl()+"login",{
            mode: 'cors',
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            username: loginData.username,
            password: loginData.password,
            })});
        
        if(response.ok)
        {
            response.json().then(data => {
            if(data !== undefined)
            {
                localStorage.setItem('token',data.token); 
                Auth.logIn(() => {
                    props.history.push("/boards");
                  });               
            }});

        }
        else
        {
            setMessage('Username or password is not correct')
        }
    }

    const onChangeUsername = (e) =>{
        setLoginData({
            username: e.target.value,
            password: loginData.password
        })
    };

    const onChangePassword = (e) =>{
        setLoginData({
            username: loginData.username,
            password: e.target.value
        })
    };
    const responseGoogle = async (response) => {
        const data = await fetch(URL.getUrl() + "login/auth/google",{
            mode: 'cors',
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            data: response.profileObj
        })});
        const result = await data.json();
        localStorage.setItem("token",result.token);
        Auth.logIn(() => {
            props.history.push("/boards");
          });   
      }
       
    return (
        <>
            <MuiThemeProvider theme = {theme}>
                <CssBaseline></CssBaseline>
                <Grid container justify="center" alignItems="center" direction="column" style={{height: '100vh'}}>
                    <Grid item >
                        <Typography variant={"h4"}>My Fun Retro</Typography>
                    </Grid>
                    <br></br>
                    <br></br>
                    <Grid item lg={4}>
                        <Paper elevation={3} className={classes.paperContainer}>
                            <Typography style={{textAlign: 'center'}}>Login</Typography>
                            <form onSubmit={submitLogin}>
                                <TextField onChange={onChangeUsername} name="username" label="Username" fullWidth>
                                </TextField>
                                <TextField onChange={onChangePassword} name="password" label="Password" type="password" fullWidth>
                                </TextField>
                                <br></br>
                                <Typography style={{color: 'red'}}>{message}</Typography>
                                <br></br>
                                <Button variant="contained" color="primary" fullWidth type="submit">
                                    Login
                                </Button>
                                <GoogleLogin className={classes.googleLoginBtn} clientId="2151266097-ph08uuide4f1kcbihia8v1idfp2qt3vj.apps.googleusercontent.com"
                                buttonText="Login with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}></GoogleLogin>
                                <br></br>
                                <br></br>
                                <Typography style={{textAlign: 'center'}}>or <Link to="/register">Register</Link> </Typography>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        </>);
}