import React from 'react';
import {Grid, makeStyles} from '@material-ui/core';
import WellColumn from './wellItemComponent';
import ImproveColumn from './improveItemComponent';
import ActionColumn from './actionItemComponent';

const useStyles = makeStyles({
    boardContainer: {
        paddingTop: '1em',
        paddingLeft: '1em',
        paddingRight: '1em',
   
    },
});

export default function BoardItems({well,improve,action,
    handleAdd, handleChangeContentClick,
    listChangeWell,listChangeImprove,listChangeAction,
    handleChangeContent,
    handleChangeTextDone,
    handleDelete})
{
    const classes = useStyles();
    return (<>
        <Grid item xs={12} sm={4} md={4} lg={4} className={classes.boardContainer}>
            <WellColumn well={well} listChangeWell={listChangeWell} handleAdd={handleAdd} handleChangeContentClick={handleChangeContentClick} handleChangeContent={handleChangeContent} handleChangeTextDone={handleChangeTextDone} handleDelete={handleDelete}></WellColumn>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} className={classes.boardContainer}>
            <ImproveColumn improve={improve} listChangeImprove={listChangeImprove} handleAdd={handleAdd} handleChangeContentClick={handleChangeContentClick} handleChangeContent={handleChangeContent} handleChangeTextDone={handleChangeTextDone} handleDelete={handleDelete}></ImproveColumn>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} className={classes.boardContainer}>
            <ActionColumn action={action} listChangeAction={listChangeAction} handleAdd={handleAdd} handleChangeContentClick={handleChangeContentClick} handleChangeContent={handleChangeContent} handleChangeTextDone={handleChangeTextDone} handleDelete={handleDelete}></ActionColumn>
        </Grid>
    </>);
}