import { klientDetalHurt, rabatInput, rodzaj, naroznik, grubosc, kolor, zamowienie, krawedz, ksztalt, addOrderButton, addElementButton } from "../consts/consts-ui-elements";
import { rodzajMapping } from "../consts/mappings";
import { checkIfStoneSelected, showHideHurtRabat } from "../utils/utils-ui-updates";
import { setDiscountValue, showHideGruboscOptions, verifyMinMaxValue, saveToLocalStorageAndUpdateDisplay, addNewOrderToList, addElementToOrder } from "./";

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
  addListenerToRadios(rodzaj, 'change', function(event) { showHideGruboscOptions((event.target as HTMLInputElement).value as rodzajMapping); });
  addListenerToRadios(naroznik, 'change', checkIfStoneSelected);
  [grubosc, kolor, zamowienie, krawedz, ksztalt].forEach(function(radios) { addListenerToRadios(radios, 'change', saveToLocalStorageAndUpdateDisplay )});
  ['szerokosc', 'dlugosc', 'ilosc'].forEach(function(id) { document.getElementById(id)!.addEventListener('change', function() { verifyMinMaxValue.call(this); }); });
  addOrderButton.addEventListener('click', function() { addNewOrderToList() });
  addElementButton.addEventListener('click', addElementToOrder);
}