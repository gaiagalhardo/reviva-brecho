import { Fornecedora } from "../@types/Fornecedora";
import Service from "../Service";

class FornecedoraService extends Service {

    static getAllFornecedoras() {
        return this.Http
            .get<Fornecedora.Summary[]>('/fornecedoras')
            .then(this.getData)
    }

    static insertNewFornecedora(fornecedora: Fornecedora.Input) {
        return this.Http
            .post<Fornecedora.Summary>('/fornecedoras', fornecedora)
            .then(this.getData)
    }

}


export default FornecedoraService