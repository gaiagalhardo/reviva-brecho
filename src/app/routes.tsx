import { useRoutes } from "react-router-dom";
import BancoCreateView from "./views/BancoCreate.view";
import BancoListView from "./views/BancoList.view";
import FornecedoraCreateView from "./views/FornecedoraCreate.view";
import FornecedoraListView from "./views/FornecedoraList.view";
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
        },
        {
            path: '/fornecedoras',
            element: <FornecedoraListView />
        },
        {
            path: '/fornecedoras/nova',
            element: <FornecedoraCreateView />
        }
    ]);

    return routes;
}