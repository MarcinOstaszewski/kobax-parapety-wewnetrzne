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

// export const
// @ts-ignore
window.cenyZa1m2 = {
  [clientKinds.hurtowy]: {
    [kolorMapping.folia]: {
      [rodzajMapping.standard]: {
        18: 360,
        22: 380,
        28: 420
      },
      [rodzajMapping.wilgociouodporniony]: {
        19: 430,
        25: 500,
        30: 550
      }
    },
    [kolorMapping.lakier]: {
      [rodzajMapping.standard]: {
        18: 480,
        22: 510,
        28: 540
      },
      [rodzajMapping.wilgociouodporniony]: {
        19: 520,
        25: 570,
        30: 650
      }
    }
  },
  [clientKinds.detaliczny]: {
    [kolorMapping.folia]: {
      [rodzajMapping.standard]: {
        18: 420,
        22: 490,
        28: 540
      },
      [rodzajMapping.wilgociouodporniony]: {
        19: 560,
        25: 650,
        30: 720
      }
    },
    [kolorMapping.lakier]: {
      [rodzajMapping.standard]: {
        18: 870,
        22: 950,
        28: 1010
      },
      [rodzajMapping.wilgociouodporniony]: {
        19: 899,
        25: 990,
        30: 1100
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