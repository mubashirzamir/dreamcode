import {Alert, Result} from 'antd'
import {IN_DEV} from '@/helpers/constants.jsx'

const UhOh = ({error, resetBoundary}) => {
    const showError = () => {
        if (IN_DEV) {
            return errorDev()
        }

        return errorUser()
    }

    const errorDev = () => (
        <Alert
            type="error"
            message={<div className="whitespace-pre-line">{error?.message}</div>}
        />
    )

    const errorUser = () => (
        <Result status="500" title="Uh oh!" subTitle="Something went wrong."/>
    )

    return (
        showError()
    )
}

export default UhOh