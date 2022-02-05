import { useRoutes } from "react-router-dom";
import HomeView from "./views/Home.view";


export default function Routes() {
    const routes = useRoutes([
        {
            path: '/',
            element: <HomeView />
        }
    ]);

    return routes;
}