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
import { IconButton, Input, TextField } from "@mui/material";
// import Input from "@mui/joy/Input";
import LuggageIcon from "@mui/icons-material/Luggage";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Form, useParams } from "react-router-dom";
import { ITrip } from "../../../src/models/trip";
import { ObjectId } from "mongoose";

interface PackingListProps {
  trip: ITrip & { _id: ObjectId };
}

const PackingList: React.FC<PackingListProps> = ({ trip }) => {
  //set input state
  const [input, setInput] = useState("");
  //set list state
  const [items, setItems] = useState<TItem[]>(trip.packingList);
  //check off
  // const [checked, setChecked] = React.useState([0]);

  async function handleCreateItem(e: React.MouseEvent) {
    //declare const list and assign the awaited result of response.json
    const newItems = await createItem(input, trip._id.toString());
    //append  to the list state from backend
    setItems(newItems);

    //clear out input when done
    setInput("");
  }

  //for todo list...trying to get it to save to DB
  async function handleCheckItem(item) {
    const newItems = await checkItem(trip._id.toString(), item.toString());
    setItems(newItems);
  }

  async function handleDelete(item) {
    console.log("item", item);
    const newItems = await deleteItem(trip._id.toString(), item.toString());
    setItems(newItems);
  }

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
        {items.map((item, index) => {
          const labelId = `checkbox-list-label-${item.name}`;

          return (
            <ListItem
              key={index}
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
                    checked={item.checked}
                    color='success'
                    onClick={() => handleCheckItem(item._id)}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${item.name}`} />
              </ListItemButton>
            </ListItem>
          );
        })}

        <div className={styles.packingInput}>
          {<LuggageIcon />}
          <Input
            placeholder='Lets pack…'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            size='small'
            value='soft'
            className={styles.addButton}
            onClick={handleCreateItem}
            color='success'
          >
            Add Item
          </Button>
        </div>
      </List>
    </Grid>
  );
};

// const testPack = [{ name: "Shorts" }, { name: "Shirts" }, { name: "Pants" }];

export default PackingList;
