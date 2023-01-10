import { API_URL } from "./config";

//packing list Item
export interface TItem {
  title: string;
  _id: string;
  packed: boolean;
}

export async function getItems(): Promise<TItem[]> {
  const response = await fetch(`${API_URL}`);
  return response.json();
}
