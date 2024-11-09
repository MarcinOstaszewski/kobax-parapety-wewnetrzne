import { rodzajMapping } from "../consts/mappings";
import { getRodzajValue } from "../utils/utils";
import { flashGruboscGroup } from "../utils/utils-ui-updates";
import { saveToLocalStorageAndUpdateDisplay } from "./";

export function showHideGruboscOptions(value?: rodzajMapping) {
  const isStandard = getRodzajValue() === rodzajMapping.standard;
  const show = isStandard ? document.querySelectorAll<HTMLInputElement>('.standard') : document.querySelectorAll<HTMLInputElement>('.wilgociouodporniony');
  const hide = isStandard ? document.querySelectorAll<HTMLInputElement>('.wilgociouodporniony') : document.querySelectorAll<HTMLInputElement>('.standard');
  hide.forEach(function(label: HTMLInputElement) {
    label.classList.add('hidden');
  });
  show.forEach(function(label: HTMLInputElement, i: number) {
    label.querySelector('input').checked = i === 0;
    label.classList.remove('hidden');
  });
  
  if (value) { // when called from change event
    flashGruboscGroup();
    saveToLocalStorageAndUpdateDisplay();
  }
}