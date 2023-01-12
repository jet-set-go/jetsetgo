import { API_URL } from "./config";
import { TItem } from "./getItems";

export async function checkItem(input: TItem, tripId: string): Promise<TItem> {
  const response = await fetch(`${API_URL}/${tripId}/${input._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      item: input,
    }),
  });
  return response.json();
}
