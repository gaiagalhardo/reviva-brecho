import { Layout } from 'antd';

const { Footer } = Layout;

export default function DefaultLayoutFooter() {
    return (
        <Footer style={{ textAlign: 'right' }}>
            {new Date().getFullYear()} - &copy; Gaia Galhardo
        </Footer>
    );
}