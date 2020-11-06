import {Button, Grid, makeStyles, TextField } from '@material-ui/core';
import React , {useState,useEffect} from 'react'
import { useLocation} from 'react-router-dom';
import Header from '../headerComponent';
import BoardItems from '../boardItemsComponent';
import URL from '../url';

const useStyles = makeStyles({
    background: {
        backgroundColor: '#2196f3',
    },
    title: {
        flexGrow: 1,
    },
    boardContainer: {
        marginTop: '1.5em',
      
    },
    itemBoard:{
        borderWidth: '1px',
        borderColor: 'black',
        borderStyle: 'solid',
        marginRight: '1em'
    },
    changeNameButton: {
        marginLeft: '1em',
        backgroundColor: '#00c853',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#00a946',
            color: '#ffffff',
        }
    },
    textFieldChangeName:{
        marginLeft: '1em'
    }
});



export default function DetailBoard(props){   
    const [idBoard,setIDBoard] = useState(0);
    const [nameBoard, setNameBoard] = useState('');
    const [well,setWell] = useState([]);
    const [improve,setImprove] = useState([]);
    const [action,setAction] = useState([]);
    const [listChangeWell,setListChangeWell] = useState([]);
    const [listChangeImprove,setListChangeImprove] = useState([]);
    const [listChangeAction,setListChangeAction] = useState([]);
    const [tempId,setTempId] = useState(0);
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    const classes = useStyles();
    const query = useQuery();

    useEffect(() => {
        const getData = async () => {
            const bearer = 'Bearer ' + localStorage.getItem('token');
            const data = await fetch(URL.getUrl()+"boards/"+ query.get('id'),{
                method: 'GET',
                headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : bearer})});
            const result = await data.json();
            setIDBoard(result[0].id);
            setNameBoard(result[0].name)
            setWell(result[0].Wells);
            setImprove(result[0].Improves);
            setAction(result[0].Actions);
        }
        getData();
    }, []);

    const upsertContent = async (tableName,object) => {
        const id = object.id;
        if(id.toString().includes('T'))
        {
            object = {...object, id: ''};
        }
        const idWell =  object.id !== undefined ? object.id : '';
        const wellContent = object.content.trim().replaceAll(' ','+');
        const url = URL.getUrl()+"boards/" + idBoard.toString() + "/" + tableName + "?id="+ idWell +"&content=" + wellContent;
        const bearer = 'Bearer ' + localStorage.getItem('token');
        const response = await fetch(url,{
        mode: 'cors',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': bearer
        }}); 
        const data = await response.json();
        if(tableName === 'wells')
        {
            const tempWell = well.slice();
            tempWell.forEach(element => {
                if(element.id.toString() === id.toString())
                {
                    element.id = data.id;
                }
            });
            setWell(tempWell);
        }
        if(tableName === 'improves')
        {
            const tempImproves = improve.slice();
            tempImproves.forEach(element => {
                if(element.id.toString() === id.toString())
                {
                    element.id = data.id;
                }
            });
            setImprove(tempImproves);
        }
        if(tableName === 'actions')
        {
            const tempActions = action.slice();
            tempActions.forEach(element => {
                if(element.id.toString() === id.toString())
                {
                    element.id = data.id;
                }
            });
            setAction(tempActions);
        }
    }

    const handleAdd = (className) => {
        const object = {};
        object.content = 'Blank content';
        object.id = 'T' + tempId;
        if(className==="wells")
        {
            setWell([object,...well]);
        }
        if(className==="improves")
        {
            setImprove([object,...improve]);
        }
        if(className==="actions")
        {
            setAction([object,...action]);
        }
        setTempId(tempId+1);        
    }

    const handleChangeContentClick = (className,i) => {
        if(className==="wells")
        {
            setListChangeWell([...listChangeWell,i])
        }
        if(className==="improves")
        {
            setListChangeImprove([...listChangeImprove,i])
        }
        if(className==="actions")
        {
            setListChangeAction([...listChangeAction,i])
        }
    }
    

    const handleChangeContent = (e) => {
        const newContent = e.target.value;
        const className = e.target.id.split('_')[0];
        const id = e.target.id.split('_')[1];
        if(className==="wells")
        {
            const tempWell = [...well];
            tempWell[id].content = newContent;
            setWell(tempWell);
        }
        if(className==="improves")
        {
            const tempImprove = [...improve];
            tempImprove[id].content = newContent;
            setImprove(tempImprove);
        }
        if(className==="actions")
        {
            const tempAction = [...action];
            tempAction[id].content = newContent;
            setAction(tempAction);
        }
    }


    const handleChangeTextDone = (e) => {
        const splitedId = e.target.id.split('_');
        const columnName = splitedId[1];
        const idOfChangeObjectInList = splitedId[2]; 
        const idOfChangeObjectInListChange = parseInt(splitedId[3]); 
        let object;
        if(columnName === "wells")
        {
            listChangeWell.splice(listChangeWell.indexOf(idOfChangeObjectInListChange),1);
            setListChangeWell([...listChangeWell]);
            object = well[idOfChangeObjectInList]
        }
        if(columnName === "improves")
        {
            listChangeImprove.splice(listChangeImprove.indexOf(idOfChangeObjectInListChange),1);
            setListChangeImprove([...listChangeImprove]);
            object = improve[idOfChangeObjectInList]
        }
        if(columnName === "actions")
        {
            listChangeAction.splice(listChangeAction.indexOf(idOfChangeObjectInListChange),1);
            setListChangeAction([...listChangeAction]);
            object = action[idOfChangeObjectInList]
        }        
        upsertContent(columnName,object);
    }

    const deleteInDatabase = async (nameTable,id) => {
        const url = URL.getUrl()+"boards/" + idBoard.toString() + "/" + nameTable + "/delete" + "?id="+ id;
        const bearer = 'Bearer ' + localStorage.getItem('token');
        await fetch(url,{
            mode: 'cors',
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': bearer
        }}); 
    }

    const handleDelete = (nameTable,id) => {

        if(!id.toString().includes('T'))
            deleteInDatabase(nameTable,id);

        if(nameTable === "wells")
        {
            const tempWell = well.slice();

            tempWell.forEach((value,i) => {
                if(value.id.toString() === id.toString())
                {
                    tempWell.splice(i,1);   
                }
            })
            setWell(tempWell);
        }
        if(nameTable === "improves")
        {
            const tempImprove = improve.slice();

            tempImprove.forEach((value,i) => {
                if(value.id.toString() === id.toString())
                {
                    tempImprove.splice(i,1);   
                }
            })
            setImprove(tempImprove);
        }
        if(nameTable === "actions")
        {
            const tempAction = action.slice();

            tempAction.forEach((value,i) => {
                if(value.id.toString() === id.toString())
                {
                    tempAction.splice(i,1);   
                }
            })
            setAction(tempAction);
        }
    }

    const handleChangeNameBoard = (e) => {
        setNameBoard(e.target.value)
    }

    const handleClickChangeName = async () => {
        const url = URL.getUrl()+"boards/" + idBoard.toString() + "/change" + "?id="+ idBoard;
        const bearer = 'Bearer ' + localStorage.getItem('token');
        await fetch(url,{
            mode: 'cors',
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify({
            name: nameBoard,
        })});
    }

    return (
        <>
            <Header></Header>
            <br></br>
            <div>
                <TextField className={classes.textFieldChangeName} type="text" value={nameBoard} onChange={handleChangeNameBoard}></TextField>
                <Button size="small" className={classes.changeNameButton} onClick={handleClickChangeName}>Save</Button>
            </div>
            <Grid container className={classes.boardContainer}>
                <BoardItems well={well} improve={improve} action={action}
                handleAdd = {handleAdd} handleChangeContentClick={handleChangeContentClick}
                listChangeWell={listChangeWell} listChangeImprove={listChangeImprove} listChangeAction={listChangeAction}
                handleChangeContent={handleChangeContent}
                handleChangeTextDone={handleChangeTextDone}
                handleDelete={handleDelete}></BoardItems>
            </Grid>
        </>);
}
