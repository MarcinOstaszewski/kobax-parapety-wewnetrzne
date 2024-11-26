export const klientDetalHurt = document.querySelectorAll('[name="klient"]') as NodeListOf<HTMLInputElement>;
export const hurtRabat = document.getElementById('hurt-rabat') as HTMLInputElement;
export const rabatInput = document.getElementById('rabat') as HTMLInputElement;
export const rodzaj = document.querySelectorAll('[name="rodzaj"]') as NodeListOf<HTMLInputElement>;
export const grubosc = document.querySelectorAll('[name="' + "grubosc" + '"]') as NodeListOf<HTMLInputElement>;
export const kolor = document.querySelectorAll('[name="kolor"]') as NodeListOf<HTMLInputElement>
export const naroznik = document.querySelectorAll('[name="naroznik"]') as NodeListOf<HTMLInputElement>
export const krawedz = document.querySelectorAll('[name="krawedz"]') as NodeListOf<HTMLInputElement>
export const zamowienie = document.querySelectorAll('[name="zamowienie"]') as NodeListOf<HTMLInputElement>
export const zamowienieGroup = document.querySelector('.order-group') as HTMLElement;
export const szerokoscInput = document.getElementById('szerokosc') as HTMLInputElement;
export const dlugoscInput = document.getElementById('dlugosc') as HTMLInputElement;
export const iloscInput = document.getElementById('ilosc') as HTMLInputElement;
export const ksztalt = document.querySelectorAll('[name="ksztalt"]') as NodeListOf<HTMLInputElement>;
export const currentOrderDescription = document.querySelector('.current-order-description') as HTMLInputElement;
export const addOrderButton = document.querySelector('.add-order-button') as HTMLButtonElement;
export const addElementButton = document.querySelector('.add-element-button') as HTMLButtonElement;
export const ordersListSection = document.querySelector('.orders-list') as HTMLElement;
export const topPanelFields = [klientDetalHurt, rabatInput, rodzaj, grubosc, kolor, naroznik, krawedz];
export const fieldsForPariatlReset = [szerokoscInput, dlugoscInput, iloscInput, ksztalt];
export const confirmRemoveOrderDialog = document.getElementById('potwierdz-usuniecie') as HTMLDialogElement;
export const confirmRemoveOrderDialogButton = confirmRemoveOrderDialog.querySelector('button') as HTMLButtonElement;