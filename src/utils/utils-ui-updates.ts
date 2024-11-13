import { formId } from "../consts/consts";
import { addElementButton, addOrderButton, fieldsForPariatlReset, hurtRabat, krawedz, topPanelFields } from "../consts/consts-ui-elements";
import { clientKinds } from "../consts/mappings";
import { removeOrderFromLocalStorage } from "../scripts/removeOrderFromLocalStorage";
import { saveToLocalStorageAndUpdateDisplay } from "../scripts/saveToLocalStorageAndUpdateDisplay";
import { setDiscountValue } from "../scripts/setDiscountValue";
import { showHideGruboscOptions } from "../scripts/showHideGruboscOptions";
import { getForm, getKlientKind, isSameKindOrder } from "./utils";

export function flashGruboscGroup() {
  const gruboscGroup = document.querySelector('.grubosc-radio-group') as HTMLElement;
  gruboscGroup.classList.add('changed');
  setTimeout(function() {
    gruboscGroup.classList.remove('changed');
  }, 1500);
}

export function flashHtmlElement(element: HTMLElement) {
  element.classList.add('changed');
  setTimeout(function() {
    element.classList.remove('changed');
  }, 1500);
}

export function flashChangedRadioGroup(namesList: string[]) {
  namesList.forEach(function(name) {
    const radio = document.querySelector('[name="' + name + '"]') as HTMLInputElement;
    const radioGroup = radio.closest('.radio-group') as HTMLElement;
    flashHtmlElement(radioGroup);
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

function openLockedInfoDialog() {
  const dialog: HTMLDialogElement | null = document.getElementById('odblokuj-ponizej') as HTMLDialogElement;
  if (!dialog) return;
  dialog.showModal();
  dialog.addEventListener('click', function() { dialog.close() });
}

export function toggleTopPanelLock() {
  const isSameKind = isSameKindOrder();
  topPanelFields.forEach(function(fieldOrList) {
    const field = (fieldOrList instanceof NodeList) ? fieldOrList[0] : fieldOrList;
    const formGroup: HTMLElement = field.closest('.form-group');
    if (formGroup) {
      formGroup.classList.toggle('locked', isSameKind);
      if (isSameKind) {
        formGroup.addEventListener('click', openLockedInfoDialog);
      } else {
        formGroup.removeEventListener('click', openLockedInfoDialog);
      }
    };

  });
}

function checkIfStoneCornerSelected(value: string) {
  if (value === 'STONE') {
    krawedz.forEach(function(radio) { radio.checked = radio.value === 'faza' });
    flashChangedRadioGroup(['krawedz']);
    flashHtmlElement(document.querySelector('.border-explanation') as HTMLElement);
  }
}

export function checkIfStoneSelected(event: Event) {
  const target = event.target as HTMLInputElement;
  checkIfStoneCornerSelected(target.value);
  saveToLocalStorageAndUpdateDisplay();
}

export function handleBorderRadioClicked(event: Event) {
  const selectedCorner = document.querySelector('[name="naroznik"]:checked') as HTMLInputElement;
  if (selectedCorner) {
    checkIfStoneCornerSelected(selectedCorner.value);
  }
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

export function updateValues(
  { surface, queriesString, dodatkowe, dlugosc, szerokosc, ilosc }:
  { surface: number, queriesString: string, dodatkowe: string, dlugosc: number, szerokosc: number, ilosc: number }
) {
  surface += dlugosc * szerokosc * ilosc / 100;
  queriesString += 'powierzchnia=' + (surface / 10000).toFixed(3) + ' m²&';
  return {s: surface, q: queriesString, d: dodatkowe};
}