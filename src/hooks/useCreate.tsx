import React from 'react'
import { TabInfo } from '../interfaces/UserInterface'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { sliceAddElementToListOfTabs, sliceRemoveElementToListOfTabs } from '../store/switcher-slice'

export const useCreate = () => {

    const dispatch = useAppDispatch()

    const addedTab = useAppSelector((state) => state.ui.listOfTabs)

    const onCreateNewTab = (newTab: TabInfo) => {
        dispatch(sliceAddElementToListOfTabs(newTab))
    }

    const onRemovingTabs = (tabToRemove:TabInfo) => {
        dispatch(sliceRemoveElementToListOfTabs(tabToRemove))
    }

    return {
        addedTab,
        onCreateNewTab,
        onRemovingTabs
    }
}
