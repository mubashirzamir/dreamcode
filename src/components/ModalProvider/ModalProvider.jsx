import {Modal} from 'antd'
import {createContext, useContext} from 'react'

const ModalContext = createContext(null)

export const ModalProvider = ({children}) => {
    const [modal, contextHolder] = Modal.useModal()

    return (
        <ModalContext.Provider value={modal}>
            {contextHolder}
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    return useContext(ModalContext)
}