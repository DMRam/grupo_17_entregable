import React from 'react'
import { User } from '../interfaces/UserInterface'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addUserLogged } from '../store/switcher-slice'

export const useUser = () => {
    const dispatch = useAppDispatch()

    // this is the userLogged from redux
    const userLoggedGlobal = useAppSelector((state) => state.ui.userLogged)


    const onAddUserLoggedToGlobalAppState = (user: User) => {
        dispatch(addUserLogged(user))
    }
    return {
        onAddUserLoggedToGlobalAppState,
        userLoggedGlobal
    }
}
