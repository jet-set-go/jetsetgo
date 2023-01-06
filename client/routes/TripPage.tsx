import React, {useState, useEffect} from 'react';
import PackingList from '../packinglist/packinglist';



export const TripContext= React.createContext()




type TList= {
    title:string,
    _id: string,
  }



const TripPage = () => {


    const taskContextValue ={
        handleCreateItem,
        handeDelete,
    }

    const[lists, setList]= useState<TList[]>([])
  //keep track of what the  item is
  const [item, setItem]= useState('');


  async function handleCreateItem(e: React.FormEvent){
    //submitting form will refresh page unless this is there
    e.preventDefault();
    //presist the data
    const response= await fetch('http:localhost:3000/tripdetails/:id/packingList', {
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
  await fetch('http:localhost:3000/tripdetails/:id/packingList/${packingListId}', {
    method: 'DELETE',
  });
  setList(lists.filter((list)=>list._id !== packingListId))
}



  return (
    <TripContext.Provider value= {taskContextValue}>
    <div id= "packingarea">
    <h3> Packing List</h3>
    </div>

<div id="packinglist">
<PackingList id = "allitems" lists ={lists}/>
</div>
</TripContext.Provider>
  )
 
};

export default TripPage;