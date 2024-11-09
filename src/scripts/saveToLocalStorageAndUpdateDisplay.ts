import { formId } from "../consts/consts";
import { getFormData } from "../utils/utils";
import { toggleTopPanelLock } from "../utils/utils-ui-updates";
import { updateCurrentOrderDescription } from "./";

export function saveToLocalStorageAndUpdateDisplay() {
  const data = getFormData();
  localStorage.setItem(formId, JSON.stringify(data));
  updateCurrentOrderDescription(data);
  toggleTopPanelLock();
}