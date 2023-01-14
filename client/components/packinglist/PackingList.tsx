import React, { useState, useEffect } from "react";
import { deleteItem } from "./api/deleteItem";
import { getItems } from "./api/getItems";
import { createItem } from "./api/createItem";
import { checkItem } from "./api/checkItem";
import { TItem } from "./api/getItems";
import styles from "./PackingList.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import LuggageOutlinedIcon from "@mui/icons-material/LuggageOutlined";
import {
  Card,
  IconButton,
  Input,
  TextField,
  CardContent,
  CardMedia,
} from "@mui/material";
// import Input from "@mui/joy/Input";
import LuggageIcon from "@mui/icons-material/Luggage";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ITrip } from "../../../src/models/trip";
import { ObjectId } from "mongoose";
import { orange, amber, cyan, lightBlue } from "@mui/material/colors";

interface PackingListProps {
  trip: ITrip & { _id: ObjectId };
}

//oranges
const primary = orange["A400"];
const accent = orange["A100"];
const accent2 = amber[500];
//blues
const primaryBlue = cyan["A400"];
const accentBlue = cyan["A100"];
const accent2Blue = cyan[500];
const accent3Blue = cyan["A900"];
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
    newItems.sort((a, b) => (a.checked ? 1 : -1));

    //append  to the list state from backend
    setItems(newItems);
    //clear out input when done

    setInput("");
  }

  //for todo list...trying to get it to save to DB
  async function handleCheckItem(item: TItem) {
    const newItems = await checkItem(trip._id.toString(), item.toString());
    newItems.sort((a, b) => (a.checked ? 1 : -1));

    setItems(newItems);
  }
  //handleDelete gets the argument of the item._id
  async function handleDelete(itemId: TItem) {
    const remainingItems = await deleteItem(
      trip._id.toString(),
      itemId.toString()
    );
    remainingItems.sort((a, b) => (a.checked ? 1 : -1));
    setItems(remainingItems);
  }

  //will grab the items associated with the trip and update everytime it changes
  useEffect(() => {
    async function fetchItems() {
      const newItems = await getItems(trip._id);
      newItems.sort((a, b) => (a.checked ? 1 : -1));
      setItems(newItems);
    }
    fetchItems();
  }, []);

  //form is for the bottom of the packing list to add another item
  return (
    <Card sx={{ width: "64%", maxWidth: "100%", minWidth: "250px" }}>
      <CardMedia
        sx={{ height: 70 }}
        image='https://cdn.packhacker.com/2022/06/d78f3bdf-vpl-flatlay.jpg?auto=compress&auto=format&w=1050&h=700&fit=crop'
        //image='https://media.istockphoto.com/id/1417417189/vector/vector-set-with-suitcases-bags-and-backpacks-for-travel-different-types-of-hand-luggage.jpg?s=612x612&w=0&k=20&c=D5PAQYQsg18tus_uczB6kmZfNypP_P5OJNi-jalSB3Y='
      ></CardMedia>
      <Grid item xs={3} md={4}>
        <Typography sx={{ mt: 1, mb: 1 }} variant='subtitle1'>
          Packing List:
        </Typography>

        <List
          sx={{
            width: "25%",
            maxWidth: "100%",
            height: "40%",
            position: "fixed",
            scrollBehavior: "inherit",
            maxHeight: "100%",
            overflow: "auto",
            minWidth: "250px",
          }}
        >
          <CardContent
            sx={{
              width: "100%",
              bgcolor: primary,
              borderRadius: 1,
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
                        icon={<LuggageOutlinedIcon />}
                        checkedIcon={<LuggageIcon />}
                        inputProps={{ "aria-labelledby": labelId }}
                        checked={item.checked}
                        onClick={() => handleCheckItem(item._id)}
                        sx={{
                          color: accent[Symbol],
                          "&.Mui-checked": {
                            color: accent,
                          },
                        }}
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
                value='soft'
                size='small'
                className={styles.addButton}
                onClick={handleCreateItem}
                sx={{
                  backgroundColor: accent2,
                  "&:hover": { backgroundColor: accent },
                }}
                variant='contained'
              >
                Add Item
              </Button>
            </div>
          </CardContent>
        </List>
      </Grid>
    </Card>
  );
};

// const testPack = [{ name: "Shorts" }, { name: "Shirts" }, { name: "Pants" }];

export default PackingList;
