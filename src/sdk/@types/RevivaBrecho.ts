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
            FornecedoraDetailed: {
                id: number
                codigo: string
                nome: string
                apelido: string
                dataAniversario: string
                dataCadastro: string
                endereco: components['schemas']['EnderecoDetailed']
                fone: string
                email: string
                instagram: string
                banco: components['schemas']['BancoSummary']
                conta: string
                digito: string
                agencia: string
                tipoConta: string
                chavePix: string
                pix: string
            }
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
            EnderecoDetailed: {
                estado: string
                cidade: string
                logradouro: string
                bairro: string
                cep: string
                complemento: string
            }
            EnderecoInput: {
                estado: string
                cidade: string
                logradouro: string
                bairro: string
                cep: string
                complemento: string
            },

            Problem: {
                status: number
                timestamp: string
                type: string
                title: string
                detail: string
                userMessage?: string
                objects?: components['schemas']['Problembject'][]
            },
            Problembject: {
                name?: string
                userMessage: string
            }

        }
    }

}