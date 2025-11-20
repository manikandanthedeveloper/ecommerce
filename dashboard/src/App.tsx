import { useState } from "react"
import Routers from './router/Routers';
import type { RouteObject } from "react-router-dom";
import publicRoutes from "./router/PublicRoutes";

const App = () => {
  const [allRoutes] = useState<RouteObject[]>(publicRoutes);


  return <Routers allRoutes={allRoutes} />
}

export default App;