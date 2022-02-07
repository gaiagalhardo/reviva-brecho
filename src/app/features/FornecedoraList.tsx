import {
    Button,
    Card,
    Input,
    Space,
    Table,
    Tooltip
} from "antd"
import { useEffect, useState } from "react"
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
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
                    dataIndex: 'id',
                    title: '#'
                },
                {
                    dataIndex: 'codigo',
                    title: 'Código'
                },
                {
                    dataIndex: 'nome',
                    title: 'Nome',
                    ...getColumnSearchProps('nome', 'Nome')
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
                    title: 'E-mail',
                    ...getColumnSearchProps('email', 'E-mail')
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