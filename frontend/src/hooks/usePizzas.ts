import { useEffect, useState } from 'react';
import { Pizza } from '../models/Pizza';
import { fetchAllPizzas } from '../api/Pizza/PizzaApi';

// This hook could be replaced / improved by something like SWR: https://swr.vercel.app
const usePizzas = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loadingPizzas, setLoadingPizzas] = useState<boolean>(false);
  const [errorLoadingPizzas, setErrorLoadingPizzas] = useState<string | undefined>(undefined);

  // The code inside here will be executed for each consumer of the usePizzas hook
  useEffect(() => {
    setLoadingPizzas(true);
    fetchAllPizzas()
      .then((allPizzas) => setPizzas(allPizzas))
      .catch((e) => setErrorLoadingPizzas(e.message))
      .finally(() => setLoadingPizzas(false));
  }, [setLoadingPizzas, setPizzas, setErrorLoadingPizzas]);

  return { pizzas, loadingPizzas, errorLoadingPizzas };
};
export default usePizzas;
