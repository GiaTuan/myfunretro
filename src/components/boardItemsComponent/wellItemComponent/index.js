import React from 'react';
import {Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import StopIcon from '@material-ui/icons/Stop';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles({
    itemBoard:{
        borderWidth: '1px',
        borderColor: 'black',
        borderStyle: 'solid',
        marginBottom: '1em',
        backgroundColor: '#009688',
        maxWidth: '100%',
        paddingTop: '0.2em',
        paddingLeft: '0.2em',
        paddingRight: '0.2em'
    },
    whiteColor: {
        color: '#ffffff'
    },
    textFieldContainer: {
        width: '100%',
        backgroundColor: '#ffffff'
    },
    contentStyle: {
        width: '100',
        wordWrap: 'break-word'
    },
    addButton : {
        backgroundColor: '#cccccc',
        marginBottom: '1em',
    },
    squareColor:{
        color: '#009688'
    },
    doneButton: {
        borderWidth: '1px',
        borderColor: '#ffffff',
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        color: '#ffffff',
        borderRadius: '5px',
        '&:hover': {
            backgroundColor: '#ffffff',
            color: 'black'
        }
    }
});


export default function WellColumn({well,listChangeWell,handleAdd,handleChangeContentClick,handleChangeContent,handleChangeTextDone,handleDelete})
{
    const classes = useStyles();
    return (<>
        <Typography> <StopIcon className={classes.squareColor}></StopIcon>Went Well </Typography>
            <Grid container direction="column">
                <Grid onClick={() => handleAdd('wells')} item>
                    <Button className={classes.addButton} fullWidth>+</Button>
                </Grid>
                {well.map((value,key) => (
                    <Grid item key={key} className={[classes.itemBoard,classes.whiteColor].join(' ')}>
                        {
                        value.id.toString().includes('T') ?
                        <>
                            <TextField className={classes.textFieldContainer} multiline rowsMax={4} value={value.content} id={'wells'+key.toString()} onChange={handleChangeContent}></TextField>
                            <p><button id={"Done_wells_"+key.toString()+"_"+value.id} onClick={handleChangeTextDone}>Done</button> <span style={{float:'right'}}><DeleteIcon onClick={() => handleDelete("wells",value.id)}></DeleteIcon></span></p>
                            
                        </> :
                        listChangeWell.includes(value.id) ?
                        <>
                            <TextField className={classes.textFieldContainer} multiline rowsMax={4} value={value.content} id={'wells_'+key.toString()} onChange={handleChangeContent}></TextField>
                            <p><button className={classes.doneButton} id={"Done_wells_"+key.toString()+"_"+value.id} onClick={handleChangeTextDone}>Done</button> <span style={{float:'right'}}><DeleteIcon onClick={() => handleDelete("wells",value.id)}></DeleteIcon></span></p>
                         
                        </> :
                        <>
                            <Button style={{float:'right'}}><EditIcon className={classes.whiteColor} onClick={() => handleChangeContentClick('wells',value.id)}></EditIcon></Button>
                            <Typography className={classes.contentStyle} style={{clear:'right'}}>{value.content}</Typography>
                        </>}
                    </Grid>
                ))}
            </Grid>
    </>);
}