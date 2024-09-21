import http from 'k6/http'; // Neste objeto varios metodos, get etc..
import { sleep } from 'k6'; // Sleep stop no codigo
import { numeroAleatorioAte } from './utils/numeros.js';

export const options = {
  // A number specifying the number of VUs to run concurrently.  //vus: 20, // usuarios virtuais
  // A string specifying the total duration of the test run.  //duration: '10s',
  thresholds: {
    http_req_waiting: ['p(90) >= 10' , 'p(90) <= 50' , 'avg < 60']
  },
  cloud:{
    name : 'Exercicio 01',
    projectID : 3715737 
  },
  stages: [
    { target: 20, duration: '5s' },
    { target: 20, duration: '20s' },
    { target: 0, duration: '5s' },
  ]

};

// Caso de Teste
export default function() {
  http.get('https://test.k6.io'); // Acessar a pagina do K6. Neste objeto varios metodos, get etc..
  sleep(numeroAleatorioAte(15));  // Espere um tempo
 }
