import http from 'k6/http'
import { browser } from 'k6/browser'
import { sleep } from 'k6'


export const options = {
  scenarios: {
      navegador: {
        executor: '',
        vus: 1,
        iterations: 1,
        options: {
            browser: {
                type: 'chromium'
            }

        }
    }
  }
}

export default function() { 
    const navegador = await browser.newPage();
    sleep(10)
}