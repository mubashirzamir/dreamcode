import DarkModeToggle from '@/components/DarkMode/DarkModeToggle.jsx'
import {Layout, theme, Typography} from 'antd'
import AquaSyncIcon from '@/assets/aquasync.svg?react'
import {Link} from 'react-router-dom'

const AquaSync = () => <AquaSyncIcon width={40} height={40}/>
const {Title} = Typography
const {Header} = Layout

const AppHeader = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken()

    return <Header
        className="sticky top-0 z-10 w-full flex items-center"
        style={{backgroundColor: colorBgContainer}}
    >
        <Link to="/">
            <Title level={2} className="!mb-0 flex items-center">
                <AquaSync/>
                <span className="ml-4">AquaSync</span>
            </Title>
        </Link>
        <div className="ml-auto">
            <DarkModeToggle/>
        </div>
    </Header>
}

export default AppHeader