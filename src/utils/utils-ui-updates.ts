import { formId } from "../consts/consts";
import { addElementButton, addOrderButton, fieldsForPariatlReset, hurtRabat, krawedz, topPanelFields } from "../consts/consts-ui-elements";
import { removeOrderFromLocalStorage } from "../scripts/removeOrderFromLocalStorage";
import { saveToLocalStorageAndUpdateDisplay } from "../scripts/saveToLocalStorageAndUpdateDisplay";
import { setDiscountValue } from "../scripts/setDiscountValue";
import { getForm, getKlientKind, isSameKindOrder } from "./utils";
import { showHideGruboscOptions } from "../scripts/showHideGruboscOptions";
import { clientKinds } from "../consts/mappings";

export function flashGruboscGroup() {
  const gruboscGroup = document.querySelector('.grubosc-radio-group') as HTMLElement;
  gruboscGroup.classList.add('changed');
  setTimeout(function() {
    gruboscGroup.classList.remove('changed');
  }, 1500);
}

export function flashChangedRadioGroup(namesList: string[]) {
  namesList.forEach(function(name) {
    const radio = document.querySelector('[name="' + name + '"]') as HTMLInputElement;
    radio.closest('.radio-group')!.classList.add('changed');
    setTimeout(function() {
      radio.closest('.radio-group')!.classList.remove('changed');
    }, 1500);
  });
}

export function showHideHurtRabat() {
  const clientKind = getKlientKind() as unknown as string;
  hurtRabat.classList.toggle('hidden', clientKind !== clientKinds.hurtowy);
  setDiscountValue();
}

export function resetForm() {
  const form = getForm();
  form.reset();
  localStorage.removeItem(formId);
  showHideHurtRabat();
  showHideGruboscOptions();
  saveToLocalStorageAndUpdateDisplay();
}

export function partialFormReset() {
  fieldsForPariatlReset.forEach(function(field) {
    if (field instanceof NodeList) {
      field.forEach(field => field.checked = false);
    } else {
      field.value = '';
    }
  });
  toggleOrderButtons(false);
  saveToLocalStorageAndUpdateDisplay();
}

export function toggleOrderButtons(isValid: boolean) {
  const isSameKind = isSameKindOrder();
  addOrderButton.disabled = !isValid || isSameKind;
  addElementButton.disabled = !isValid || !isSameKind;
};

export function toggleTopPanelLock() {
  const isSameKind = isSameKindOrder();
  topPanelFields.forEach(function(fieldOrList) {
    const field = (fieldOrList instanceof NodeList) ? fieldOrList[0] : fieldOrList;
    const formGroup: HTMLElement = field.closest('.form-group');
    if (formGroup) formGroup.classList.toggle('locked', isSameKind);
  });
}

export function checkIfStoneSelected(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.value === 'STONE') {
    krawedz.forEach(function(radio) { radio.checked = radio.value === 'faza' });
    flashChangedRadioGroup(['krawedz']);
  }
  saveToLocalStorageAndUpdateDisplay();
}

export function confirmRemoveOrder(index: number) {
  const dialog: HTMLDialogElement | null = document.getElementById('potwierdz-usuniecie') as HTMLDialogElement;
  if (!dialog) return;
  dialog.showModal();
  const dialogButton = dialog.querySelector('button') as HTMLButtonElement; 
  dialogButton.addEventListener('click', function() {
    removeOrderFromLocalStorage(index);
    dialog.close();
  });
  dialog.addEventListener('click', function() { dialog.close() });
}

export function flashNewListElement() {
  const firstListElement = document.querySelector('.orders-list-elements li');
  if (firstListElement) firstListElement.classList.add('changed');
}