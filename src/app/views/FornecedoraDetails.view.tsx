import {
    Button,
    Card,
    Col,
    Descriptions, Divider, Row, Skeleton, Space, Typography
} from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { format } from "date-fns/esm";
import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import useFornecedora from "../../core/hooks/useFornecedora";

export default function FornecedoraDetailsView() {


    const params = useParams<{ id: string }>()

    const { lg } = useBreakpoint()

    const { fornecedora, fetchFornecedora, notFound } = useFornecedora()

    useEffect(() => {

        if (!isNaN(Number(params.id)))
            fetchFornecedora(Number(params.id))
    }, [fetchFornecedora, params.id]);


    if (isNaN(Number(params.id)))
        return <Navigate to={'/fornecedoras'} />

    if (notFound) return <Card> Fornecedora não encontrada </Card>


    if (!fornecedora) return <Skeleton />

    return (
        <Row gutter={24}>
            <Col xs={24} lg={20}>
                <Space
                    style={{ width: '100%' }}
                    direction={'vertical'}
                    align={lg ? 'start' : 'center'}
                >
                    <Typography.Title level={1}>
                        {fornecedora.nome} ({fornecedora.apelido ? `${fornecedora.apelido} -` : ''}{fornecedora.codigo})
                    </Typography.Title>
                </Space>
            </Col>

            <Col xs={24} lg={24}>
                <Typography.Title level={5}>
                    Data de Cadastro: {format(new Date(fornecedora.dataCadastro), 'dd/MM/yyyy')}
                </Typography.Title>
                <Typography.Title level={5}>
                    Data de Aniversário: {format(new Date(fornecedora.dataAniversario), 'dd/MM/yyyy')}
                </Typography.Title>
            </Col>

            <Col xs={24} lg={20}>
                <Space>
                    <Link to={`/fornecedoras/edicao/${fornecedora.id}`}>
                        <Button type="primary">
                            Editar Fornecedora
                        </Button>
                    </Link>
                    {/* <Button type="primary">
                        Remover Fornecedora
                    </Button> */}
                </Space>
            </Col>
            <Col xs={24}>
                <Divider />
            </Col>

            <Col xs={24} lg={12}>
                <Descriptions column={1} bordered size={'small'}>
                    <Descriptions.Item label={'Fone'}>{fornecedora.fone}</Descriptions.Item>
                    <Descriptions.Item label={'E-mail'}>{fornecedora.email}</Descriptions.Item>
                    <Descriptions.Item label={'Instagram'}>{fornecedora.instagram}</Descriptions.Item>
                    <Descriptions.Item label={'Estado'}>{fornecedora.endereco.estado}</Descriptions.Item>
                    <Descriptions.Item label={'Cidade'}>{fornecedora.endereco.cidade}</Descriptions.Item>
                    <Descriptions.Item label={'Logradouro'}>{fornecedora.endereco.logradouro}</Descriptions.Item>
                    <Descriptions.Item label={'Bairro'}>{fornecedora.endereco.bairro}</Descriptions.Item>
                    <Descriptions.Item label={'CEP'}>{fornecedora.endereco.cep}</Descriptions.Item>
                    <Descriptions.Item label={'Complemento'}>{fornecedora.endereco.complemento}</Descriptions.Item>
                </Descriptions>
            </Col>

            <Col xs={24} lg={12}>
                <Descriptions column={1} bordered size={'small'}>
                    <Descriptions.Item label={'Banco'}>{fornecedora.banco.nome}</Descriptions.Item>
                    <Descriptions.Item label={'Conta'}>{fornecedora.conta}</Descriptions.Item>
                    <Descriptions.Item label={'Dígito'}>{fornecedora.digito}</Descriptions.Item>
                    <Descriptions.Item label={'Agência'}>{fornecedora.agencia}</Descriptions.Item>
                    <Descriptions.Item label={'Tipo de Conta'}>{fornecedora.tipoConta}</Descriptions.Item>
                    <Descriptions.Item label={'Chave Pix'}>{fornecedora.chavePix}</Descriptions.Item>
                    <Descriptions.Item label={'Pix'}>{fornecedora.pix}</Descriptions.Item>
                </Descriptions>
            </Col>
        </Row>
    )

}