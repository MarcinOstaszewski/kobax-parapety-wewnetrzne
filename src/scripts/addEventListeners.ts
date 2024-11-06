import { klientDetalHurt } from "../consts/consts-ui-elements";
import { showHideHurtRabat } from "../utils/utils-ui-updates";
import { setDiscountValue } from "../scripts/setDiscountValue";
import { rabatInput, rodzaj, naroznik, grubosc, kolor, zamowienie, krawedz, ksztalt, addOrderButton, addElementButton } from "../consts/consts-ui-elements";
import { checkIfStoneSelected } from "../utils/utils-ui-updates";
import { showHideGruboscOptions } from "./showHideGruboscOptions";
import { verifyMinMaxValue } from "../utils/utils";
import { saveToLocalStorageAndUpdateDisplay } from "./saveToLocalStorageAndUpdateDisplay";
import { addNewOrderToList } from "./addNewOrderToList";
import { addElementToOrder } from "./addElementToOrder";
import { rodzajMapping } from "../consts/mappings";

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