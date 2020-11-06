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
        backgroundColor: '#9c27b0',
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
        color: '#9c27b0',
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


export default function ActionColumn({action,listChangeAction,handleAdd,handleChangeContentClick,handleChangeContent,handleChangeTextDone,handleDelete}){
    const classes = useStyles();
    return (<><Typography>  <StopIcon className={classes.squareColor}></StopIcon>Action Items</Typography>
        <Grid onClick={() => handleAdd('actions')} item>
            <Button className={classes.addButton} fullWidth>+</Button>
        </Grid>
        <Grid container direction="column">
            {action.map((value,key) => (
                <Grid item key={key} className={[classes.itemBoard,classes.whiteColor].join(' ')}>
                    {
                    value.id.toString().includes('T') ?
                    <>
                        <TextField className={classes.textFieldContainer} multiline  value={value.content} id={'actions_'+key.toString()} onChange={handleChangeContent}></TextField>
                        <p><button id={"Done_actions_"+key.toString()+"_"+value.id} onClick={handleChangeTextDone}>Done</button> <span style={{float:'right'}}><DeleteIcon onClick={() => handleDelete("actions",value.id)}></DeleteIcon></span></p>
                    </> :
                    listChangeAction.includes(value.id) ?
                    <>
                        <TextField className={classes.textFieldContainer} multiline  value={value.content} id={'actions_'+key.toString()} onChange={handleChangeContent}></TextField>
                        <p><button className={classes.doneButton} id={"Done_actions_"+key.toString()+"_"+value.id} onClick={handleChangeTextDone}>Done</button> <span style={{float:'right'}}><DeleteIcon onClick={() => handleDelete("actions",value.id)}></DeleteIcon></span></p>
                    </> :
                    <>
                        <Button style={{float:'right'}}><EditIcon className={classes.whiteColor} onClick={() => handleChangeContentClick('actions',value.id)}></EditIcon></Button>
                        <Typography className={classes.contentStyle} style={{clear:'right'}}>{value.content}</Typography>
                    </>}
                </Grid>
            ))}
        </Grid>
    </>);
}