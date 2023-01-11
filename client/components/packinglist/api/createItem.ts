import { API_URL } from "./config";
import { TItem } from "./getItems";

export async function createItem(input: string): Promise<TItem> {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: input,
      checked: false,
    }),
  });
  console.log("respones", response);
  return response.json();
}
