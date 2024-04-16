import { InventoryManagement } from "@carbon/icons-react";
import { Tab, TabList, TabPanel, TabPanels, Tabs, Tile } from "@carbon/react";
import { useEffect, useState } from "react";
import axios_api from "../../api/axios/ImmAxios";
import { rentHeaderData, rentRowData } from "../../data/DummyData";
import { tenantHeader } from "../../data/TenantData";
import { useAPI } from "../../hooks/useAPI";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useUser } from "../../hooks/useUser";
import { ImmDashboard } from "../../screens/dashboard/ImmDashboard";
import { CarbonGrid } from "../carbon_grid/CarbonGrid";

export const CarbonHomeTabs = () => {

    const [rowsFromApi, setRowsFromApi] = useState([])
    const { isUserLoggedOut } = useAuthentication()
    const { userLoggedGlobal } = useUser()

    const generateId = (() => {
        let id = 0;
        return () => String.fromCharCode(97 + id++);
    })();

    const [forceUpdate, setForceUpdate] = useState(false);
    const { toggleNewDataComing } = useAPI()

    useEffect(() => {
        onSelectTab()
    }, [isUserLoggedOut])


    const onSelectTab = () => {
        try {
            // https://grupo-17-418915.uc.r.appspot.com
            // http://localhost:8080
            axios_api('api/tenants/').then((res) => {
                const apiRows = res.data.tenant.map((row: any) => ({ ...row, id: generateId() }));
                const noEmptyRows = apiRows.filter((row: {}) => Object.keys(row).length > 1)
                const brokerUidApiNotEmptyRows = noEmptyRows.filter((row: any, index: number, self: any[]) => {
                    return row.brokerIdAssociated.includes(userLoggedGlobal.uid) && self.findIndex((r) => r.brokerIdAssociated === row.brokerIdAssociated) === index;
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

    console.log(JSON.stringify(rowsFromApi) + " <-")
    console.log(rowsFromApi.length + " <-")
    rowsFromApi.map(item => {
        console.log(item)
    })

    return (
        <Tabs onChange={onSelectTab}  >
            {/* <div style={{ marginTop: 80 }}> */}
            <Tile style={{ backgroundColor: 'white' }} >Home</Tile>
            <TabList aria-label="List of tabs">
                <Tab style={{ backgroundColor: 'white' }}>Dashboard</Tab>
                <Tab renderIcon={() => <InventoryManagement />} >Gestión de Arriendos</Tab>
                <Tab>Gestión de Ventas</Tab>
                <Tab>Gestión de Propiedades</Tab>
                <Tab>Gestión de Arrendatarios</Tab>
                <Tab>Gestión de Propietarios</Tab>
                {/* <Tab disabled>Settings</Tab> */}
            </TabList>
            <TabPanels>
                <TabPanel style={{ backgroundColor: 'whitesmoke' }}><ImmDashboard /></TabPanel>
                <TabPanel>
                    <CarbonGrid name={'Gestión de Arriendos'} objectName={'Nuevo Arriendo'} rowData={rowsFromApi} headerData={rentHeaderData} />
                </TabPanel>
                <TabPanel><CarbonGrid name={'Gestión de Ventas'} objectName={'Nueva Venta'} rowData={rowsFromApi} headerData={rentHeaderData} /></TabPanel>
                <TabPanel><CarbonGrid name={'Gestión de Propiedades'} objectName={'Nueva Propiedad'} rowData={rentRowData} headerData={rentHeaderData} /></TabPanel>
                <TabPanel><CarbonGrid
                    name={'Gestión de Arrendatarios'}
                    objectName={'Nuevo Arrendatario'}
                    rowData={rowsFromApi}
                    headerData={tenantHeader}
                /></TabPanel>
                <TabPanel><CarbonGrid name={'Gestión de Propietarios'} objectName={'Nuevo Propietario'} rowData={rentRowData} headerData={rentHeaderData} /></TabPanel>
                {/* <TabPanel>Tab Panel 4</TabPanel> */}
            </TabPanels>
            {/* </div> */}
        </Tabs>
    )
}
