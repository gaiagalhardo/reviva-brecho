import { useRoutes } from "react-router-dom";
import BancoCreateView from "./views/BancoCreate.view";
import BancoListView from "./views/BancoList.view";
import HomeView from "./views/Home.view";


export default function Routes() {
    const routes = useRoutes([
        {
            path: '/',
            element: <HomeView />
        },
        {
            path: '/bancos/novo',
            element: <BancoCreateView />
        },
        {
            path: '/bancos',
            element: <BancoListView />
        }
    ]);

    return routes;
}