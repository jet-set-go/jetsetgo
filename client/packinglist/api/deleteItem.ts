import { API_URL } from "./config";

export async function deleteItem(packingListId: string){
    await fetch(`${API_URL}/${packingListId}`, {
        method: 'DELETE',
      });
}