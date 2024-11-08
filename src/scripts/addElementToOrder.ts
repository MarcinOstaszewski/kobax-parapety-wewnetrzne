import { elementsListOpeningTag, entriesToAddRowNumber } from '../consts/consts';
import { currentOrderDescription } from '../consts/consts-ui-elements';
import { orderTypes } from '../consts/mappings';
import { Order } from '../types/types';
import { getFormData, getOrdersFromLocalStorage, getOrderURL } from '../utils/utils'
import { flashNewListElement, partialFormReset, updateValues } from '../utils/utils-ui-updates';
import { addNewOrderToList } from './addNewOrderToList';
import { addOrderToLocalStorage } from './addOrdersToLocalStorage';
import { showOrdersListFromLocalStorage } from './showOrdersListFromLocalStorage';

export function addElementToOrder() {
  const ordersList = getOrdersFromLocalStorage();
  const lastOrder = ordersList[0] || {} as Order;
  const existsLastOrder = Object.keys(ordersList).length;
  const type = existsLastOrder ? lastOrder.type : null;
  if (existsLastOrder) {
    if (type as unknown as string === orderTypes.multi) { // dodaje do istniejącego zamówienia
      const newRowNumber = lastOrder.lastRowNumber ? lastOrder.lastRowNumber + 1 : 1;
      const data = getFormData();
      let queriesString = lastOrder.queriesString;
      let dlugosc = 0;
      let szerokosc = 0;
      let ilosc = 0;
      let surface = lastOrder.surface;
      let dodatkowe = '';
      for (const entry in data) {
        if (data[entry] !== "") {
          if (entriesToAddRowNumber.includes(entry)) {
            queriesString += entry + '-row-' + newRowNumber + "=" + data[entry] + "&";
            if (entry === 'dlugosc') dlugosc = parseFloat(data[entry] as string);
            if (entry === 'szerokosc') szerokosc = parseFloat(data[entry] as string);
            if (entry === 'ilosc') ilosc = parseFloat(data[entry] as string);
          } 
        }
      }

      if (dlugosc) {
        if (szerokosc) {
          if (ilosc) {
        const powierzchniaIndex = queriesString.indexOf('powierzchnia=');
        const m2Index = queriesString.indexOf('m²');
        queriesString = queriesString.substring(0, powierzchniaIndex) + queriesString.substring(m2Index + 2);
        console.log('queriesString', queriesString);
        const {s, q, d} = updateValues({dlugosc, szerokosc, ilosc, surface, queriesString, dodatkowe});
        surface = s as number;
        queriesString = q as string;
        dodatkowe = d as string;
          }
        }
      }
    
      if (dodatkowe) {
        queriesString += 'dodatkowe=' + dodatkowe + "&";
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
        addToLastOrder: true,
        surface: surface
      });
      partialFormReset();
      showOrdersListFromLocalStorage();
      flashNewListElement();
    } else {
      addNewOrderToList(orderTypes.multi);
    }
  }
}
