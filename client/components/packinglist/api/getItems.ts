import { API_URL } from "./config";

//packing list Item
export interface TItem {
  name: string;
  checked: boolean;
  _id: string;
}

export async function getItems(tripId): Promise<TItem[]> {
  const response = await fetch(`${API_URL}`);
  console.log("respones", response);
  return response.json();
}
