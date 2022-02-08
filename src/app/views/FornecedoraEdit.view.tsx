import { Card, notification, Skeleton } from "antd";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import useFornecedora from "../../core/hooks/useFornecedora";
import { Fornecedora } from "../../sdk/@types/Fornecedora";
import FornecedoraService from "../../sdk/service/Fornecedora.service";
import FornecedoraForm from "../features/FornecedoraForm";

export default function FornecedoraEditView() {


    const params = useParams<{ id: string }>()

    const { fornecedora, fetchFornecedora, notFound } = useFornecedora()

    useEffect(() => {

        if (!isNaN(Number(params.id)))
            fetchFornecedora(Number(params.id))
    }, [fetchFornecedora, params.id]);


    const transformFornecedoraData = useCallback(
        (fornecedora: Fornecedora.Detailed) => {
            return {
                ...fornecedora,
                dataAniversario: moment(fornecedora.dataAniversario),
                dataCadastro: moment(fornecedora.dataCadastro),
            }
        },
        []
    );

    if (isNaN(Number(params.id)))
        return <Navigate to={'/fornecedoras'} />

    if (notFound) return <Card> Fornecedora não encontrada </Card>


    function handleFornecedoraUpdate(fornecedora: Fornecedora.Input) {
        FornecedoraService
            .updateExistingFornecedora(Number(params.id), fornecedora)
            .then(() => {
                notification.success({
                    message: 'Fornecedora atualizada com sucesso'
                })
            })
    }

    if (!fornecedora) return <Skeleton />

    return (
        <>
            <FornecedoraForm
                onUpdate={handleFornecedoraUpdate}
                fornecedora={transformFornecedoraData(fornecedora)} />
        </>
    )
}