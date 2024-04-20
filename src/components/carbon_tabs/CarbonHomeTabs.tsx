import { InventoryManagement } from "@carbon/icons-react";
import { Tab, TabList, TabPanel, TabPanels, Tabs, Tile } from "@carbon/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { clientHeader } from "../../data/ClientData";
import { rentHeaderData, rentRowData } from "../../data/DummyData";
import { tenantHeader } from "../../data/TenantData";
import { urlToApiCall } from "../../data/UrlForAPICalls";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useCreate } from "../../hooks/useCreate";
import { useUser } from "../../hooks/useUser";
import { useRefresh } from "../../provider/RefreshProvider";
import { ImmDashboard } from "../../screens/dashboard/ImmDashboard";
import { CarbonGrid } from "../carbon_grid/CarbonGrid";
import { CarbonGridSimple } from "../carbon_grid/CarbonGridSimple";

export const CarbonHomeTabs = () => {

    const [rowsFromApi, setRowsFromApi] = useState([])
    const [clientRowsFromApi, setClientRowsFromApi] = useState([])
    const { isUserLoggedOut } = useAuthentication()
    const { userLoggedGlobal } = useUser()
    const { triggerRefresh } = useCreate()
    
    const generateId = (() => {
        let id = 0;
        return () => String.fromCharCode(97 + id++);
    })();

    const [forceUpdate, setForceUpdate] = useState(true);

    const [refreshTrigger, setRefreshTrigger] = useState(false)

    useEffect(() => {
        setRefreshTrigger(!refreshTrigger)
    }, []);


    useEffect(() => {
        // Fetch data when dependencies change
        onSelectTab();
    }, [isUserLoggedOut, triggerRefresh, refreshTrigger]);


    const onSelectTab = () => {

        callClients();
        callTenants();

    }

    const callClients = () => {
        try {

            axios.get(`${urlToApiCall}api/clients/`).then((res) => {
                const apiRows = res.data.clients.map((row: any) => ({ ...row, id: generateId() }));
                const noEmptyRows = apiRows.filter((row: {}) => Object.keys(row).length > 1);
                const brokerUidApiNotEmptyRows = noEmptyRows.filter((row: any) => {
                    return row.brokerIdAssociated.includes(userLoggedGlobal.email) && noEmptyRows.findIndex((r: { brokerIdAssociated: any; }) => r.brokerIdAssociated === row.brokerIdAssociated);
                });

                const removeDuplicationFromBrokerUidApiNotEmptyRows = brokerUidApiNotEmptyRows.map((item: { brokerIdAssociated: Iterable<unknown> | null | undefined; }) => ({
                    ...item,
                    brokerIdAssociated: Array.from(new Set(item.brokerIdAssociated)).join(', ')
                })).map((item: { brokerIdAssociated: string; }) => ({
                    ...item,
                    brokerIdAssociated: item.brokerIdAssociated.replace(/^, /, '') // Remove coma at the beginning
                }));

                setClientRowsFromApi(removeDuplicationFromBrokerUidApiNotEmptyRows);
                setForceUpdate(prev => !prev); // Toggle forceUpdate to trigger re-render

            })
            clientRowsFromApi.map(item => {
                console.log(JSON.stringify(item) + " &&&&&")
            })

        } catch (error) {
            console.error('Error fetching tenant data:', error);
        }

    }

    const callTenants = () => {
        try {

            axios.get(`${urlToApiCall}api/tenants/`).then((res) => {
                const apiRows = res.data.tenant.map((row: any) => ({ ...row, id: generateId() }));
                const noEmptyRows = apiRows.filter((row: {}) => Object.keys(row).length > 1)
                const brokerUidApiNotEmptyRows = noEmptyRows.filter((row: any, index: number, self: any[]) => {
                    return row.brokerIdAssociated.includes(userLoggedGlobal.email)
                     && self.findIndex((r) => r.brokerIdAssociated === row.brokerIdAssociated) === index;
                });

                const removeDuplicationFromBrokerUidApiNotEmptyRows = brokerUidApiNotEmptyRows.map((item: { brokerIdAssociated: Iterable<unknown> | null | undefined; }) => ({
                    ...item,
                    brokerIdAssociated: Array.from(new Set(item.brokerIdAssociated)).join(', ')
                })).map((item: { brokerIdAssociated: string; }) => ({
                    ...item,
                    brokerIdAssociated: item.brokerIdAssociated.replace(/^, /, '') // Remove coma at the beginning
                }));

                setRowsFromApi(removeDuplicationFromBrokerUidApiNotEmptyRows);
                setForceUpdate(prev => !prev); // Toggle forceUpdate to trigger re-render
            });

        } catch (error) {
            console.error('Error fetching tenant data:', error);
        }
    }


    return (
        <Tabs onChange={onSelectTab}  >
            {/* <div style={{ marginTop: 80 }}> */}
            <Tile style={{ backgroundColor: 'white' }} >Home</Tile>
            <TabList aria-label="List of tabs">
                {/* <Tab style={{ backgroundColor: 'white' }}>Dashboard</Tab> */}
                {/* <Tab renderIcon={() => <InventoryManagement />} >Gestión de Arriendos</Tab> */}
                {/* <Tab>Gestión de Ventas</Tab> */}
                {/* <Tab>Gestión de Propiedades</Tab> */}
                <Tab>Gestión de Arrendatarios</Tab>
                {/* <Tab>Gestión de Propietarios</Tab> */}
                {/* <Tab disabled>Settings</Tab> */}
            </TabList>
            <TabPanels>
                {/* <TabPanel style={{ backgroundColor: 'whitesmoke' }}><ImmDashboard /></TabPanel> */}
                {/* <TabPanel>
                    <CarbonGrid name={'Gestión de Arriendos'} objectName={'Nuevo Arriendo'} rowData={rowsFromApi} headerData={rentHeaderData} />
                </TabPanel>
                <TabPanel><CarbonGrid name={'Gestión de Ventas'} objectName={'Nueva Venta'} rowData={rowsFromApi} headerData={rentHeaderData} /></TabPanel>
                <TabPanel><CarbonGridSimple /></TabPanel> */}
                <TabPanel><CarbonGrid
                    name={'Gestión de Arrendatarios'}
                    objectName={'Nuevo Arrendatario'}
                    rowData={rowsFromApi}
                    headerData={tenantHeader}
                /></TabPanel>
                {/* <TabPanel><CarbonGrid name={'Gestión de Propietarios'} objectName={'Nuevo Cliente'} rowData={clientRowsFromApi} headerData={tenantHeader} /></TabPanel> */}
                {/* <TabPanel>Tab Panel 4</TabPanel> */}
            </TabPanels>
            {/* </div> */}
        </Tabs>
    )
}
