import { Home } from "@carbon/icons-react";
import { createSlice } from "@reduxjs/toolkit";
import { CarbonHomeTabs } from "../components/carbon_tabs/CarbonHomeTabs";
import { CreateNewTenantNewTab, CreateTenantForm, TabInfo, User } from "../interfaces/UserInterface";
import { RootState } from "./index";

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


const initialState = {
    isLoggedOut: false,
    metaDataLoginTrigger: false,
    metaDataSignUpTrigger: false,
    userLogged,
    listOfTabs
};

const sliceMenu = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleLoggedOut(state) {
            state.isLoggedOut = !state.isLoggedOut;
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

export const { toggleLoggedOut, addUserLogged, toggleMetaDataBooleanLogin, toggleMetaDataBooleanSignUp, sliceAddElementToListOfTabs, sliceRemoveElementToListOfTabs } =
    sliceMenu.actions;
export const selectUI = (state: RootState) => state.ui;

export default sliceMenu.reducer;