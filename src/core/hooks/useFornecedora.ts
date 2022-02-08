import { useCallback, useState } from "react";
import { Fornecedora } from "../../sdk/@types/Fornecedora";
import { ResourceNotFoundError } from "../../sdk/errors";
import FornecedoraService from "../../sdk/service/Fornecedora.service";

export default function useFornecedora() {
    const [fornecedora, setFornecedora] = useState<Fornecedora.Detailed>()
    const [notFound, setNotFound] = useState(false)

    const fetchFornecedora = useCallback(async (fornecedoraId: number) => {
        try {
            await FornecedoraService.getDetailedFornecedora(fornecedoraId).then(setFornecedora)
        } catch (error) {
            if (error instanceof ResourceNotFoundError) {
                setNotFound(true)
            } else {
                throw error;
            }


        }
    }, []);

    return {
        fornecedora,
        fetchFornecedora,
        notFound
    }
}