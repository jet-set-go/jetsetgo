import { API_URL } from "./config";
import { TItem } from "./getItems";

export async function checkItem(
  tripId: string,
  packingListId: string
): Promise<TItem> {
  const response = await fetch(`${API_URL}/${tripId}/${packingListId}`, {
    method: "PATCH",
  });
  console.log("response", response);
  const result: TItem = await response.json();
  return result;
}
