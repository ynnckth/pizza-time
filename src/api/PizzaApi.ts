import { Pizza } from '../models/Pizza';

export const fetchAllPizzas = (): Promise<Pizza[]> => {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      // reject('Something went wrong!');
      resolve([
        {
          name: 'Margherita',
          description: 'Plain and boring',
          unitPrice: 10,
          isAvailable: true,
        },
        {
          name: 'Salami',
          description: 'Nice and spicy!',
          unitPrice: 12,
          isAvailable: true,
        },
        {
          name: 'Hawaii',
          description: 'Really???',
          unitPrice: 11,
          isAvailable: true,
        },
      ]);
    }, 3000)
  );
};