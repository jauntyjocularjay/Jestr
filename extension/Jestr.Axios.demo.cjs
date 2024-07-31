const axios = require('axios').default

// Optionally the request above could also be done as
axios
    .get('/user', {
        params: {
            ID: 12345,
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
        const response = await axios.get('/user?ID=12345')
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}
