import { addEventListeners } from './scripts/addEventListeners';
import { checkForDataInLocalStorage } from './scripts/checkForDataInLocalStorage';
import { showOrdersListFromLocalStorage } from './scripts/showOrdersListFromLocalStorage';
import { showHideHurtRabat } from './utils/utils-ui-updates';
import { showHideGruboscOptions } from './scripts/showHideGruboscOptions';
// import "./index.css";
const state = {
  rabat: 1
}

export function getRabat() {
  return state.rabat;
}

export function setRabat(value: number) {
  state.rabat = value;
}

function init() {
  addEventListeners();
  checkForDataInLocalStorage();
  showOrdersListFromLocalStorage();
  showHideHurtRabat();
  showHideGruboscOptions();
}

init();