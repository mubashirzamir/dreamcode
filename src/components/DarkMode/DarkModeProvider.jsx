import {createContext, useContext, useEffect, useState} from 'react'
import {ConfigProvider, theme} from 'antd'

const DarkModeContext = createContext({
    darkMode: true,
    setDarkMode: () => {
    },
})

const DarkModeProvider = ({children}) => {
    // Initialize dark mode from localStorage (fallback to true if not set)
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') !== 'false'
    })

    // Update localStorage whenever darkMode changes
    useEffect(() => {
        localStorage.setItem('darkMode', darkMode)
    }, [darkMode])

    return (
        <DarkModeContext.Provider value={{darkMode, setDarkMode}}>
            <ConfigProvider
                theme={{
                    algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                }}
            >
                <div className="flex flex-col min-h-screen">
                    {children}
                </div>
            </ConfigProvider>
        </DarkModeContext.Provider>
    )
}

export const useDarkMode = () => useContext(DarkModeContext)

export default DarkModeProvider
