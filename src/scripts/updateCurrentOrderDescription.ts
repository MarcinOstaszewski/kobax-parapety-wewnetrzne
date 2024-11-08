import { getRabat } from "..";
import { AKTUALNE_ZAMOWIENIE, CENA_NETTO, elementsListOpeningTag, WPROWADZ_WYMIARY } from "../consts/consts";
import { addElementButton, addOrderButton, currentOrderDescription, zamowienieGroup } from "../consts/consts-ui-elements";
import { cenyZa1m2, clientKinds, ksztaltMapping } from "../consts/mappings";
import { toggleOrderButtons } from "../utils/utils-ui-updates";

export function updateCurrentOrderDescription(data: { [key: string]: FormDataEntryValue }) {
  const klient = data["klient"];
  const rabat = data["rabat"];
  const rodzaj = data["rodzaj"];
  const grubosc = data["grubosc"];
  const kolor = data["kolor"];
  const naroznik = data["naroznik"];
  const krawedz = data["krawedz"];
  const ksztalt = data["ksztalt"] as unknown as typeof ksztaltMapping ;
  const szerokosc = data["szerokosc"] as unknown as number;
  const dlugosc = data["dlugosc"] as unknown as number;
  const ilosc = data["ilosc"] as unknown as number;
  let wlasciwosci = true;
  const requiredFields = [klient, rodzaj, grubosc, kolor, naroznik, krawedz];
  for (const field of requiredFields) {
    if (!field) {
      wlasciwosci = false;
      break;
    }
  }
  let powierzchnia: string | number = WPROWADZ_WYMIARY;
  let orderDescription = AKTUALNE_ZAMOWIENIE;
  let cena = 0;
  
  function addDescriptionFragment(labelText: string, key: FormDataEntryValue | number, unit: string, coma?: string) {
    if (key) {
      if (typeof key === "string" ? key[0] !== "0" : key) { // when sizes are set, price should not be displayed
        orderDescription += labelText + "<strong>" + key + (unit || "") + "</strong>" + (coma || "");
      }
    }
  }

  addDescriptionFragment("Typ klienta: ", klient, "", ",");

  if (klient === clientKinds.hurtowy) {
    if (rabat) {
      if (!isNaN(getRabat())) {
        if (getRabat() > 0) {
          orderDescription += " rabat: " + rabat + "%, ";
        }
      }
    }
  }


  addDescriptionFragment(" rodzaj parapetu: ", rodzaj, "", ",");
  addDescriptionFragment(" grubość: ", grubosc, "", ",");
  addDescriptionFragment(" wykończenie: ", kolor, "", ",");
  addDescriptionFragment(" narożnik: ", naroznik, "", ",");
  addDescriptionFragment(" krawędź: ", krawedz, "", ".");
  orderDescription += elementsListOpeningTag + "<li>";
  if (ksztalt) {
    (orderDescription += "Kształt: <strong>" + ksztaltMapping[ksztalt as unknown as keyof typeof ksztaltMapping] + "</strong>, ");
  }
  addDescriptionFragment(" długość: ", dlugosc, " mm", ",");
  addDescriptionFragment(" szerokość: ", szerokosc, " mm", ",");
  addDescriptionFragment(" ilość sztuk: ", ilosc, "", ",");
  if (klient) {
    if (kolor) {
      if (rodzaj) {
        if (grubosc) {
          // @ts-expect-error // can't use values from mappings as keys in nested objects
          cena = cenyZa1m2[klient][kolor][rodzaj][grubosc];
        }
      }
    }
  }
  
  if (cena > 0) {
    if (!isNaN(szerokosc)) {
      if (!isNaN(dlugosc)) {
        if (!isNaN(ilosc)) {
          const surface = szerokosc * dlugosc / 100;
          powierzchnia = Math.round(surface) + ' cm²' + ' (' + (surface / 10000).toFixed(3) + ' m²)';
          const cenaNetto = (cena * (surface / 10000) * ilosc * getRabat()).toFixed(2) + ' zł';
          const cenaBrutto = (cena * (surface / 10000) * 1.23 * ilosc * getRabat()).toFixed(2) + ' zł';
          addDescriptionFragment(" powierzchnia: ", powierzchnia, '', ',');
          addDescriptionFragment(" cena brutto: ", cenaBrutto, '', ',');
          addDescriptionFragment(' cena netto: <span id="' + CENA_NETTO + '">', cenaNetto, '</span>', '.');
        }
      }
    }
  }
  
  orderDescription += '</li></ul>';
  currentOrderDescription.innerHTML = orderDescription;
  zamowienieGroup.classList.toggle('locked', !wlasciwosci); // disabled when not all required fields are checked
  if (wlasciwosci) {
    if (ksztalt) {
      if (szerokosc) {
        if (dlugosc) {
          if (ilosc) {
            toggleOrderButtons(true);
            currentOrderDescription.classList.remove('data-not-full');
            addOrderButton.innerText = 'Dodaj nowe zamówienie';
            addElementButton.innerText = 'Dodawaj kolejne elementy';
          }
        }
      }
    }
  } else {
    toggleOrderButtons(false);
    currentOrderDescription.classList.add('data-not-full');
    addOrderButton.innerText = 'Uzupełnij dane zamówienia';
    addElementButton.innerText = 'Uzupełnij dane zamówienia';
  }
}