import { useRoutes, type RouteObject } from 'react-router-dom'

interface RouterProps {
    allRoutes: RouteObject[]
}
const Routers: React.FC<RouterProps> = ({ allRoutes }) => {
    const routes = useRoutes([...allRoutes]);

    return routes;
}

export default Routers