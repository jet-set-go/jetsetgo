import React, { useState, useEffect } from "react";
import { deleteItem } from "./api/deleteItem";
import { getItems } from "./api/getItems";
import { createItem } from "./api/createItem";
import { checkItem } from "./api/checkItem";
import { TItem } from "./api/getItems";
import styles from "./PackingList.module.css";
import axios from "axios";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
// import Input from "@mui/joy/Input";
import LuggageIcon from "@mui/icons-material/Luggage";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { ITrip } from "../../../src/models/trip";
import { ObjectId } from "mongoose";

interface PackingListProps {
  trip: ITrip & { _id: ObjectId };
}

const PackingList: React.FC<PackingListProps> = ({ trip }) => {
  //set input state
  const [input, setInput] = useState("");
  //set list state
  const [items, setItems] = useState<TItem[]>([]);
  //check off
  // const [checked, setChecked] = React.useState([0]);

  async function handleCreateItem(e: React.FormEvent) {
    e.preventDefault();
    //declare const list and assign the awaited result of response.json
    const item = await createItem(input, trip._id.toString());
    //append  to the list state from backend
    setItems([...items, item]);

    //clear out input when done
    setInput("");
  }

  //for todo list...trying to get it to save to DB
  async function handleCheckItem(index: number) {
    const newItemList = [...items];
    //declare const list and assign the awaited result of response.json
    newItemList[index].checked = true;
    //append  to the list state from backend
    setItems(newItemList);
  }

  //function for delete item button
  // async function handleDelete(input, trip._id.toString()) {
  //   await deleteItem(packingListId);
  //   //set new state to the list filtered
  //   setItems(items.filter((item) => item._id !== packingListId));
  // }

  //will grab the items associated with the trip and update everytime it changes
  useEffect(() => {
    async function fetchItems() {
      const newItems = await getItems(trip._id.toString());
      setItems(newItems);
    }
    fetchItems();
  }, []);

  //form is for the bottom of the packing list to add another item
  return (
    <Grid item xs={12} md={6}>
      <Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
        Packing List:
      </Typography>

      <List
        sx={{
          width: "25%",
          maxWidth: 360,
          height: "40%",
          maxHeight: 400,
          position: "fixed",
          scrollBehavior: "inherit",
        }}
      >
        {items.map((item) => {
          const labelId = `checkbox-list-label-${item.name}`;

          return (
            <ListItem
              key={item._id}
              secondaryAction={
                <IconButton
                  aria-label='delete'
                  size='small'
                  // onClick={() => handleDelete(item._id)}
                >
                  <DeleteIcon fontSize='small' />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                // onClick={handleToggle(item)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge='start'
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                    defaultChecked
                    color='success'
                    onClick={handleCheckItem(item)}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${item.name}`} />
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
              size='small'
              value='soft'
              onClick={handleCreateItem}
              className={styles.addButton}
              // variant='contained'
              color='success'
            >
              Add Item
            </Button>
          }
        />
      </List>
    </Grid>
  );
};

const testPack = [
  {
    name: "Shorts",
    checked: false,
    _id: "1101",
  },
  {
    name: "Shirts",
    checked: false,
    _id: "1102",
  },
  {
    name: "Pants",
    checked: false,
    _id: "1103",
  },
];

// const testPack = [{ name: "Shorts" }, { name: "Shirts" }, { name: "Pants" }];

export default PackingList;
