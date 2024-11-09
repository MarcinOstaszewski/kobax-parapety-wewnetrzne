import { saveToLocalStorageAndUpdateDisplay } from "./";

export function verifyMinMaxValue() {
  if (parseInt(this.value) > this.max) this.value = this.max;
  if (parseInt(this.value) < this.min) this.value = this.min;
  saveToLocalStorageAndUpdateDisplay();
}