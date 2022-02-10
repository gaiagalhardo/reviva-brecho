import { Avatar, Layout, Row } from 'antd'
const { Header } = Layout

export default function DefaultLayoutHeader() {
    return (
        <Header className='header'>
            <Row
                justify='space-between'
                style={{ height: '100%' }}
                align='middle'>

                <div style={{ color: '#fff' }}>Reviva Moda Circular</div>

                <Avatar />


            </Row>
        </Header>
    );
}