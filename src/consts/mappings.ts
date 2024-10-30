export function getNetto(cenaBrutto: number) {
  return cenaBrutto / 1.23;
}

export const clientKinds = {
  hurtowy: 'hurtowy',
  detaliczny: 'detaliczny'
} as const;

export const kolorMapping = {
  folia: 'folia',
  lakier: 'lakier'
};

export enum rodzajMapping {
  standard = 'standard',
  wilgociouodporniony = 'wilgociouodporniony'
};

export const cenyZa1m2 = {
  [clientKinds.hurtowy]: {
    [kolorMapping.folia]: {
      [rodzajMapping.standard]: {
        18: 260.2,
        22: 274.8,
        28: 302.4
      },
      [rodzajMapping.wilgociouodporniony]: {
        19: 311.4,
        25: 362.6,
        30: 399.2
      }
    },
    [kolorMapping.lakier]: {
      [rodzajMapping.standard]: {
        18: 345.5,
        22: 369.1,
        28: 392.7
      },
      [rodzajMapping.wilgociouodporniony]: {
        19: 375.6,
        25: 411.4,
        30: 469.9
      }
    }
  },
  [clientKinds.detaliczny]: {
    [kolorMapping.folia]: {
      [rodzajMapping.standard]: {
        18: getNetto(365),
        22: getNetto(433),
        28: getNetto(480)
      },
      [rodzajMapping.wilgociouodporniony]: {
        19: getNetto(499),
        25: getNetto(580),
        30: getNetto(641)
      }
    },
    [kolorMapping.lakier]: {
      [rodzajMapping.standard]: {
        18: getNetto(776),
        22: getNetto(1542),
        28: getNetto(893)
      },
      [rodzajMapping.wilgociouodporniony]: {
        19: getNetto(803),
        25: getNetto(878),
        30: getNetto(953)
      }
    }
  }
};

export const ksztaltMapping = {
  'standard': 'standard',
  'prawy-do-laczenia': 'prawy do łączenia',
  'lewy-do-laczenia': 'lewy do łączenia',
  'srodkowy': 'środkowy',
  'sciety-prawy': 'ścięty prawy',
  'sciety-lewy': 'ścięty lewy',
  'sciety-srodkowy': 'ścięty środkowy',
  'prawy-z-lacznikami': 'prawy z łącznikami',
  'lewy-z-lacznikami': 'lewy z łącznikami',
  'srodkowy-z-lacznikami': 'środkowy z łącznikami'
};

export const orderTypes = {
  normal: 'normal',
  multi: 'multi'
} as const;



export const orderTypesMapping = {
  normal: 'Zwykłe',
  multi: 'Multi'
} as const;