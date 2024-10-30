import { CENA_NETTO } from "../consts/consts";
import { orderTypes } from "../consts/mappings";
import { Order } from "../types/types";
import { getOrdersFromLocalStorage } from "../utils/utils";

export function addOrderToLocalStorage(params: Order) {
  const orders: Order[] = getOrdersFromLocalStorage();
  const url = params.url;
  const type = params.type;
  const textContent = params.textContent;
  const addToLastOrder = params.addToLastOrder;
  const queriesString = params.queriesString;
  console.log(queriesString);
  if (addToLastOrder && orders.length && type as unknown as string === orderTypes.multi) {
    const lastOrder = orders.shift();
    lastOrder.textContent += textContent;
    lastOrder.lastRowNumber = params.lastRowNumber;
    lastOrder.queriesString = queriesString;
    lastOrder.cenaNetto += parseFloat(document.getElementById(CENA_NETTO)!.innerText);
    orders.unshift(lastOrder);
  } else {
    const newOrder: Order = {
      textContent: textContent,
      url: url,
      queriesString: queriesString,
      type: type as typeof orderTypes,
      lastRowNumber: 1,
      cenaNetto: parseFloat(document.getElementById(CENA_NETTO)!.innerText),
      surface: 0
    };
    orders.unshift(newOrder);
    console.log(orders);
  }
  setTimeout(function() {
    document.querySelector('.changed')?.classList.remove('changed');
  }, 1500);
  localStorage.setItem('orders', JSON.stringify(orders));
}