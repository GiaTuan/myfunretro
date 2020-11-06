import { AppBar, Button, ClickAwayListener, Grow, makeStyles, MenuItem, MenuList, Paper, Popper, Toolbar, Typography } from '@material-ui/core';
import React , {useState, useEffect, useRef} from 'react'
import { useHistory , Link} from 'react-router-dom';
import Auth from '../protectedRouteComponent/authentication';
import URL from '../url';

const useStyles = makeStyles({
    background: {
        backgroundColor: '#2196f3',
    },
    title: {
        flexGrow: 1,
    },
    whiteColor: {
        color: '#ffffff'
    }
})

export default function Header(props){
    const [open, setOpen] = useState(false);
    const [userName,setUserName] = useState('');
    const history = useHistory();
    const anchorRef = useRef(null);
    const classes = useStyles();

    useEffect(() => {
      const getData = async () => {
        const bearer = 'Bearer ' + localStorage.getItem('token');
        const data = await fetch(URL.getUrl()+"user",{
             method: 'GET',
             headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded',
             'Authorization' : bearer}),
         })
         const result = await data.json();
          setUserName(result.user[0].username);
      }
      getData();
   }, []);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClickProfile = () => {
        history.push('/user');
    }

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);
    };

    const handleClickLogout = () => {
      localStorage.removeItem("token");
      Auth.logOut(()=>{
        history.push("/");
      });
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <AppBar position="static" className = {classes.background}>
        <Toolbar>
            <Typography className = {classes.title} variant="h6">
                <Link to="/boards" className={classes.whiteColor}>My Fun Retro</Link>
            </Typography>
            <div>
              <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className={classes.whiteColor}
              >
                {userName}
              </Button>
              <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                          <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
                          <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
        </Toolbar>
    </AppBar>);
}

