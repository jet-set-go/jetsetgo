
import React,{useState, useEffect} from 'react'
import './packlist.css';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';


//define the type for the list for typescript
type TList= {
  title:string,
  _id: string,
}


function packinglist  () {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  //keep track of total list
  const[lists, setList]= useState<TList[]>([])
  //keep track of what the  item is
  const [item, setItem]= useState('');

  const [checked, setChecked] = useState([0]);


  async function handleCreateItem(e: React.FormEvent){
      //submitting form will refresh page unless this is there
      e.preventDefault();
      //presist the data
      const response= await fetch('http:localhost:3000/:id/packingList', {
        method: 'POST',
        body: JSON.stringify({
          item,
        }),
        headers: {
          "Content-Type": 'application/json',
        }
      })
      const list = await response.json()
      //append the list that got from backend
      setList([...lists,list])
      //clear out input when done
      setItem("")

  }

  //connected to button that deleted the list item user doesn't want
  async function handeDelete(packingListId: string){
    await fetch('http:localhost:3000/:id/packingList/${packingListId}', {
      method: 'DELETE',
    });
    setList(lists.filter((list)=>list._id !== packingListId))
  }

//get all packing list for that trip
  useEffect(()=>{
    async function fetchItems (){
      const newList = await fetch('http:localhost:3000/:id/packingList').then(
        (response)=> response.json()
      )
      setList(newList)
    }
    fetchItems()
  },[]);



  //form is for the bottom of the packing list to add another item 
  return (
  <div className= "PackingList"> 
  //each item will be listed here
    <ul className= "items">
      {lists.map((list)=>(
          <li key= {list._id}>
            <Checkbox  {...label} defaultChecked />
            <button onClick={()=>handeDelete(list._id)}>X</button>
            {list.title}</li>
        ))}

    </ul>
  
    <form onSubmit={handleCreateItem}>
        <label htmlFor="packing list">Packing CheckList</label>
        <input 
          id= "packing-item"
          value= {item}
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          //save what they type
              setItem(e.target.value)
         }/>
         <button>Add Item</button>
    </form>
    </div>
  )
  
}

export default packinglist;
