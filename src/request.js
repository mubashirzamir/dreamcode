import axios from 'axios'

const request = axios.create({
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
})

request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    },
)

export default request
