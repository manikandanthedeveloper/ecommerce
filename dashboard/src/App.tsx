import { useMemo } from "react"
import Routers from './router/Routers';
import publicRoutes from "./router/PublicRoutes";
import { getRoutes } from "./router"

const App = () => {
  const allRoutes = useMemo(() => {
    const routes = getRoutes();

    return [...publicRoutes, routes];
  }, []);

  return <Routers allRoutes={allRoutes} />
}

export default App;