import React from 'react'
import { User } from '../interfaces/UserInterface'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { toggleLoggedOut } from '../store/switcher-slice'

export const useAuthentication = () => {
    const dispatch = useAppDispatch()
    // this is the userLogged from redux
    const isUserLoggedOut = useAppSelector((state) => state.ui.isLoggedOut)


    const onUserLoggingOut = (isLoggedOut:boolean) => {
        
        dispatch(toggleLoggedOut(isLoggedOut))
    }
    return {
        onUserLoggingOut,
        isUserLoggedOut
    }
}
