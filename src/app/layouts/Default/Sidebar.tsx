import { Layout, Menu } from 'antd';
import {
    DashboardOutlined,
    FlagOutlined,
    PlusCircleOutlined,
    TableOutlined,
    BankOutlined
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router';


const { SubMenu } = Menu
const { Sider } = Layout

export default function DefaultLayoutSidebar() {

    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Sider
            width={250}
            className='site-layout-background'
            breakpoint='lg'
            collapsedWidth='0'>

            <Menu
                mode='inline'
                defaultSelectedKeys={[location.pathname]}
                defaultOpenKeys={[location.pathname.split('/')[1]]}
                style={{ height: '100%', borderRight: 0 }}
            >

                <Menu.Item
                    key='/'
                    onClick={() => navigate('/')}
                    icon={<DashboardOutlined />}>Dashboard
                </Menu.Item>

                <SubMenu
                    key='bancos'
                    icon={<BankOutlined />}
                    title='bancos'
                >
                    <Menu.Item key='/bancos/novo' onClick={() => navigate('/bancos/novo')} icon={<PlusCircleOutlined />}>Nova Banco</Menu.Item>
                    <Menu.Item key='/bancos' onClick={() => navigate('/bancos')} icon={<TableOutlined />}>Consultar</Menu.Item>

                </SubMenu>



            </Menu>
        </Sider>
    );
}