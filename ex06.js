import http from 'k6/http';
import { sleep } from 'k6';

const bodyRequestLogin = JSON.stringify({
    usuarioLogin: __ENV.USUARIOLOGIN,
    usuarioSenha: __ENV.USUARIOSENHA
})
export const options = {
  cloud: {
    name: 'Exercício 06',
    projectID: 3715737
  },
  scenarios: {
    usuarioDesocupado: {
        executor: 'ramping-vus',
        stages: [
            { target: 3, duration: '5s' },
            { target: 3, duration: '30s' },
            { target: 0, duration: '5s' }
        ],
        exec: 'desocupado'
    },
    usuarioJaCadastrado: {
        executor: 'ramping-vus',
        stages: [
            { target: 10, duration: '1s' },
            { target: 0, duration: '1s' },
        ],
        exec: 'jaEUsuario',
        startTime: '10s'
    }
  }
  
}

export function desocupado() { 
  http.get('http://165.227.93.41/lojinha-web/v2/',bodyRequestLogin);
  sleep(1);
}

export function jaEUsuario() { 
  http.get('http://165.227.93.41/lojinha-web/v2/',bodyRequestLogin);
  
  http.post(
    'http://165.227.93.41/lojinha-web/v2/login/entrar', 
    
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )

  http.get('http://165.227.93.41/lojinha-web/v2/produto')  
  sleep(1);
}


