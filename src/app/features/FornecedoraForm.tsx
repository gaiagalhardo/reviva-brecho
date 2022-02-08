import {
    Form,
    Row,
    Col,
    Input,
    Button,
    notification,
    Avatar,
    DatePicker,
    Divider,
    Select,
    Tabs,
    Upload,
} from "antd";
import { MaskedInput } from "antd-mask-input";
import { UserOutlined } from '@ant-design/icons'
import { Fornecedora } from "../../sdk/@types/Fornecedora";
import FornecedoraService from "../../sdk/service/Fornecedora.service";
import { useState } from "react";
import CustomError from "../../sdk/CustomError";
import { Moment } from 'moment'

const { TabPane } = Tabs

type FornecedoraFormType = {
    dataAniversario: Moment;
    dataCadastro: Moment;
} & Omit<Fornecedora.Detailed, 'dataAniversario' | 'dataCadastro'>;

interface FornecedoraFormProps {
    fornecedora?: FornecedoraFormType
    onUpdate?: (fornecedora: Fornecedora.Input) => any
}

export default function FornecedoraForm(props: FornecedoraFormProps) {


    const [activeTab, setActiveTab] = useState<'personal' | 'bankAccount'>('personal')
    const [form] = Form.useForm<Fornecedora.Input>();

    return (
        <Form
            form={form}
            layout="vertical"
            autoComplete={'off'}
            onFinishFailed={(fields) => {
                let bankAccountErrors = 0
                let personalDataErrors = 0

                fields.errorFields.forEach(({ name }) => {
                    if (name.includes('banco'))
                        bankAccountErrors++
                    if (name.includes('endereco') || name.includes('email'))
                        personalDataErrors++

                })

                if (bankAccountErrors > personalDataErrors) {
                    setActiveTab('bankAccount')
                }
                if (personalDataErrors > bankAccountErrors) {
                    setActiveTab('personal')
                }

            }}

            onFinish={async (fornecedora: Fornecedora.Input) => {
                const fornecedoraDTO: Fornecedora.Input = {
                    ...fornecedora,
                    fone: fornecedora.fone.replace(/\D/g, ''),
                }

                if (props.fornecedora)
                    return props.onUpdate && props.onUpdate(fornecedoraDTO)

                try {
                    await FornecedoraService.insertNewFornecedora(fornecedoraDTO)
                    notification.success({
                        message: 'Sucesso',
                        description: 'Fornecedora salva com sucesso'
                    })
                } catch (error) {
                    console.log(error)
                    if (error instanceof CustomError) {
                        if (error.data?.objects) {
                            form.setFields(
                                error.data.objects.map((error) => {
                                    return {
                                        name: error.name
                                            ?.split(/(\.|\[|\])/gi)
                                            .filter(
                                                (str) =>
                                                    str !== "." &&
                                                    str !== "[" &&
                                                    str !== "]" &&
                                                    str !== ""
                                            )
                                            .map((str) =>
                                                isNaN(Number(str))
                                                    ? str
                                                    : Number(str)
                                            ) as string[],
                                        errors: [error.userMessage]
                                    };
                                })
                            )
                        }
                        else {
                            notification.error({
                                message: error.message,
                                description:
                                    error.data?.detail === 'Network Error'
                                        ? 'Erro na rede'
                                        : error.data?.detail
                            })
                        }

                    } else {
                        notification.error({
                            message: 'Houve um erro'
                        })
                    }
                }
            }}

            initialValues={props.fornecedora}

        >

            <Row gutter={24} >



                <Col lg={10} xs={24}>
                    <Form.Item
                        label={'Nome'}
                        name={'nome'}
                        rules={[
                            {
                                required: true,
                                message: "O campo é obrigatório"
                            }
                        ]}
                    >
                        <Input placeholder={'E.g.: Maria  '} />
                    </Form.Item>

                    <Form.Item
                        label={'Como gostaria de ser chamada(o)'}
                        name={'apelido'}
                    >
                        <Input placeholder={'E.g.: Maria  '} />
                    </Form.Item>
                </Col>

                <Col lg={10} xs={24}>
                    <Form.Item
                        label={'Data de Aniversário'}
                        name={'dataAniversario'}
                        rules={[
                            {
                                required: true,
                                message: 'O campo é obrigatório'
                            }
                        ]}
                    >
                        <DatePicker
                            style={{ width: '100%' }}
                            format={'DD/MM/YYYY'}
                        />
                    </Form.Item>
                </Col>

                <Col xs={24}>
                    <Divider />
                </Col>


                <Col lg={24} sm={24}>
                    <Tabs defaultActiveKey={'personal'} activeKey={activeTab} onChange={tab => setActiveTab(tab as 'personal' | 'bankAccount')}>
                        <TabPane key={'personal'} tab={'Dados pessoais'} >

                            <Row gutter={24}>
                                <Col lg={8} xs={24}>
                                    <Form.Item
                                        label={'Fone'}
                                        name={'fone'}
                                    >
                                        <MaskedInput
                                            mask='(11) 11111-1111'
                                            placeholder={'E.g.: 91 99999-9999'}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col lg={8} xs={24}>
                                    <Form.Item
                                        label={'E-mail'}
                                        name={'email'}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'O campo é obrigatório'
                                            }
                                        ]}
                                    >
                                        <Input type={'email'} placeholder={'E.g.: reviva@reviva.com'} />
                                    </Form.Item>
                                </Col>
                                <Col lg={8} xs={24}>
                                    <Form.Item
                                        label={'Instagram'}
                                        name={'instagram'}
                                    >
                                        <Input placeholder={'@'} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={24}>
                                <Col lg={8} xs={8}>
                                    <Form.Item
                                        label={'Estado'}
                                        name={['endereco', 'estado']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'O campo é obrigatório'
                                            }
                                        ]}
                                    >
                                        <Select placeholder={'Selecione o Estado'}>
                                            <Select.Option value={'Pa'}>
                                                PA
                                            </Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col lg={8} xs={16}>
                                    <Form.Item
                                        label={'Cidade'}
                                        name={['endereco', 'cidade']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'O campo é obrigatório'
                                            }
                                        ]}
                                    >
                                        <Input placeholder={'E.g.: Belém'} />
                                    </Form.Item>
                                </Col>
                                <Col lg={8} xs={24}>
                                    <Form.Item
                                        label={'Cep'}
                                        name={['endereco', 'cep']}
                                    >
                                        <MaskedInput
                                            mask='11.111-111'
                                            placeholder={'66.666-666'}
                                            onChange={event => {
                                                form.setFieldsValue({
                                                    endereco: {
                                                        cep: event.target.value.replace(/\D/g, '')
                                                    }
                                                })
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={24}>
                                <Col lg={8} xs={24}>
                                    <Form.Item
                                        label={'Logradouro'}
                                        name={['endereco', 'logradouro']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'O campo é obrigatório'
                                            }
                                        ]}
                                    >
                                        <Input placeholder={'E.g.: Av. Almirante Barroso, 1234'} />
                                    </Form.Item>
                                </Col>
                                <Col lg={8} xs={24}>
                                    <Form.Item
                                        label={'Bairro'}
                                        name={['endereco', 'bairro']}
                                    >
                                        <Input placeholder={'E.g.: Marco'} />
                                    </Form.Item>
                                </Col>
                                <Col lg={8} xs={24}>
                                    <Form.Item
                                        label={'Complemento'}
                                        name={['endereco', 'complemento']}
                                    >
                                        <Input placeholder={'E.g.: Apt, Bloco'} />
                                    </Form.Item>
                                </Col>
                            </Row>

                        </TabPane>
                        <TabPane key={'bankAccount'} tab={'Dados Bancários'} forceRender={true}>

                            <Row gutter={24}>
                                <Col lg={8} xs={24}>
                                    <Form.Item
                                        label={'Banco'}
                                        name={['banco', 'id']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'O campo é obrigatório'
                                            }
                                        ]}
                                    >
                                        <Select placeholder={'Selecione o banco'}>
                                            <Select.Option value={'0'}>
                                                Nenhum
                                            </Select.Option>
                                            <Select.Option key={1} value={'1'}>
                                                Banco do Brasil
                                            </Select.Option>
                                            <Select.Option key={2} value={'2'}>
                                                Caixa Econômica
                                            </Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col lg={8} xs={16}>
                                    <Form.Item
                                        label={'Conta'}
                                        name={'conta'}
                                    >
                                        <Input placeholder={'E.g.: 000000'} type={'number'} min={0} />
                                    </Form.Item>
                                </Col>
                                <Col lg={8} xs={8}>
                                    <Form.Item
                                        label={'Dígito'}
                                        name={'digito'}
                                    >
                                        <Input placeholder={'E.g.: 0'} type={'number'} min={0} max={9} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={24}>
                                <Col lg={8} xs={24}>
                                    <Form.Item
                                        label={'Agência'}
                                        name={'agencia'}
                                    >
                                        <Input placeholder={'E.g.: 1234'} />
                                    </Form.Item>
                                </Col>

                                <Col lg={8} xs={24}>
                                    <Form.Item
                                        label={'Tipo Conta'}
                                        name={'tipoConta'}
                                    >
                                        <Select placeholder={'Selecione o tipo de Conta'}>
                                            <Select.Option value={'Corrente'}>
                                                Conta Corrente
                                            </Select.Option>
                                            <Select.Option value={'Poupança'}>
                                                Conta Poupança
                                            </Select.Option>
                                            <Select.Option value={'Pagamento'}>
                                                Conta Pagamento
                                            </Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={24}>
                                <Col lg={8} xs={24}>
                                    <Form.Item
                                        label={'Chave Pix'}
                                        name={'chavePix'}
                                    >
                                        <Select placeholder={'Selecione a chave Pix'}>
                                            <Select.Option value={'celular'}>
                                                Celular
                                            </Select.Option>
                                            <Select.Option value={'email'}>
                                                E-mail
                                            </Select.Option>
                                            <Select.Option value={'CNPJ'}>
                                                CNPJ
                                            </Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col lg={8} xs={24}>
                                    <Form.Item
                                        label={'Pix'}
                                        name={'pix'}
                                    >
                                        <Input placeholder={'E.g.: 123456789'} />

                                    </Form.Item>
                                </Col>
                            </Row>
                        </TabPane>
                    </Tabs>
                </Col>

                <Col lg={24}>
                    <Row justify={'end'}>
                        <Button type={'primary'} htmlType={'submit'}>
                            {
                                props.fornecedora
                                    ? 'Atualizar Fornecedora'
                                    : 'Cadastrar Fornecedora'
                            }
                        </Button>
                    </Row>
                </Col>

            </Row>




        </Form>
    )
}