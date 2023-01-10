import { API_URL } from "./config";
import { TItem } from "./getItems";

export async function createItem(input: string): Promise<TItem> {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    body: JSON.stringify({
      title: input,
      packed: false,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
