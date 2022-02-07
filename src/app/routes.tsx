import { message, notification } from "antd";
import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import CustomError from "../sdk/CustomError";
import BancoCreateView from "./views/BancoCreate.view";
import BancoListView from "./views/BancoList.view";
import FornecedoraCreateView from "./views/FornecedoraCreate.view";
import FornecedoraEditView from "./views/FornecedoraEdit.view";
import FornecedoraListView from "./views/FornecedoraList.view";
import HomeView from "./views/Home.view";


export default function Routes() {

    useEffect(() => {
        window.onunhandledrejection = ({ reason }) => {
            if (reason instanceof CustomError) {
                if (reason.data?.objects) {
                    reason.data.objects.forEach((error) => {
                        message.error(error.userMessage)
                    })
                }
                else {
                    notification.error({
                        message: reason.message,
                        description:
                            reason.data?.detail === 'Network Error'
                                ? 'Erro na rede'
                                : reason.data?.detail
                    })
                }

            } else {
                notification.error({
                    message: 'Houve um erro'
                })
            }
        }
    })

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
        },
        {
            path: '/fornecedoras/edicao/:id',
            element: <FornecedoraEditView />
        }
    ]);

    return routes;
}