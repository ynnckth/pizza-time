import { useEffect, useState } from 'react';
import { fetchAllPizzas } from '../api/Pizza/PizzaApi';
import {OrderItem} from '../models/OrderItem';

/**
 * @deprecated Prefer using RTK Query to fetch pizzas instead of this custom hook (see MarketplaceSlice.ts)
 */
const usePizzas = () => {
  const [pizzas, setPizzas] = useState<OrderItem[]>([]);
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
