import request from '@/request.js'

const baseUrl = import.meta.env.VITE_API_BASE_URL_LOCATION

const locationSearch = (params = {}) => {
    return request.get(`${baseUrl}/search`, {
        params
    })
}

const reverseLocationSearch = (params = {}) => {
    return request.get(`${baseUrl}/reverse`, {
        params
    })
}

export default {locationSearch, reverseLocationSearch}