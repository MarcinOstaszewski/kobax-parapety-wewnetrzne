import { addElementButton, addOrderButton, confirmRemoveOrderDialog, confirmRemoveOrderDialogButton, grubosc, klientDetalHurt, kolor, krawedz, ksztalt, naroznik, rabatInput, rodzaj, zamowienie } from "../consts/consts-ui-elements";
import { rodzajMapping } from "../consts/mappings";
import { checkIfStoneSelected, handleBorderRadioClicked, removeOrderAndCloseDialog, showHideHurtRabat } from "../utils/utils-ui-updates";
import { addElementToOrder, addNewOrderToList, saveToLocalStorageAndUpdateDisplay, setDiscountValue, showHideGruboscOptions, verifyMinMaxValue } from "./";

type addListenerToRadiosType = {
  (radios: NodeListOf<HTMLInputElement>, type: string, callback: EventListener): void;
}

const addListenerToRadios: addListenerToRadiosType = function(radios, type, callback) {
  radios.forEach(function(radio) {
    radio.addEventListener(type, callback);
  });
}

export function addEventListeners() {
  addListenerToRadios(klientDetalHurt, 'change', showHideHurtRabat);
  rabatInput.addEventListener('input', function() { setDiscountValue(); });
  addListenerToRadios(rodzaj, 'change', function(event) { showHideGruboscOptions({
    value: (event.target as HTMLInputElement).value as rodzajMapping
  }); });
  addListenerToRadios(naroznik, 'change', checkIfStoneSelected);
  addListenerToRadios(krawedz, 'change', handleBorderRadioClicked);
  [grubosc, kolor, zamowienie, ksztalt].forEach(function(radios) { addListenerToRadios(radios, 'change', saveToLocalStorageAndUpdateDisplay )});
  ['szerokosc', 'dlugosc', 'ilosc'].forEach(function(id) { document.getElementById(id)!.addEventListener('change', function() { verifyMinMaxValue.call(this); }); });
  addOrderButton.addEventListener('click', function() { addNewOrderToList() });
  addElementButton.addEventListener('click', addElementToOrder);
  confirmRemoveOrderDialogButton.addEventListener('click', removeOrderAndCloseDialog);
  confirmRemoveOrderDialog.addEventListener('click', function() { confirmRemoveOrderDialog.close() });
}