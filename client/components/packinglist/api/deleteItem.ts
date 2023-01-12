import { API_URL } from "./config";

export async function deleteItem(
  tripId: string,
  packingListId: string
): Promise<void> {
  const response = await fetch(`${API_URL}/${tripId}/${packingListId}`, {
    method: "DELETE",
  });
  console.log("response", response);
  const result = await response.json();
  return result;
}
