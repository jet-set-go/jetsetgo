import { API_URL } from "./config";
import { TItem } from "./getItems";

export async function createItem(
  input: string,
  tripId: string
): Promise<TItem[]> {
  const response = await fetch(`${API_URL}/${tripId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      item: input,
    }),
  });
  const result: TItem[] = await response.json();

  return result;
}
