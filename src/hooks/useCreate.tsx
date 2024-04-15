import React from 'react'
import { TabInfo } from '../interfaces/UserInterface'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { sliceAddElementToListOfTabs, sliceRemoveElementToListOfTabs, sliceOnSetIndexToRemoveFromCreateTabButton, sliceOnSubmitFormTabIndexToRemove, sliceOnIsSubmission } from '../store/switcher-slice'

export const useCreate = () => {

    const dispatch = useAppDispatch()

    const addedTab = useAppSelector((state) => state.ui.listOfTabs)
    const getIndexToRemoveFromSubmitForm = useAppSelector((state) => state.ui.setIndexToRemoveFromCreateTabButton)
    const isSubmission = useAppSelector((state) => state.ui.isSubmission)
    const indexToRemoveFormSubmission = useAppSelector((state) => state.ui.indexToRemoveFormSubmission)


    const onSubmitFormTabIndexToRemove = (index: number) => {
        dispatch(sliceOnSubmitFormTabIndexToRemove(index))
    }

    const onIsSubmission = () => {
        dispatch(sliceOnIsSubmission())
    }

    const onCreateNewTab = (newTab: TabInfo) => {
        dispatch(sliceAddElementToListOfTabs(newTab))
    }

    const onRemovingTabs = (tabToRemove: any) => {
        console.log(tabToRemove + " &&&&&&&&")
        dispatch(sliceRemoveElementToListOfTabs(tabToRemove))
    }

    const onSetIndexToRemoveFromSubmitForm = (index: number) => {
        dispatch(sliceOnSetIndexToRemoveFromCreateTabButton(index))
    }

    return {
        addedTab,
        getIndexToRemoveFromSubmitForm,
        isSubmission,
        indexToRemoveFormSubmission,
        onCreateNewTab,
        onRemovingTabs,
        onSetIndexToRemoveFromSubmitForm,
        onSubmitFormTabIndexToRemove,
        onIsSubmission
    }
}
