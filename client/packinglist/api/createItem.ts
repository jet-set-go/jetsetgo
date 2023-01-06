import { API_URL } from "./config";

export async function createItem (input:string){
    const response= await fetch(`${API_URL}`, {
        method: 'POST',
        body: JSON.stringify({
          input,
        }),
        headers: {
          "Content-Type": 'application/json',
        }
      });
      return response.json();
}

