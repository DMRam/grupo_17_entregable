import { ReactNode } from "react";

export interface User {
    email: string;
    google: boolean;
    img: string;
    name: string;
    status: boolean;
    uid: string
}

export interface TabItem {
    label: string;
    panel?: (index: number) => JSX.Element; // Updated to accept a function with index parameter
    icon: () => JSX.Element;
    disabled: boolean;
}

export interface CreateTenantForm {
    name: string;
    address: string;
    phone: string
}
export interface CreateNewTenantNewTab {
    label: string;
    panel: ReactNode;
    icon: () => ReactNode;
    disabled: boolean;
}
export interface TabInfo {
    label: string;
    panel: JSX.Element;
    icon: () => JSX.Element;
    disabled: boolean;
    fromCreateGrid?: boolean;
    email?: string
}

export interface Property {
    propertyRole: string;
    number: string;
    department_number: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
}

export interface Client {
    name: string;
    email: string;
    brokerIdAssociated: string;
    address: string;
    references: string;
    age: number
    gender: null,
    maritalStatus: string;
    details: string;
    uploadedFile: null,
    property: Property;
}

