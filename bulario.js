const https = require('https');
const rejectUnauthorizedAgent = new https.Agent({ rejectUnauthorized: false });

const baseUrl = 'https://consultas.anvisa.gov.br/api/consulta';

function userAgents(){
    const agents = [
        // Navegadores de Desktop
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Safari/537.36",  // Google Chrome (Windows)
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:113.0) Gecko/20100101 Firefox/113.0",  // Mozilla Firefox (Windows)
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.64 Safari/537.36 Edg/113.0.1774.50",  // Microsoft Edge (Windows)
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15",  // Apple Safari (macOS)
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Safari/537.36",  // Google Chrome (Linux)
        "Mozilla/5.0 (X11; Linux x86_64; rv:113.0) Gecko/20100101 Firefox/113.0",  // Mozilla Firefox (Linux)
      
        // Navegadores de Dispositivos Móveis
        "Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (Android)
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Mobile/15E148 Safari/604.1",  // Safari (iOS)
        "Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (Pixel 6)
        "Mozilla/5.0 (iPad; CPU OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Mobile/15E148 Safari/604.1",  // Safari (iPad)
        "Mozilla/5.0 (Linux; U; Android 10; en-US; SM-A205U Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (Samsung Galaxy A20)
        "Mozilla/5.0 (Linux; Android 11; Mi 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (Xiaomi Mi 10)
        "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (Samsung Galaxy S10)
        "Mozilla/5.0 (Linux; Android 11; SM-G781B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (Samsung Galaxy S20)
        "Mozilla/5.0 (Linux; Android 12; SM-F926B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (Samsung Galaxy Z Fold3)
        "Mozilla/5.0 (Linux; Android 12; ONEPLUS A6013) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (OnePlus 6T)
        "Mozilla/5.0 (Linux; Android 12; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (Samsung Galaxy Note10+)
        "Mozilla/5.0 (Linux; Android 13; CPH1901) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (Oppo A5)
        "Mozilla/5.0 (Linux; Android 13; Redmi Note 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (Xiaomi Redmi Note 8)
        "Mozilla/5.0 (Linux; Android 12; SM-A505FN) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (Samsung Galaxy A50)
        "Mozilla/5.0 (Linux; Android 13; IN2013) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (OnePlus 8)
        "Mozilla/5.0 (Linux; Android 11; JNY-LX1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (Huawei P40 Lite)
        "Mozilla/5.0 (Linux; Android 12; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (Huawei P30 Pro)
        "Mozilla/5.0 (Linux; Android 13; SM-G996B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (Samsung Galaxy S21+)
        "Mozilla/5.0 (Linux; Android 13; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (Pixel 5)
      
        // Navegadores de Tablet
        "Mozilla/5.0 (Linux; Android 11; SM-T870) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Safari/537.36",  // Google Chrome (Samsung Galaxy Tab S7)
        "Mozilla/5.0 (iPad; CPU OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/96.0.4664.94 Mobile/15E148 Safari/604.1",  // Google Chrome (iPad)
        "Mozilla/5.0 (Linux; Android 10; SM-P610) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Safari/537.36",  // Google Chrome (Samsung Galaxy Tab S6 Lite)
        "Mozilla/5.0 (Linux; Android 10; SM-T510) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Safari/537.36",  // Google Chrome (Samsung Galaxy Tab A)
        "Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/604.1",  // Safari (iPad)
      
        // Outros Dispositivos
        "Mozilla/5.0 (Linux; U; Android 10; en-US; SM-A102U Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/13.2 Chrome/79.0.3945.136 Mobile Safari/537.36",  // Samsung Internet Browser (Samsung Galaxy A10)
        "Mozilla/5.0 (Linux; U; Android 11; en-US; SM-F926U Build/RP1A.200720.012) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.0 Chrome/86.0.4240.198 Mobile Safari/537.36",  // Samsung Internet Browser (Samsung Galaxy Z Fold3)
        "Mozilla/5.0 (Linux; Android 9; ONEPLUS A6003) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (OnePlus 6)
        "Mozilla/5.0 (Linux; Android 9; LG-H870) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (LG G6)
        "Mozilla/5.0 (Linux; Android 11; Lenovo TB-8705F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Safari/537.36",  // Google Chrome (Lenovo Tab M8)
        "Mozilla/5.0 (Linux; Android 12; Sony G8142) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (Sony Xperia XZ Premium)
        "Mozilla/5.0 (Linux; Android 10; NOKIA 6.2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.93 Mobile Safari/537.36",  // Google Chrome (Nokia 6.2)
    ];
    return agents[Math.floor(Math.random() * userAgents.length)];
}

function headers() {
    return {
        "accept": "application/json, text/plain, */*",
        "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "authorization": "Guest",
        "cache-control": "no-cache",
        "if-modified-since": "Mon, 26 Jul 1997 05:00:00 GMT",
        "pragma": "no-cache",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": "FGTServer=77E1DC77AE2F953D7ED796A08A630A01A53CF6FE5FD0E106412591871F9A9BBCFBDEA0AD564FD89D3BDE8278200B; FGTServer=77E1DC77AE2F953D7ED796A08A630A01A53CF6FE5FD0E106412591871F9A9BBCFBDEA0AD564FD89D3BDE8278200B; FGTServer=77E1DC77AE2F953D7ED796A08A630A01A53CF6FE5FD0E106412591871F9A9BBCFBDEA0AD564FD89D3BDE8278200B; _pk_id.42.210e=8eca716434ce3237.1690380888.; FGTServer=77E1DC77AE2F953D7ED796A08A630A01A53CF6FE5FD0E106412591871F9A9BBCFBDEA0AD564FD89D3BDE8278200B; _cfuvid=L.SzxLLxZoWYrYqhaiRgS5MTkV77mwE5uIyLNWvyufk-1690462598410-0-604800000; _pk_ref.42.210e=%5B%22%22%2C%22%22%2C1690462669%2C%22https%3A%2F%2Fwww.google.com%2F%22%5D; _pk_ses.42.210e=1; cf_clearance=tk5QcLSYPlUQfr8s2bTGXyvC2KZdHcEIYU8r6HCgNvQ-1690462689-0-160.0.0",
        "Referer": "https://consultas.anvisa.gov.br/",
        "UserAgent": userAgents(),
        "Referrer-Policy": "no-referrer-when-downgrade"
    }
}

async function fetchUrl(url, isFile) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            agent: rejectUnauthorizedAgent,
            headers: headers()
        });

        if (isFile) {
            const buffer = await response.arrayBuffer();
            return Buffer.from(buffer);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}

async function getPdf(idBula) {
    const data = await fetchUrl(`${baseUrl}/medicamentos/arquivo/bula/parecer/${idBula}/?Authorization=`, true);
    return data;
}

async function getMedicamento(numProcesso) {
    const data = await fetchUrl(`${baseUrl}/medicamento/produtos/${numProcesso}`, false);
    return data;
}

async function getListMedicamento(page) {
    const data = await fetchUrl(`${baseUrl}/bulario?count=50&page=${page}`, false);
    return data;
}

module.exports = {
    getListMedicamento,
    getMedicamento,
    getPdf
}
