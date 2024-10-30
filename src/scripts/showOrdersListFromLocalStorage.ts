import { ordersListSection } from "../consts/consts-ui-elements";
import { orderTypes, orderTypesMapping } from "../consts/mappings";
import { Order } from "../types/types";
import { getOrdersFromLocalStorage } from "../utils/utils";
import { confirmRemoveOrder } from "../utils/utils-ui-updates";

export function showOrdersListFromLocalStorage() {
  const orders = getOrdersFromLocalStorage();
  let summaryPriceNetto = 0;
  if (orders.length > 0) {
    ordersListSection.classList.remove('hidden');
    ordersListSection.querySelector('ul')!.innerHTML = '';
    orders.forEach(function(order: Order) {
      const open = '<a class="make-order" href="' + order.url + order.queriesString + '" target="_blank">Zamów</a>';
      const remove = '<button class="remove-order" type="button">Usuń</button>';
      const orderType = orderTypesMapping[order.type as unknown as (typeof orderTypes.normal) | (typeof orderTypes.multi)];
      const labelText = 'Typ: <strong>' + orderType + '</strong>';
      const typeLabel = '<div class="order-type">' + labelText + '</div>';
      const sumaNetto = '<div class="suma-netto">Suma netto:<br><strong>' + order.cenaNetto.toFixed(2) + ' zł</strong></div>';
      const sumaBrutto = '<div class="suma-brutto">Suma brutto:<br><strong>' + (order.cenaNetto * 1.23).toFixed(2) + ' zł</strong></div>';
      const orderSummary = '<div class="order-summary ' + order.type + '-order">' + typeLabel + sumaNetto + sumaBrutto + '</div>';
      const summaryText = '<div class="order-description">' + order.textContent + '</div>';
      const buttonsColumn = '<div class="buttons-column">' + open + remove + '</div>';
      const li = document.createElement('li');
      li.innerHTML = orderSummary + summaryText + buttonsColumn;
      ordersListSection.querySelector('ul')!.appendChild(li);
      summaryPriceNetto += order.cenaNetto;
    });
    ordersListSection.querySelectorAll('.remove-order').forEach(function(button, index) {
      button.addEventListener('click', function() { confirmRemoveOrder(index); });
    });
    document.querySelector('.summary-price')!.innerHTML = 'Sumaryczna cena netto: <strong>' + summaryPriceNetto.toFixed(2) + ' zł</strong>, brutto: <strong>' + (summaryPriceNetto * 1.23).toFixed(2) + ' zł</strong>';
  } else {
    ordersListSection.classList.add('hidden');
  }
}