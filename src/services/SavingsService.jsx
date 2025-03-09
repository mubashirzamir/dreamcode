import request from '@/request.js'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const waterSavings = (params = {}) => {
    return request.get(`${baseUrl}/water-savings`, {
        params
    })
}

export default {waterSavings}


