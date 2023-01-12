import { API_URL } from "./config";
import { TItem } from "./getItems";

// export async function checkItem(input: TItem, tripId: string): Promise<TItem> {
//   const response = await fetch(`${API_URL}/${tripId}/${input._id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       item: input,
//     }),
//   });
//   return response.json();
// }

export async function checkItem(
  tripId: string,
  packingListId: string
): Promise<void> {
  const response = await fetch(`${API_URL}/${tripId}/${packingListId}`, {
    method: "PATCH",
  });
  console.log("response", response);
  const result = await response.json();
  return result;
}

// export async function createItem(
//   input: string,
//   tripId: string
// ): Promise<TItem[]> {
//   console.log("input:", input);
//   console.log("tripId", tripId);
//   const response = await fetch(`${API_URL}/${tripId}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       item: input,
//     }),
//   });
//   const result: TItem[] = await response.json();

//   return result;
// }
