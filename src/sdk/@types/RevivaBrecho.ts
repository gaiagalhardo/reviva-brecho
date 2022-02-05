export namespace RevivaBrecho {

    export interface components {
        schemas: {
            BancoSummary: {
                id: number
                nome: string
            };
            BancoInput: {
                nome: string
            };
            BancoIdInput: {
                id: number
            }

            FornecedoraSummary: {
                id: number
                codigo: string
                nome: string
                dataAniversario: string
                dataCadastro: string
                fone: string
                email: string
                instagram: string
            },
            FornecedoraInput: {
                nome: string
                apelido: string
                dataAniversario: string
                endereco: components['schemas']['EnderecoInput']
                fone: string
                email: string
                instagram: string
                banco: components['schemas']['BancoIdInput']
                conta: string
                digito: string
                agencia: string
                tipoConta: string
                chavePix: string
                pix: string
            },
            EnderecoInput: {
                estado: string
                cidade: string
                logradouro: string
                bairro: string
                cep: string
                complemento: string
            }

        }
    }

}