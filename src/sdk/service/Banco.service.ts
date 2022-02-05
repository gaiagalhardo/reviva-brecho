import { Banco } from "../@types";
import Service from "../Service";

class BancoService extends Service {
    static getAllBancos() {
        return this.Http
            .get<Banco.Summary[]>('/bancos')
            .then(this.getData)
    }

    static insertNewBanco(banco: Banco.Input) {
        return this.Http
            .post<Banco.Summary>('/bancos', banco)
            .then(this.getData)
    }
}

export default BancoService