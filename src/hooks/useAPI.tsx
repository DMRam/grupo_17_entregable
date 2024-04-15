import React from 'react'
import { TabInfo } from '../interfaces/UserInterface'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { sliceAddElementToListOfTabs, sliceRemoveElementToListOfTabs, sliceToggleNewDataComing } from '../store/switcher-slice'

export const useAPI = () => {

    const dispatch = useAppDispatch()

    const newDataComing = useAppSelector((state) => state.ui.newDataComing)

    const toggleNewDataComing = () => {
        dispatch(sliceToggleNewDataComing())
    }

    return {
        newDataComing,
        toggleNewDataComing,
    }
}
