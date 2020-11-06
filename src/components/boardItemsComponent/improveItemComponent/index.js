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
        backgroundColor: '#e91e63',
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
        color: '#e91e63',
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


export default function ImproveColumn({improve,listChangeImprove,handleAdd,handleChangeContentClick,handleChangeContent,handleChangeTextDone,handleDelete}){
    const classes = useStyles();
    return (<><Typography>  <StopIcon className={classes.squareColor}></StopIcon>To Improve</Typography>
        <Grid container direction="column">
            <Grid onClick={() => handleAdd("improves")} item>
                <Button className={classes.addButton} fullWidth>+</Button>
            </Grid>
            {improve.map((value,key) => (
                <Grid item key={key} className={[classes.itemBoard,classes.whiteColor].join(' ')}>
                    {
                    value.id.toString().includes('T') ?
                    <>
                        <TextField className={classes.textFieldContainer} multiline rowsMax={4} value={value.content} id={'improves_'+key.toString()} onChange={handleChangeContent}></TextField>
                        <p><button id={"Done_improves_"+key.toString()+"_"+value.id} onClick={handleChangeTextDone}>Done</button> <span style={{float:'right'}}><DeleteIcon onClick={() => handleDelete("improves",value.id)}></DeleteIcon></span></p>
                    </> :
                    listChangeImprove.includes(value.id) ?
                    <>
                        <TextField className={classes.textFieldContainer} multiline rowsMax={4} value={value.content} id={'improves_'+key.toString()} onChange={handleChangeContent}></TextField>
                        <p><button className={classes.doneButton} id={"Done_improves_"+key.toString()+"_"+value.id} onClick={handleChangeTextDone}>Done</button> <span style={{float:'right'}}><DeleteIcon onClick={() => handleDelete("improves",value.id)}></DeleteIcon></span></p>
                    </> :
                    <>
                        <Button style={{float:'right'}}><EditIcon className={classes.whiteColor} onClick={() => handleChangeContentClick('improves',value.id)}></EditIcon></Button>
                        <Typography className={classes.contentStyle} style={{clear:'right'}}>{value.content}</Typography>
                    </>}
                </Grid>
            ))}
        </Grid>
    </>);
}