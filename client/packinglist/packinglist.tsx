
import React,{useState, useEffect, useContext} from 'react'
import './packlist.css';
import Checkbox from '@mui/material/Checkbox';
import { deleteItem } from './api/deleteItem';
import { getItems } from './api/getItems';
import { createItem } from './api/createItem';
import { TList } from './api/getItems';

//define the type for the list for typescript



function PackingList  () {

    //const {handleCreateItem,handleDelete}= useContext(taskContextValue)

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  //keep track of total list
  const[lists, setList]= useState<TList[]>([])
  //keep track of what the  item is
  const [item, setItem]= useState('');

  const [checked, setChecked] = useState([0]);


  //when adding a new item
  async function handleCreateItem(e: React.FormEvent){
      
      e.preventDefault();
      //declare const list and assign the awaited result of response.json 
      const list = await createItem(item)
      //append  to the list state from backend
      setList([...lists,list])
      //clear out input when done
      setItem("")

  }

  //function for delete item button
  async function handleDelete(packingListId: string){
    await deleteItem(packingListId)
    //set new state to the list filtered
    setList(lists.filter((list)=>list._id !== packingListId))
  }

//get all packing list for that trip
  useEffect(()=>{
    async function fetchItems (){
      const newList = await getItems();
      setList(newList)
    }
    fetchItems()
  },[]);



  //form is for the bottom of the packing list to add another item 
  return (
  <div className= "PackingList"> 
    <ul className= "items">
      {lists.map((list)=>(
          <li key= {list._id}>
            <Checkbox  {...label} defaultChecked />
            <button onClick={()=>handleDelete(list._id)}>X</button>
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

export default PackingList;
