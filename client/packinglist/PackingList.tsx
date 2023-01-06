
import React,{useState, useEffect} from 'react'
import './packlist.css';
import Checkbox from '@mui/material/Checkbox';
import { deleteItem } from './api/deleteItem';
import { getItems } from './api/getItems';
import { createItem } from './api/createItem';
import { TList } from './api/getItems';


const PackingList= () => {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  //set input state
  const [input, setInput]= useState('');
  //set list state
  const[lists, setList]= useState<TList[]>([])
 

  const [checked, setChecked] = useState([0]);


  //when adding a new item
  async function handleCreateItem(e: React.FormEvent){
      
      e.preventDefault();
      //declare const list and assign the awaited result of response.json 
      const list = await createItem(input)
      //append  to the list state from backend
      setList([...lists,list])
      //clear out input when done
      setInput("")

  }

  //function for delete item button
  async function handleDelete(packingListId: string){
    await deleteItem(packingListId)
    //set new state to the list filtered
    setList(lists.filter((list)=>list._id !== packingListId))
  }

  useEffect(()=>{
    async function fetchItems (){
      const newList = await getItems();
      setList(newList)
    }
    fetchItems()
  },[]);

// //wheverload page all items are shown
//   useEffect(()=>{
//     async function fetchItems (){
//       const newList = await getItems();
//       setList(newList)
//     }
//     fetchItems()
//   },[]);



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
          id= "packing-input"
          value= {input}
          placeholder="Enter a item.."
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=> 
          //save what they type
              setInput(e.target.value)
         }/>
         <button className='button-addItem'>Add Item</button>
    </form>
    </div>
  )
  
}

export default PackingList;
