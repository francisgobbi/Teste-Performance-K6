import http from 'k6/http';
import { sleep, check } from 'k6';
import { numeroAleatorioAte } from './utils/numeros.js';
export const options = {
 
  cloud:{
    name : 'Exercicio 02',
    projectID : 3715737 
  },
  stages: [
    { target: 20, duration: '5s' },
    { target: 20, duration: '20s' },
    { target: 0, duration: '5s' },
  ]
};


export default function() {

 const respostaHomePageLojinha = http.get('http://165.227.93.41/lojinha-web/v2/'); // Retorna uma Response com Body
 console.log(respostaHomePageLojinha.html().find('h4').text())

 sleep(numeroAleatorioAte(15));

 check(respostaHomePageLojinha, {
    'Checar se o Status Code é igual 200': r=> r.status === 200,
    'Checar se o Status Code é diferente 200': r=> r.status === 201,
    'O botão possui o texto Entrar': (r) => r.html().find('title').text('Lojinha'),
    'Validar que o Titulo da página é Lojinha ': (r) => r.html().find('button').text().includes('Entrar')
 })

 const coproDaRequestLogin = {
    usuario: __ENV.USUARIOLOGIN ,
    senha: __ENV.USUARIOSENHA
 }
 
 const opcoesDaRequestDoLogin = {
  headers : {
    'Content-Type' : 'application/x-www-form-urlencoded'
  }
}

const respostaLogin = http.post('http://165.227.93.41/lojinha-web/v2/login/entrar',coproDaRequestLogin , opcoesDaRequestDoLogin)

// Cookies que mostram que eu fiz login
const cookieJar = http.cookieJar();
const cookiesQuePegueiNoLogin = cookieJar.cookiesForURL(respostaLogin.url)
 
http.post('http://165.227.93.41/lojinha-web/v2/produto', {
  cookies: cookiesQuePegueiNoLogin // Prova que eu sou o Admin e já fiz login
})


 http.get('http://165.227.93.41/lojinha-web/v2/produto/novo', {
   cookies: cookiesQuePegueiNoLogin // Prova que eu sou o Admin e já fiz login
})

 sleep(1)
}


 //respostaHomePageLojinha.html().find('h4').text()
 //console.log(respostaHomePageLojinha.status)
 //console.log(respostaHomePageLojinha.status_text)
 //console.log(respostaHomePageLojinha.remote_ip)
 //console.log(respostaHomePageLojinha.body)
 //console.log(respostaHomePageLojinha.html)
 //console.log(respostaHomePageLojinha.html().find('h4').text())
 //console.log(respostaHomePageLojinha.html().find('title').text())
 //console.log(respostaHomePageLojinha.html().find('#btn-entrar').attr('name'))
 //console.log(respostaHomePageLojinha.html().find('#btn-entrar').text('Entrar'))
