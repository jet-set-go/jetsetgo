import { API_URL } from "./config";
import { TItem } from "./getItems";

export async function checkItem(input: TItem): Promise<TItem> {
  const response = await fetch(`${API_URL}/${input._id}`, {
    method: "PUT",
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
