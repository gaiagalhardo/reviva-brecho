import { Col, Row } from "antd";
import BancoList from "../features/BancoList";

export default function BancoListView() {
    return <Row>
        <Col xs={24}>
            <BancoList />
        </Col>
    </Row>
}