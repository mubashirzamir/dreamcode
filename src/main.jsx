import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ErrorBoundary} from 'react-error-boundary'
import {BrowserRouter} from 'react-router-dom'
import UhOh from '@/components/UhOh/UhOh.jsx'
import DarkModeProvider from '@/components/DarkMode/DarkModeProvider.jsx'
import {MessageProvider} from '@/components/MessageProvider/MessageProvider.jsx'
import AppLayout from '@/components/AppLayout/AppLayout.jsx'
import {ModalProvider} from '@/components/ModalProvider/ModalProvider.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <DarkModeProvider>
            <BrowserRouter>
                <AppLayout>
                    <ErrorBoundary FallbackComponent={UhOh}>
                        <MessageProvider>
                            <ModalProvider>
                                <App/>
                            </ModalProvider>
                        </MessageProvider>
                    </ErrorBoundary>
                </AppLayout>
            </BrowserRouter>
        </DarkModeProvider>
    </StrictMode>,
)
