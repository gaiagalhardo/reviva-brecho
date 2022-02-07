import { Button, Space, Table, Tooltip } from "antd"
import { useEffect, useState } from "react"
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { EyeOutlined, EditOutlined } from '@ant-design/icons'
import { Fornecedora } from "../../sdk/@types/Fornecedora"
import FornecedoraService from "../../sdk/service/Fornecedora.service"
import { Link } from "react-router-dom";

export default function FornecedoraList() {

    const [fornecedoras, setFornecedoras] = useState<Fornecedora.Summary[]>([])

    useEffect(() => {
        FornecedoraService
            .getAllFornecedoras()
            .then(setFornecedoras)
    }, [])

    return <>
        <Table<Fornecedora.Summary>
            rowKey={'id'}
            dataSource={fornecedoras}
            columns={[
                {
                    dataIndex: 'id',
                    title: '#'
                },
                {
                    dataIndex: 'codigo',
                    title: 'Código'
                },
                {
                    dataIndex: 'nome',
                    title: 'Nome'
                },
                {
                    dataIndex: 'dataAniversario',
                    title: 'Data de Nascimento',
                    render(dataAniversario: string) {
                        return format(
                            parseISO(dataAniversario), 'dd/MM/yyyy'
                        )
                    }
                },
                {
                    dataIndex: 'fone',
                    title: 'Fone'
                },
                {
                    dataIndex: 'email',
                    title: 'E-mail'
                },
                {
                    dataIndex: 'instagram',
                    title: 'Instagram'
                },
                {
                    dataIndex: 'id',
                    title: 'Ações',
                    align: 'center',
                    render(id: number) {
                        return <Space>
                            <Tooltip title={'Visualizar Fornecedora'} placement={'right'}>
                                <Link to={''}>
                                    <Button size='small' icon={<EyeOutlined />} />
                                </Link>
                            </Tooltip>
                            <Tooltip title={'Editar Fornecedora'} placement={'right'}>
                                <Link to={`/fornecedoras/edicao/${id}`}>
                                    <Button size='small' icon={<EditOutlined />} />
                                </Link>
                            </Tooltip>
                        </Space>
                    }
                },

            ]}
        />
    </>
}