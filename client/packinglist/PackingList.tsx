import React, { useState, useEffect } from "react";
import { deleteItem } from "./api/deleteItem";
import { getItems } from "./api/getItems";
import { createItem } from "./api/createItem";
import { TItem } from "./api/getItems";
import styles from "./PackingList.module.css";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import { IconButton } from "@mui/material";
import Input from "@mui/joy/Input";
import LuggageIcon from "@mui/icons-material/Luggage";
import Button from "@mui/joy/Button";
import { VariantProp } from "@mui/joy/styles";
import ThemeProvider from "@mui/material/styles";

const PackingList = () => {
  // const label = { inputProps: { "aria-label": "Checkbox demo" } };

  //material ui
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  //set input state
  const [input, setInput] = useState("");
  //set list state
  //change to item
  const [items, setItem] = useState<TItem[]>([]);

  //when adding a new item
  async function handleCreateItem(e: React.FormEvent) {
    e.preventDefault();
    //declare const list and assign the awaited result of response.json
    const item = await createItem(input);
    //append  to the list state from backend
    setItem([...items, item]);
    //clear out input when done
    setInput("");
  }

  //function for delete item button
  async function handleDelete(packingListId: string) {
    await deleteItem(packingListId);
    //set new state to the list filtered
    setItem(items.filter((item) => item._id !== packingListId));
  }

  useEffect(() => {
    async function fetchItems() {
      const newItem = await getItems();
      setItem(newItem);
    }
    fetchItems();
  }, []);

  //form is for the bottom of the packing list to add another item
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {["bathing suit", "sunscreen", "snorkeling gear"].map((item) => {
        const labelId = `checkbox-list-label-${item}`;

        return (
          <ListItem
            key={item._id}
            secondaryAction={
              <IconButton
                aria-label='delete'
                size='small'
                onClick={() => handleDelete(item._id)}
              >
                <DeleteIcon fontSize='small' />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(item)} dense>
              <ListItemIcon>
                <Checkbox
                  edge='start'
                  checked={checked.indexOf(item) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${item}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
      <Input
        startDecorator={<LuggageIcon />}
        size='sm'
        placeholder='Lets pack…'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        endDecorator={
          <Button
            size='md'
            variant='outlined'
            value='soft'
            color='danger'
            onClick={handleCreateItem}
          >
            Add Item
          </Button>
        }
      />
    </List>

    //   <form onSubmit={handleCreateItem}>
    //  <label htmlFor='packing list'>Packing CheckList</label>
    //   <input
    //    id='packing-input'
    //    value={input}
    //   placeholder='Enter a item..'
    //   onChange={(e) =>
    //   //save what they type
    //   setInput(e.target.value)
    //    }
    //   />
    //   <button className='button-addItem'>Add Item</button>
    //   </form>

    // <div className={styles.container}>
    //   <ul className='items'>
    //     {items.map((item) => (
    //       <li key={item._id}>
    //         <button onClick={() => handleDelete(item._id)}>X</button>
    //         {item.title}
    //       </li>
    //     ))}
    //   </ul>

    // </div>
  );
};

export default PackingList;
