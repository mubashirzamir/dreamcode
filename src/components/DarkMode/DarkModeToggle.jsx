import {MoonOutlined, SunOutlined} from '@ant-design/icons'
import {Button} from 'antd'
import {useDarkMode} from '@/components/DarkMode/DarkModeProvider.jsx'

const DarkModeToggle = () => {
    const {darkMode, setDarkMode} = useDarkMode()

    return <Button
        icon={darkMode ? <SunOutlined/> : <MoonOutlined/>}
        onClick={() => setDarkMode(!darkMode)}
    />
}

export default DarkModeToggle