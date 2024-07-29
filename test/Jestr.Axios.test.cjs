
const instance = axios.create({
    baseURL: 'https://control.smartrent-qa.com/dev',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});




