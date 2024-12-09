import { TripSet } from "../context/tripDetailsContext";

export function convertDate(rowDate: string | number | Date) {
  const date = new Date(rowDate);
  return date ? date.toLocaleDateString() : "";
}

export function sortByDate(arrayData: TripSet[], asc = false) {
  const arr1 = arrayData
    .filter((obj): obj is TripSet => obj !== undefined)
    .map((obj: TripSet) => ({
      ...obj,
      checkInDate: new Date(obj.checkInDate),
    }))
  const sortedAsc = arr1.sort(
    (objA, objB) =>
      Number(asc ? objA?.checkInDate : objB?.checkInDate) -
      Number(asc ? objB?.checkInDate : objA?.checkInDate)
  );
  return sortedAsc;
}