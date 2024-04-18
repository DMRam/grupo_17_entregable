import { createSlice } from "@reduxjs/toolkit";
import { CreateTenantForm, TabInfo, User } from "../interfaces/UserInterface";
import { RootState } from "./index";


/**
 * TODO
 * > Create endpoints for form submission
 * > Create endpoint to consume data 
 *  > eg Get all Rentals where userId is equals to logged Uid
 */


interface ToggleState {
    isVisible: boolean;
}

// User Initial State Frontend
const userLogged: User =
{
    uid: '',
    name: "",
    email: "",
    google: false,
    img: '',
    status: true
}

const userTenant: User = {
    email: "",
    google: false,
    img: "",
    name: "",
    status: false,
    uid: ""
}

const createTenantViewForm: CreateTenantForm = {
    name: "",
    address: "",
    phone: ""
}

let listOfTabs: TabInfo[] = [{
    label: '',
    panel: <></>, // You can use an empty fragment as a default JSX element
    icon: () => <></>, // You can use an empty fragment as a default icon component
    disabled: false, // or true based on your requirements
    email: ''
}];
const setIndexToRemoveFromCreateTabButton = 0
const newDataComing = false
const isSubmission = false
const indexToRemoveFormSubmission = 0
const onSubmissionDoRefresh = false

const initialState = {
    isLoggedOut: false,
    metaDataLoginTrigger: false,
    metaDataSignUpTrigger: false,
    userLogged,
    listOfTabs,
    newDataComing,
    setIndexToRemoveFromCreateTabButton,
    isSubmission,
    indexToRemoveFormSubmission,
    onSubmissionDoRefresh
};

const sliceMenu = createSlice({
    name: "ui",
    initialState,
    reducers: {
        sliceOnSetIndexToRemoveFromCreateTabButton(state, action) {
            state.setIndexToRemoveFromCreateTabButton = action.payload
        },
        sliceToggleNewDataComing(state) {
            state.newDataComing = !state.newDataComing
        },
        toggleLoggedOut(state, action) {
            state.isLoggedOut = action.payload
        },
        addUserLogged(state, action) {
            state.userLogged = action.payload
        },
        toggleMetaDataBooleanLogin(state) {
            state.metaDataLoginTrigger = !state.metaDataLoginTrigger
        },
        toggleMetaDataBooleanSignUp(state) {
            state.metaDataSignUpTrigger = !state.metaDataSignUpTrigger
        },
        sliceAddElementToListOfTabs(state, action) {
            state.listOfTabs.push(action.payload);
        },
        sliceRemoveElementToListOfTabs(state, action) {
            // const indexToRemove = state.listOfTabs.findIndex(tab => tab.label === action.payload.label);
            console.log(action.payload + " &&&&&&&&")
            let indexToRemove = action.payload
            console.log(indexToRemove + " INDEX SLICE")
            if (indexToRemove !== -1) {
                state.listOfTabs.splice(indexToRemove, 1);
            }
        }, sliceOnSubmitFormTabIndexToRemove(state, action) {
            state.indexToRemoveFormSubmission = action.payload
        },
        sliceOnIsSubmission(state) {
            state.isSubmission = !state.isSubmission
        },

        sliceToggleOnSubmissionDoRefresh(state) {
            state.onSubmissionDoRefresh = !state.onSubmissionDoRefresh
        }
    },
});

export const { sliceToggleOnSubmissionDoRefresh, sliceOnIsSubmission, sliceOnSubmitFormTabIndexToRemove, sliceOnSetIndexToRemoveFromCreateTabButton, sliceToggleNewDataComing, toggleLoggedOut, addUserLogged, toggleMetaDataBooleanLogin, toggleMetaDataBooleanSignUp, sliceAddElementToListOfTabs, sliceRemoveElementToListOfTabs } =
    sliceMenu.actions;
export const selectUI = (state: RootState) => state.ui;

export default sliceMenu.reducer;