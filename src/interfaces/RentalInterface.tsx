export interface RentalForm {
    systemName: string;
    ownerId: string;
    address: string;
    propertyRole: string
    dateFrom: string;
    dateTo: string;
    status: boolean;
    client_uid: string;
    tenant_uid: string
}