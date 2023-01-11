import { API_URL } from "./config";

export async function deleteItem(packingListId: string): Promise<void> {
  await fetch(`${API_URL}/${packingListId}`, {
    method: "DELETE",
  });
}
