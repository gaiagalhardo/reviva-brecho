import { useEffect, useState } from "react"
import { Banco } from "../../sdk/@types"
import BancoService from "../../sdk/service/Banco.service"

export default function HomeView() {

    const [bancos, setBancos] = useState<Banco.Summary[]>([])

    useEffect(() => {
        BancoService
            .getAllBancos()
            .then(setBancos)
    }, [])

    return <div>
        <ul>
            {bancos && bancos.map(b => {
                return <li>{b.nome}</li>
            })}
        </ul>
    </div>
}