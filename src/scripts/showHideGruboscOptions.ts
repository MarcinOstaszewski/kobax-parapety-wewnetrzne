import { rodzajMapping } from "../consts/mappings";
import { getRodzajValue } from "../utils/utils";
import { flashGruboscGroup } from "../utils/utils-ui-updates";
import { saveToLocalStorageAndUpdateDisplay } from "./";

interface IShowHideGruboscOptions {
  value?: rodzajMapping;
  isFormReset?: boolean;
}

export function showHideGruboscOptions({value, isFormReset}: IShowHideGruboscOptions = {}) {
  const isStandard = getRodzajValue() === rodzajMapping.standard;
  const show = isStandard ? document.querySelectorAll<HTMLInputElement>('.standard') : document.querySelectorAll<HTMLInputElement>('.wilgociouodporniony');
  const hide = isStandard ? document.querySelectorAll<HTMLInputElement>('.wilgociouodporniony') : document.querySelectorAll<HTMLInputElement>('.standard');
  hide.forEach(function(label: HTMLInputElement) {
    label.querySelector('input').checked = false;
    label.classList.add('hidden');
  });
  show.forEach(function(label: HTMLInputElement, i: number) {
    const input = label.querySelector('input');
    if (isFormReset) {
      input.checked = false;
    }
    label.classList.remove('hidden');
  });
  if (value) { // when called from change event
    flashGruboscGroup();
  }
  saveToLocalStorageAndUpdateDisplay();
}