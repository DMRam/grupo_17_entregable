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
    panel: ReactNode;
    icon: () => ReactNode;
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
}
