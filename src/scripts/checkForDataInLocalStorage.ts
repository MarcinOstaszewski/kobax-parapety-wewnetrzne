import { formId } from "../consts/consts";
import { getForm } from "../utils/utils";

export function checkForDataInLocalStorage() {
  const form = getForm();
  if (!localStorage) console.error('Brak obsługi localStorage');
  const data = localStorage.getItem(formId);
  if (data) {
    const entries = JSON.parse(data);
    for (const key in entries) {
      const element = form.querySelector('[name="' + key + '"]') as HTMLInputElement;
      if (!element) continue;
      if (element.type === 'radio') {
        const radio = form.querySelector('[name="' + key + '"][value="' + entries[key] + '"]') as HTMLInputElement;
        radio.checked = true;
      } else {
        element.value = entries[key];
      }
    }
  }
}