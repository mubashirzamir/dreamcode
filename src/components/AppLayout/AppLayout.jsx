import {Layout} from 'antd'
import AppHeader from '@/components/AppLayout/AppHeader.jsx'

const {Content, Header} = Layout

const AppLayout = ({children}) => {
    return <Layout>
        <AppHeader/>
        <Content className="md:p-10">{children}</Content>
    </Layout>
}

export default AppLayout
