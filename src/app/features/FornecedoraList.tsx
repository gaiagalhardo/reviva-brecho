import {
    Button,
    Card,
    Descriptions,
    Input,
    Space,
    Table,
    Tooltip
} from "antd"
import { useEffect, useState } from "react"
import format from 'date-fns/format';
import {
    EyeOutlined,
    EditOutlined,
    SearchOutlined
} from '@ant-design/icons'
import { Fornecedora } from "../../sdk/@types/Fornecedora"
import FornecedoraService from "../../sdk/service/Fornecedora.service"
import { Link } from "react-router-dom";
import { ColumnProps } from "antd/lib/table";

export default function FornecedoraList() {

    const [fornecedoras, setFornecedoras] = useState<Fornecedora.Summary[]>([])

    useEffect(() => {
        FornecedoraService
            .getAllFornecedoras()
            .then(setFornecedoras)
    }, [])

    const getColumnSearchProps = (
        dataIndex: keyof Fornecedora.Summary,
        displayName?: string
    ): ColumnProps<Fornecedora.Summary> => ({
        filterDropdown: ({
            selectedKeys,
            setSelectedKeys,
            confirm,
            clearFilters

        }) =>
        (
            <Card>
                <Input
                    style={{ marginBottom: 8, display: 'block' }}
                    value={selectedKeys[0]}
                    placeholder={`Buscar ${displayName || dataIndex}`}
                    onChange={(e) => {
                        setSelectedKeys(
                            e.target.value ? [e.target.value] : []
                        );
                    }}

                    onPressEnter={() => confirm()}
                />
                <Space>
                    <Button
                        type={'primary'}
                        size={'small'}
                        style={{ width: 90 }}
                        onClick={() => confirm()}
                        icon={<SearchOutlined />}
                    >
                        Buscar
                    </Button>
                    <Button
                        onClick={() => clearFilters}
                        size={'small'}
                        style={{ width: 90 }}
                    >
                        Limpar
                    </Button>
                </Space>
            </Card>
        ),

        filterIcon: (filtered: boolean) => (
            <SearchOutlined
                style={{ color: filtered ? '#0099ff' : undefined }}
            />
        ),

        // @ts-ignore
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLocaleLowerCase()
                    .includes((value as string).toLocaleLowerCase())
                : ''

    })

    return <>
        <Table<Fornecedora.Summary>
            rowKey={'id'}
            dataSource={fornecedoras}
            columns={[
                {
                    title: 'Fornecedoras',
                    responsive: ['xs'],
                    render(fornecedora: Fornecedora.Summary) {
                        return (
                            <Descriptions column={1} size={'small'}>
                                <Descriptions.Item label={'Código'}>
                                    {fornecedora.codigo}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Nome'}>
                                    {fornecedora.nome}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Nascimento'}>
                                    {format(
                                        new Date(fornecedora.dataAniversario),
                                        'dd/MM/yyyy'
                                    )}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Fone'}>
                                    {fornecedora.fone}
                                </Descriptions.Item>
                                <Descriptions.Item label={'E-mail'}>
                                    {fornecedora.email}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Instagram'}>
                                    {fornecedora.instagram}
                                </Descriptions.Item>
                                <Descriptions.Item label={'Ações'}>
                                    <Space>
                                        <Tooltip title={'Visualizar Fornecedora'} placement={'right'}>
                                            <Link to={`/fornecedoras/${fornecedora.id}`}>
                                                <Button size='small' icon={<EyeOutlined />} />
                                            </Link>
                                        </Tooltip>
                                        <Tooltip title={'Editar Fornecedora'} placement={'right'}>
                                            <Link to={`/fornecedoras/edicao/${fornecedora.id}`}>
                                                <Button size='small' icon={<EditOutlined />} />
                                            </Link>
                                        </Tooltip>
                                    </Space>
                                </Descriptions.Item>
                            </Descriptions>
                        )
                    }
                },
                {
                    dataIndex: 'codigo',
                    title: 'Código',
                    width: 48,
                    align: 'center',
                    responsive: ['sm']
                },
                {
                    dataIndex: 'nome',
                    title: 'Nome',
                    ...getColumnSearchProps('nome', 'Nome'),
                    width: 200,
                    responsive: ['sm']
                },
                {
                    dataIndex: 'dataAniversario',
                    title: 'Nascimento',
                    align: 'center',
                    width: 150,
                    responsive: ['sm'],
                    render(dataAniversario: string) {
                        return format(
                            new Date(dataAniversario), 'dd/MM/yyyy'
                        )
                    }
                },
                {
                    dataIndex: 'fone',
                    title: 'Fone',
                    width: 120,
                    responsive: ['sm']
                },
                {
                    dataIndex: 'email',
                    title: 'E-mail',
                    ...getColumnSearchProps('email', 'E-mail'),
                    width: 200,
                    responsive: ['sm']
                },
                {
                    dataIndex: 'instagram',
                    title: 'Instagram',
                    width: 110,
                    responsive: ['sm']
                },
                {
                    dataIndex: 'id',
                    title: 'Ações',
                    align: 'center',
                    width: 100,
                    responsive: ['sm'],
                    render(id: number) {
                        return <Space>
                            <Tooltip title={'Visualizar Fornecedora'} placement={'right'}>
                                <Link to={`/fornecedoras/${id}`}>
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