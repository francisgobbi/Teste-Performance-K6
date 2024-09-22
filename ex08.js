import http from 'k6/http'
import { browser } from 'k6/browser'
import { sleep } from 'k6'


export const options = {
  scenarios: {
      navegador: {
        executor: 'per-vu-',
        vus: 1,
        iterations: 1,
        options: {
            browser: {
                type: 'chromium',
                headless : 'false'
            }

        }
    }
  }
}

export default async function() { 
    const navegador = await browser.newPage();
    
    await navegador.goto('http://165.227.93.41/lojinha-web/v2/')
    await navegador.fill('#usuario','admin')
    await navegador.fill('#senha','admin')
    await navegador.screenshot({path: 'evidencias/1.png'})
    await navegador.click('#btn-entrar')    

    sleep(10)
}