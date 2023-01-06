import { API_URL } from "./config";

export async function createItem (item:string){
    const response= await fetch(`${API_URL}`, {
        method: 'POST',
        body: JSON.stringify({
          item,
        }),
        headers: {
          "Content-Type": 'application/json',
        }
      });
      return response.json();
}

