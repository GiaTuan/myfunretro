import React , {useState,useEffect} from 'react';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MuiThemeProvider, TextField } from '@material-ui/core';
import './index.css';
import { Bar } from 'react-chartjs-2';
import {useHistory} from 'react-router-dom';
import Header from '../headerComponent/index';
import URL from '../url';

const useStyles = makeStyles({
    container:{
        padding:  40,
    },
    myBoardStyle: {
        fontWeight: 'bold',
        color: '#283593', 
    },
    functionBar:{
        backgroundColor: '#FFFFFF',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
    },
    addBoardStyle:{
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#ccc',
        margin: 10
    },
    addBoardIcon:{
        color: '#8e24aa',
        fontSize: 60,
        display: 'block',
        display: 'inline',
    },
    deleteBoardBtn: {
        float: 'right',
        background: 'none',
        border: 'none',
        opacity: '0.5',
        '&:hover': {
            background: '#cccccc'
        }
    }
});

const theme = createMuiTheme({
    spacing: 10,
    palette: {
        background: {
          default: "#F3F3F3",
        }
  
      },
})


export default function Boards(props) {
    const [rawBoardsData,setRawBoardsData] = useState([]); //state for data after fetching
    const [boardsData, setBoardsData] = useState([]);  //state for data when searching boards
    const [open, setOpen] = useState(false)
    const [boardName, setBoardName] = useState('');
    const history = useHistory();
    const classes = useStyles();

     useEffect(() => {
        const getBoardData = async () => {
            const bearer = 'Bearer ' + localStorage.getItem('token');
            const data = await fetch(URL.getUrl()+"boards",{
                method: 'GET',
                headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : bearer}),
            })
            const result = await data.json();
            setRawBoardsData(result.boards);
            setBoardsData(result.boards);
        }
        getBoardData();
     }, []);

      const options = {
        scales: {
            xAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    display: false,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        display: false,
                        reverse: true,
                    },
                    gridLines: {
                        display: false,
                      },
                },
            ],
        },
        legend: {
            display: false
         },
      }
      const getData = (value) => ({
        labels: ['Went Well', 'To Improve', 'Action Items'],
        datasets: [
          {
            data: [parseInt(value.count) , parseInt(value.count2) , parseInt(value.count3)],
            backgroundColor: [
              '#009688',
              '#e91e63',
              '#9c27b0',
            ],                                        
            borderWidth: 1,
          },
        ],
    })

    const onTextChanging = (e) => {
        const textSearch = e.target.value;
        const rawData = [...rawBoardsData];
        const filtedData = rawData.filter(data => data.name.toLowerCase().includes(textSearch.toLowerCase()));
        setBoardsData(filtedData);
    }

    const onClickAddNewBoard = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
      };

    const handleBoardNameChange = (e) => {
        setBoardName(e.target.value);
    }

    const handleSubmitCreate = async (e) => {
        e.preventDefault();
        const bearer = 'Bearer ' + localStorage.getItem('token');
        const response = await fetch(URL.getUrl()+"boards/create",{
        mode: 'cors',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify({
            name: boardName
        })});
        response.json().then(data => {
            history.push('/boards/info?id='+data.success);
        })
    }
        
    const onClickInfoBoard = (id) => {
        history.push('/boards/info?id='+id);
    }

    const handleClickDeleteBoard = async (i) => {
        if(window.confirm("Do you want to delete this board?")){
            const url = URL.getUrl()+"boards/delete?id=" + i;
            const bearer = 'Bearer ' + localStorage.getItem('token');
            await fetch(url,{
            mode: 'cors',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': bearer
            }});
            const temptBoard = [...rawBoardsData];
            temptBoard.forEach((item,key) => {
                if(item.id === i)
                {
                    temptBoard.splice(key,1);
                }
            });

            setRawBoardsData(temptBoard);
            setBoardsData(temptBoard);
        }
    }

    return (
    <>
        <Header></Header>
        <MuiThemeProvider theme = {theme}>
            <CssBaseline></CssBaseline>
            <Container maxWidth = 'lg' className={classes.container}>
                <Typography variant="h5" className={classes.myBoardStyle}>My boards</Typography>
                <div className={classes.functionBar}>
                    <div className={classes.margin}>
                        <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <SearchIcon />
                        </Grid>
                        <Grid item>
                            <TextField label="Searching boards" onChange={onTextChanging} />
                        </Grid>
                        </Grid>
                    </div>
                </div>
                <br/><br/>
                <Typography variant="h6" className={classes.myBoardStyle}>Public boards</Typography><br/>
                    <Grid container spacing={3}>
                        <Grid onClick={onClickAddNewBoard} id="add-board-block" item xs = {12} sm = {4} md = {3} lg ={2} className = {classes.addBoardStyle}>                            
                            <p className = "text-align-center"><AddCircleIcon className={classes.addBoardIcon}></AddCircleIcon></p>
                            <p className={["text-align-center","purpleText"].join(' ')}><b>Add board</b></p>              
                        </Grid>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">                           
                            <DialogTitle id="form-dialog-title">Create new board</DialogTitle>
                            <DialogContentText style={{marginLeft: '1em',marginRight: '1em'}}>
                                Create your own board making your life more orderly...
                            </DialogContentText>
                            <form onSubmit={handleSubmitCreate}>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Board name"
                                        type="text"
                                        fullWidth
                                        onChange = {handleBoardNameChange}
                                    />
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button color="primary" type="submit">
                                    Create
                                </Button>
                                </DialogActions>
                            </form>
                        </Dialog>
                        {boardsData.map((value,key) => (
                            <Grid  id="grid-item" key ={key} item xs = {12} sm = {4} md = {3} lg ={2} style={{wordWrap: 'break-word',backgroundColor: '#FFFFFF', margin: 10}}>
                                <Grid onClick={ () => onClickInfoBoard(value.id)}>
                                    <Typography style={{color: '#626262'}}>{value.name}</Typography>
                                    <Typography style={{color: '#a8a8a8', fontSize: '0.75rem'}}><ScheduleIcon style={{fontSize: '0.75rem'}}></ScheduleIcon> {value.date.toLocaleString('default', { month: 'long' })} <span style={{float: 'right'}}>{parseInt(value.count) + parseInt(value.count2) + parseInt(value.count3)} cards</span></Typography>
                                    <hr style={{clear: 'left'}}/>     
                                    <Bar data={getData(value)} options={options} /> 
                                </Grid>
                                <Grid>
                                    <button onClick={() => handleClickDeleteBoard(value.id)} className={classes.deleteBoardBtn}><DeleteOutlineIcon></DeleteOutlineIcon></button>
                                </Grid>
                            </Grid>
                           
                        ))}
                    </Grid>

            </Container>
        </MuiThemeProvider>
    </>
  );
}