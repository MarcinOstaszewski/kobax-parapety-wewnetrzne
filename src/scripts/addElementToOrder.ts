import { elementsListOpeningTag, entriesToAddRowNumber } from '../consts/consts';
import { currentOrderDescription } from '../consts/consts-ui-elements';
import { orderTypes } from '../consts/mappings';
import { Order } from '../types/types';
import { getFormData, getOrdersFromLocalStorage, getOrderURL } from '../utils/utils'
import { flashNewListElement, partialFormReset } from '../utils/utils-ui-updates';
import { addNewOrderToList } from './addNewOrderToList';
import { addOrderToLocalStorage } from './addOrdersToLocalStorage';
import { showOrdersListFromLocalStorage } from './showOrdersListFromLocalStorage';

export function addElementToOrder() {
  const ordersList = getOrdersFromLocalStorage();
  const lastOrder = ordersList[0] || {} as Order;
  console.log('lastOrder', lastOrder);
  const existsLastOrder = Object.keys(ordersList).length;
  const type = existsLastOrder ? lastOrder.type : null;
  if (existsLastOrder && type as unknown as string === orderTypes.multi) { // dodaje do istniejącego zamówienia
    const newRowNumber = lastOrder.lastRowNumber ? lastOrder.lastRowNumber + 1 : 1;
    const data = getFormData();
    let queriesString = lastOrder.queriesString;
    let dlugosc = 0;
    let szerokosc = 0;
    let ilosc = 0;
    let surface = 0;
    let dodatkowe = 'dodatkowe=';
    for (const entry in data) {
      if (data[entry] !== "") {
        if (entriesToAddRowNumber.includes(entry)) {
          console.log('entry', entry);
          queriesString += entry + '-row-' + newRowNumber + "=" + data[entry] + "&";
          if (entry === 'dlugosc') dlugosc = parseFloat(data[entry] as string);
          if (entry === 'szerokosc') szerokosc = parseFloat(data[entry] as string);
          if (entry === 'ilosc') ilosc = parseFloat(data[entry] as string);
        } 
      }
    }

    if (dlugosc && szerokosc && ilosc) {
      surface = dlugosc * szerokosc * ilosc;
      queriesString += 'powierzchnia=' + surface + '&';
      console.log('Powierzchnia zamówienia wynosi: ' + surface);
      dodatkowe += 'Powierzchnia zamówienia wynosi: ' + surface; // (surface / 1000000).toFixed(3) + 'm² ';
    }
  
    if (dodatkowe) {
      queriesString += dodatkowe + "&";
    }


    const url = getOrderURL();
    let textContent = currentOrderDescription.innerHTML;
    textContent = textContent.substring(textContent.lastIndexOf(elementsListOpeningTag));
    addOrderToLocalStorage({
      textContent: textContent,
      url: url,
      queriesString: queriesString,
      type: type,
      lastRowNumber: newRowNumber,
      addToLastOrder: true
    });
    partialFormReset();
    showOrdersListFromLocalStorage();
    flashNewListElement();
  } else {
    addNewOrderToList(orderTypes.multi);
  }
}

//   let dlugosc = 0;
//   let szerokosc = 0;
//   let surface = 0;
//   let dodatkowe = 'dodatkowe=';

//   for (const entry in data) {
//     if (data[entry] !== "") {
//       let value = entry ;
//       if (entriesToAddRowNumber.includes(entry)) {
//         value += '-row-' + 1;
//       }
//       if (entry === 'rabat' && data[entry] !== '0') {
//         dodatkowe += 'Rabat:' + data[entry] + '%& /n';
//       }
//       if (entry === 'dlugosc') dlugosc = parseFloat(data[entry] as string);
//       if (entry === 'szerokosc') szerokosc = parseFloat(data[entry] as string);
//       queriesString += value + "=" + data[entry] + "&";
//     }
//   }
//   if (dlugosc && szerokosc) {
//     surface = dlugosc * szerokosc;
//     console.log('Powierzchnia zamówienia wynosi: ' + surface);
//     dodatkowe += 'Powierzchnia zamówienia wynosi: ' + (surface / 1000000).toFixed(3) + 'm² ';
//   }

//   if (dodatkowe) {
//     queriesString += dodatkowe;  //  + "&";
//   }