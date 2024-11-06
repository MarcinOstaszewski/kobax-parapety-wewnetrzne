import { formId } from "../consts/consts";
import { rabatInput } from "../consts/consts-ui-elements";
import { clientKinds, orderTypes, rodzajMapping } from "../consts/mappings";
import { saveToLocalStorageAndUpdateDisplay } from "../scripts/saveToLocalStorageAndUpdateDisplay";
import { Order } from "../types/types";

export function getForm() {
  return document.getElementById(formId) as HTMLFormElement;
}

export function getRodzajValue(): rodzajMapping | null {
  const rodzaj = document.querySelector('[name="rodzaj"]:checked');
  return rodzaj ? (rodzaj as HTMLInputElement).value as rodzajMapping : null;
}

export function getKlientKind() {
  const klientKind: HTMLInputElement | null = document.querySelector('[name="klient"]:checked');
  return klientKind ? klientKind.value as unknown as typeof clientKinds : null;
}

export function getFormData() {
  const form = getForm();
  const formData = new FormData(form);
  const data = {} as { [key: string]: FormDataEntryValue };
  formData.forEach(function(value, key) {
    data[key] = value;
  });
  return data;
}

export function getOrderURL() {
  const lastSlashIndex = window.location.href.lastIndexOf('/');
  return window.location.href.substring(0, lastSlashIndex) + '/parapety_wewnetrzne.html';
}

export function getOrdersFromLocalStorage(): (Order[] | []) {
  const ordersList = localStorage.getItem('orders') || '[]';
  return JSON.parse(ordersList) || [];
}

export function isSameKindOrder() {
  const orderKindChecked: HTMLInputElement | null = document.querySelector('[name="zamowienie"]:checked');
  return orderKindChecked ? orderKindChecked.value === orderTypes.multi : false;
}

export function isDiscountValid(clientKind: typeof clientKinds) {
  return clientKind as unknown as string === clientKinds.hurtowy && parseFloat(rabatInput.value) > 0;
}

export function verifyMinMaxValue() {
  if (parseInt(this.value) > this.max) this.value = this.max;
  if (parseInt(this.value) < this.min) this.value = this.min;
  saveToLocalStorageAndUpdateDisplay();
}
