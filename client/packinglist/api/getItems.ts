import { API_URL } from "./config";

//packing list Item
export interface TList {
    title:string;
    _id: string;
  }


export async function getItems():Promise<TList[]>{
    const response  = await fetch(`${API_URL}`)
    return response.json()
}


