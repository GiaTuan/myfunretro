import { Button, createMuiTheme, CssBaseline, Grid, Input, Link, makeStyles, MuiThemeProvider, Paper, Typography } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import Header from '../headerComponent';
import URL from '../url';

const useStyles = makeStyles({
    paperContainer: {
        paddingTop: '3em',
        paddingLeft: '1em',
        paddingRight: '1em',
        paddingBottom: '1em'
    },
    infoContainer: {
        marginTop: '1em',
        width: '50%',
        paddingLeft: '1em',
        paddingRight: '1em',
        paddingTop: '1em',
        paddingBottom: '1em'
    },
    changeButton: {
        marginLeft: '1em',
        backgroundColor: '#00c853',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#00a946',
            color: '#ffffff',
        }
    },
    profileTitle: {
        textAlign: 'center',
        color: '#0069c0',
        fontStyle: 'bold'
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



export default function User(props)
{
    const classes = useStyles();
    const [user,setUser] = useState({});
    const [isChangePassword,setIsChangePassword] = useState(false);
    const [message,setMessage] = useState('');
    const [password,setPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [passwordMessage,setPasswordMessage] = useState('');


    useEffect(() => {
        const bearer = 'Bearer ' + localStorage.getItem('token');
        fetch(URL.getUrl()+"user",{
             method: 'GET',
             headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization' : bearer}),
         })
         .then(res => res.json())
         .then(
             (result) => {
                setUser(result.user[0]);
             }
         )
     }, []);

     const handleChangeEmail = (e) => {
         const newEmail = e.target.value;
         const tempUser = {...user};
         const newUser = {...tempUser,email: newEmail};
         setUser(newUser);
     }

     const handleChangePasswordClick = (e) => {
         setIsChangePassword(!isChangePassword);
     }

    const handleSubmitChangeInfo = async (e) => {
        console.log(user.email);
        const bearer = 'Bearer ' + localStorage.getItem('token');
        const url = URL.getUrl()+"user/" + user.id.toString() + "/changeEmail"; 
        console.log(url);
        const response = await fetch(url,{
            mode: 'cors',
            method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': bearer,
        },
        body: JSON.stringify({
          email: user.email,
        })});
        response.json().then(data=>{
            if(data==="success")
            {
                setMessage("Change email successfully");
            }
            if(data==="fail")
            {
                setMessage("Email existed");
            }
        })
    }

    const handleSubmitChangePassword = async (e) => {
        const bearer = 'Bearer ' + localStorage.getItem('token');
        const url = URL.getUrl()+"user/" + user.id.toString() + "/changePassword"; 
        const response = await fetch(url,{
            mode: 'cors',
            method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': bearer
        },
        body: JSON.stringify({
          password: password,
          newpassword: newPassword
        })});
        response.json().then(data => {
            if(data==='success')
            {
                setPasswordMessage("Change password successfully")
            }
            if(data==='fail')
            {
                setPasswordMessage("Current password not correct")

            }
        })
    }

    const handleChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const handleChangeConfirmPassword = (e) => {
        const newPassword = e.target.value;
        setNewPassword(newPassword);
    }

    return (
        <>
            <Header></Header>
            <MuiThemeProvider theme = {theme}>
                <CssBaseline></CssBaseline>
                <Grid container justify="center" alignItems="center" direction="column">
                    
                    <Paper className={classes.infoContainer}>
                        <Grid item >
                            <Typography variant={"h4"} className={classes.profileTitle}>My profile</Typography>
                        </Grid>
                        <Grid item >
                            {isChangePassword ? 
                                <div>
                                    <Typography><b>Current password: </b></Typography><Input id="current" type="password"  onChange={handleChangePassword}></Input> 
                                    <Typography><b>New password: </b></Typography><Input id="new"  type="password" onChange={handleChangeConfirmPassword}></Input> 
                                    <br></br>
                                    <Typography style={{color: 'blue'}}>{passwordMessage}</Typography>

                                    <br></br>
                                    <Link onClick={handleChangePasswordClick}>Change info?</Link>
                                    <Button size="small" className={classes.changeButton} onClick={handleSubmitChangePassword}>Change</Button>
                                </div>
                                
                            :
                                <div>
                                    <Typography><b>Username:</b> {user.username}</Typography>
                                    <Typography><b>Email: </b></Typography><Input id="email" value={user.email} onChange={handleChangeEmail}></Input> 
                                    <br></br>
                
                                    <Typography style={{color: 'blue'}}>{message}</Typography>
                                    <br></br>
                                    <Link onClick={handleChangePasswordClick}>Change password?</Link>
                                    <Button size="small" className={classes.changeButton} onClick={handleSubmitChangeInfo}>Change</Button>
                                </div>
                            }
                        </Grid>

                    </Paper>
                    
                </Grid>
            </MuiThemeProvider>
        </>
    );
}