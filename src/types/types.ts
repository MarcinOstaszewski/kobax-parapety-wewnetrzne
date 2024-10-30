import { orderTypes } from '../consts/mappings';

export type TOrderTypes = typeof orderTypes.multi | typeof orderTypes.normal;

export type Order = {
  url: string;
  type: typeof orderTypes;
  textContent: string;
  queriesString: string;
  addToLastOrder?: boolean;
  lastRowNumber?: number;
  cenaNetto?: number,
  surface?: number,
}
