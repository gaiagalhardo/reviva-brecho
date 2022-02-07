import { Col, Row } from "antd";
import FornecedoraList from "../features/FornecedoraList";

export default function FornecedoraListView() {
    return <>
        <Row>
            <Col xs={24}>
                <FornecedoraList />
            </Col>
        </Row>
    </>
}