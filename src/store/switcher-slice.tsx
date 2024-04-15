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
    disabled: false // or true based on your requirements
}];

const newDataComing = false

const initialState = {
    isLoggedOut: false,
    metaDataLoginTrigger: false,
    metaDataSignUpTrigger: false,
    userLogged,
    listOfTabs,
    newDataComing
};

const sliceMenu = createSlice({
    name: "ui",
    initialState,
    reducers: {
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
            let indexToRemove = action.payload
            console.log(indexToRemove + " INDEX SLICE")
            if (indexToRemove !== -1) {
                state.listOfTabs.splice(indexToRemove, 1);
            }
        }

    },
});

export const { sliceToggleNewDataComing, toggleLoggedOut, addUserLogged, toggleMetaDataBooleanLogin, toggleMetaDataBooleanSignUp, sliceAddElementToListOfTabs, sliceRemoveElementToListOfTabs } =
    sliceMenu.actions;
export const selectUI = (state: RootState) => state.ui;

export default sliceMenu.reducer;