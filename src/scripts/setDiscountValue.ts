import { setRabat } from "..";
import { rabatInput } from "../consts/consts-ui-elements";
import { getKlientKind, isDiscountValid } from "../utils/utils";
import { saveToLocalStorageAndUpdateDisplay } from "./saveToLocalStorageAndUpdateDisplay";

export function setDiscountValue() {
  const clientKind = getKlientKind();
  if (!isDiscountValid(clientKind )) {
    rabatInput.value = '0';
    setRabat(1);
  } else {
    setRabat(1 - parseFloat(rabatInput.value) / 100);
  }
  saveToLocalStorageAndUpdateDisplay();
}