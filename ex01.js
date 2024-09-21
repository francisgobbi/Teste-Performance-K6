import http from 'k6/http'; // Neste objeto varios metodos, get etc..
import { sleep } from 'k6'; // Sllep stop no codigo
import { numeroAleatorioAte } from './utils/numeros.js';

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 20, // usuarios virtuais
  // A string specifying the total duration of the test run.
  duration: '10s',
  thresholds: {
    http_req_waiting: ['p(90) >= 10' , 'p(90) <= 50' , 'avg < 60']
  }
  //interactions: 10, 

};

// Caso de Teste
export default function() {
  http.get('https://test.k6.io'); // Acessar a pagina do K6. Neste objeto varios metodos, get etc..
  sleep(numeroAleatorioAte(15));  // Espere um tempo
 }
