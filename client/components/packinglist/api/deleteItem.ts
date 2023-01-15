// import { API_URL } from "./config";
// import { TItem } from "./getItems";
// export async function deleteItem(
//   tripId: string,
//   packingListId: string
// ): Promise<TItem> {
//   const response = await fetch(`${API_URL}/${tripId}/${packingListId}`, {
//     method: "DELETE",
//   });
// }

import { API_URL } from "./config";
import { TItem } from "./getItems";

export async function deleteItem(
  tripId: string,
  packingListId: string
): Promise<void> {
  const response = await fetch(`${API_URL}/${tripId}/${packingListId}`, {
    method: "DELETE",
  });
  console.log("response", response);
  const result: void = await response.json();
  console.log("result", result);
  return result;
}

// export async function checkItem(
//   tripId: string,
//   packingListId: string
// ): Promise<void> {
//   const response = await fetch(`${API_URL}/${tripId}/${packingListId}`, {
//     method: "PATCH",
//   });
//   console.log("response", response);
//   const result = await response.json();
//   return result;
// }
