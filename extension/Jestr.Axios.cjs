
const axios = require('axios').default

const url = ''
const base_url = ''
const endpoint = {
    resident: {
        unit: {
            list: '/api/v3/unit'
        },
        device: {
            list: ''
        }
    }
}

axios.get(base_url + endpoint.resident.unit.list)



// Optionally the request above could also be done as
axios
    .get(url, {
        key: {
            key: value,
        },
    })
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
    .finally(() => {
        // always executed
    })

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
    try {
        const response = await axios.get(url)
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}
