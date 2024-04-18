import React from 'react'
import { TabInfo } from '../interfaces/UserInterface'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { sliceToggleOnSubmissionDoRefresh, sliceAddElementToListOfTabs, sliceRemoveElementToListOfTabs, sliceOnSetIndexToRemoveFromCreateTabButton, sliceOnSubmitFormTabIndexToRemove, sliceOnIsSubmission } from '../store/switcher-slice'

export const useCreate = () => {

    const dispatch = useAppDispatch()

    const addedTab = useAppSelector((state) => state.ui.listOfTabs)
    const getIndexToRemoveFromSubmitForm = useAppSelector((state) => state.ui.setIndexToRemoveFromCreateTabButton)
    const isSubmission = useAppSelector((state) => state.ui.isSubmission)
    const indexToRemoveFormSubmission = useAppSelector((state) => state.ui.indexToRemoveFormSubmission)
    const triggerRefresh = useAppSelector((state) => state.ui.onSubmissionDoRefresh)


    const onSubmitFormTabIndexToRemove = (index: number) => {
        dispatch(sliceOnSubmitFormTabIndexToRemove(index))
    }

    const onIsSubmission = () => {
        dispatch(sliceOnIsSubmission())
    }

    const onCreateNewTab = (newTab: TabInfo) => {
        console.log(JSON.stringify(newTab) + " DENTRO DEL CUSTOM HOOK")
        dispatch(sliceAddElementToListOfTabs(newTab))
    }

    const onRemovingTabs = (tabToRemove: any) => {
        console.log(tabToRemove + " &&&&&&&&")
        dispatch(sliceRemoveElementToListOfTabs(tabToRemove))
    }

    const onSetIndexToRemoveFromSubmitForm = (index: number) => {
        dispatch(sliceOnSetIndexToRemoveFromCreateTabButton(index))
    }

    const onSubmissionDoRefresh = () => {
        dispatch(sliceToggleOnSubmissionDoRefresh())
    }
    

    return {
        addedTab,
        getIndexToRemoveFromSubmitForm,
        isSubmission,
        indexToRemoveFormSubmission,
        triggerRefresh,
        onCreateNewTab,
        onRemovingTabs,
        onSetIndexToRemoveFromSubmitForm,
        onSubmitFormTabIndexToRemove,
        onIsSubmission,
        onSubmissionDoRefresh
    }
}
