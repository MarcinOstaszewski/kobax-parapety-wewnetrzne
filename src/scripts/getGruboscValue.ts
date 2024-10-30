import { rodzajMapping } from "../consts/mappings";

export function getGruboscValue(rodzajValue: rodzajMapping | null): string | null {
  if (rodzajValue) {
    if (rodzajValue === rodzajMapping.standard) {
      const standardRadioChecked: HTMLInputElement | null = document.querySelector('[name="' + rodzajMapping.standard + '"]:checked');
      if (standardRadioChecked) {
        return standardRadioChecked.value;
      }
    } else if (rodzajValue === rodzajMapping.wilgociouodporniony) {
      const wilgociouodpornionyRadioChecked: HTMLInputElement | null = document.querySelector('[name="' + rodzajMapping.wilgociouodporniony + '"]:checked');
      if (wilgociouodpornionyRadioChecked) {
        return wilgociouodpornionyRadioChecked.value;
      }
    }
  }
  return null;
}