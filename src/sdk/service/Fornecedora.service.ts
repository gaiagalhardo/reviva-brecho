import { Fornecedora } from "../@types/Fornecedora";
import Service from "../Service";

class FornecedoraService extends Service {

    static getAllFornecedoras() {
        return this.Http
            .get<Fornecedora.Summary[]>('/fornecedoras')
            .then(this.getData)
    }

    static getDetailedFornecedora(fornecedoraId: number) {
        return this.Http
            .get<Fornecedora.Detailed>(`/fornecedoras/${fornecedoraId}`)
            .then(this.getData)
    }

    static insertNewFornecedora(fornecedora: Fornecedora.Input) {
        return this.Http
            .post<Fornecedora.Summary>('/fornecedoras', fornecedora)
            .then(this.getData)
    }

    static updateExistingFornecedora(fornecedoraId: number, fornecedoraData: Fornecedora.Input) {
        return this.Http
            .put<Fornecedora.Detailed>(`/fornecedoras/${fornecedoraId}`, fornecedoraData)
            .then(this.getData)
    }


}


export default FornecedoraService