import { useEffect, useMemo } from "react"
import Routers from './router/Routers';
import publicRoutes from "./router/PublicRoutes";
import { getRoutes } from "./router"
import { useAppDispatch } from "./store/hooks";
import getUser from "./store/auth/getUserThunks";

const App = () => {
  const dispatch = useAppDispatch();

  const allRoutes = useMemo(() => {
    const routes = getRoutes();

    return [...publicRoutes, routes];
  }, []);

  useEffect(() => {
    // Check if user is authenticated by calling getUser
    // Backend will verify the httpOnly cookie
    dispatch(getUser());
  }, [dispatch]);

  return <Routers allRoutes={allRoutes} />
}

export default App;