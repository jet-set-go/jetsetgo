 import mongoose from 'mongoose'
 
 interface ListItem {
    name: string;
    checked: boolean;
 }

 export const packingListItemSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    checked: {type: Boolean, required: true}
})