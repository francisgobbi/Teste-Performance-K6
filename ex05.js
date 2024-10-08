import http from 'k6/http'
import { sleep, check, group } from 'k6'
import { faker } from 'https://esm.sh/@faker-js/faker'

export const options = {    
    cloud:{
      name : 'Exercicio 05',
      projectID : 3715737 
    },
    thresholds: {
      http_req_failed: [ 'rate < 0.01' ]
    },
    stages: [
      { target: 20, duration: '5s' },
      { target: 20, duration: '20s' },
      { target: 0, duration: '5s' },
    ]
  };
export default function() {
    let tokenColetadoNaResposta;

    group('Obtendo o Token do Usuário', () => {
        const endpointRequestLogin = 'http://165.227.93.41/lojinha/v2/login'

        const bodyRequestLogin = JSON.stringify({
            usuarioLogin: __ENV.USUARIOLOGIN,
            usuarioSenha: __ENV.USUARIOSENHA
        })

        const optionsRequestLogin = {
            headers: {
                'Content-Type': 'application/json'
            }
        } 

        const respostaLogin = http.post(endpointRequestLogin, bodyRequestLogin, optionsRequestLogin)

        check(respostaLogin, {
            'Status code é igual a 200': r => r.status === 200,
            'A mensagem de sucesso ao realizar o login foi apresentada': r => r.json('message') === 'Sucesso ao realizar o login'
        })

        // Extraiam o token da resposta usando GJson
        tokenColetadoNaResposta = respostaLogin.json('data.token')
    })

    group('Cadastrar um Novo Produto', () => {
        // Cadastrem um produto
        const respostaCadastroProduto = http.post(
            'http://165.227.93.41/lojinha/v2/produtos',
            JSON.stringify({
                produtoNome: faker.food.fruit(),
                produtoValor: 50,
                produtoCores: [ 'preto', 'branco' ]
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    token: tokenColetadoNaResposta
                }
            }
        )

        // Checks
        // - Status Code
        // - Mensagem
        // - Sgunda Cor do Produto
        check(respostaCadastroProduto, {
            'Status Code é 201': r => r.status === 201,
            'Mensagem é produto adicionado com sucesso': r => r.json().message === 'Produto adicionado com sucesso',
            'Segunda cor do produto é branco': r => r.json('data.produtoCores.1') === 'branco',
            'Segunda cor do produto é branco (sem GJSON)': r => r.json().data.produtoCores[1] === 'branco',
        })
    })

    group('User Think Time Após o Cadastro', () => {
        sleep(1) // Entenda o comportamento e quem é seu usuário
    })
}