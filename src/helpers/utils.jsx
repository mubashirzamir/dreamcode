import {IN_DEV} from '@/helpers/constants.jsx'

export const genericNetworkError = (messageApi, error) => {
    console.error(error)
    messageApi.error(getErrorMessage(error))
}

const getErrorMessage = (error) => {
    if (IN_DEV && error?.response?.data?.message) {
        return error.response.data.message
    }

    switch (error?.response?.status) {
        case 400:
            return '400: Bad Request'
        case 401:
            return '401: Unauthorized'
        case 403:
            return '403: Forbidden'
        case 404:
            return '404: Not Found'
        case 405:
            return '405: Method Not Allowed'
        case 406:
            return '406: Not Acceptable'
        case 408:
            return '408: Request Timeout'
        case 409:
            return '409: Conflict'
        case 422:
            return '422: Unprocessable Entity'
        case 500:
            return '500: Internal Server Error'
        default:
            return 'Something went wrong'
    }
}

export const generateColor = (initial) => {
    let letter = initial.toUpperCase()

    if (!/[A-Z]/.test(letter)) {
        return '#000000'
    }

    const charCode = letter.charCodeAt(0) - 65
    const hue = (charCode * (360 / 26)) % 360
    return `hsl(${hue}, 20%, 50%)`
}