import { Button, Space, Table } from "antd"
import { EyeOutlined, EditOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react"
import { Banco } from "../../sdk/@types"
import BancoService from "../../sdk/service/Banco.service"

export default function BancoList() {

    const [bancos, setBancos] = useState<Banco.Summary[]>([])

    useEffect(() => {
        BancoService
            .getAllBancos()
            .then(setBancos)
    }, [])

    return <>
        <Table<Banco.Summary>
            size='small'
            dataSource={bancos}
            columns={[
                {
                    dataIndex: 'id',
                    title: '#',
                },
                {
                    dataIndex: 'nome',
                    title: 'Nome',
                },
                {
                    dataIndex: 'id',
                    title: 'Ações',
                    align: 'right',
                    render() {
                        return <Space>
                            <Button size='small' icon={<EyeOutlined />} />
                            <Button size='small' icon={<EditOutlined />} />
                        </Space>
                    }
                }

            ]}
        />
    </>
}