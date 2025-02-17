import { getOrdersFromLocalStorage } from "../utils/utils";
import { showOrdersListFromLocalStorage } from "./showOrdersListFromLocalStorage";

export function removeOrderFromLocalStorage(index: number) {
  const orders = getOrdersFromLocalStorage();
  orders.splice(index, 1);
  localStorage.setItem('orders', JSON.stringify(orders));
  showOrdersListFromLocalStorage();
}

