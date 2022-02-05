import {
    Form,
    Row,
    Col,
    Input,
    Button,
    notification,
} from "antd";
import { Banco } from "../../sdk/@types";
import BancoService from "../../sdk/service/Banco.service";

export default function BancoForm() {

    const [form] = Form.useForm<Banco.Input>();

    return (
        <Form
            form={form}
            layout="vertical"

            onFinish={async (bank: Banco.Input) => {
                try {
                    await BancoService.insertNewBanco(bank)
                    notification.success({
                        message: 'Sucesso',
                        description: 'Banco salvo com sucesso'
                    })
                } catch (error) {
                    if (error instanceof Error) {

                    } else {
                        notification.error({
                            message: 'Houve um erro'
                        })
                    }
                }
            }}
        >
            <Row>
                <Col lg={8}>
                    <Form.Item
                        label={'Nome do Banco'}
                        name={'nome'}
                        rules={[
                            {
                                required: true,
                                message: "O campo é obrigatório"
                            }
                        ]}
                    >
                        <Input placeholder={'E.g.: Banco Z'} />
                    </Form.Item>
                </Col>
                <Col lg={24}>
                    <Row justify={'start'}>
                        <Button type={'primary'} htmlType={'submit'}>
                            Cadastrar Banco
                        </Button>
                    </Row>
                </Col>
            </Row>
        </Form>
    )
}