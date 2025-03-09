import {Route, Routes as RouterRoutes} from 'react-router-dom'
import Home from '@/pages/Home/index.jsx'
import NotFound from '@/pages/NotFound/index.jsx'

const AppRoutes = () => {
    return <>
        <RouterRoutes>
            <Route path="/" element={<Home/>}/>
            <Route path="/*" element={<NotFound/>}/>
        </RouterRoutes>
    </>
}

export default AppRoutes