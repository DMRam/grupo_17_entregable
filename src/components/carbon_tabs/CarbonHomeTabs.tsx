import { InventoryManagement } from "@carbon/icons-react";
import { Button, Checkbox, Tab, TabList, TabPanel, TabPanels, Tabs, TextInput, Tile } from "@carbon/react";
import { TableHead } from "carbon-components-react";
import { rentHeaderData, rentRowData } from "../../data/DummyData";
import { ImmDashboard } from "../../screens/dashboard/ImmDashboard";
import { CarbonGrid } from "../carbon_grid/CarbonGrid";

export const CarbonHomeTabs = () => {

    return (
        <Tabs  >
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
            <TabPanels >
                <TabPanel style={{ backgroundColor: 'whitesmoke' }}><ImmDashboard /></TabPanel>
                <TabPanel>
                <CarbonGrid name={'Gestión de Arriendos'} objectName={'Nuevo Arriendo'} rowData={rentRowData} headerData={rentHeaderData} />
                </TabPanel>
                <TabPanel><CarbonGrid name={'Gestión de Ventas'} objectName={'Nueva Venta'} rowData={rentRowData} headerData={rentHeaderData} /></TabPanel>
                <TabPanel><CarbonGrid name={'Gestión de Propiedades'} objectName={'Nueva Propiedad'} rowData={rentRowData} headerData={rentHeaderData} /></TabPanel>
                <TabPanel><CarbonGrid name={'Gestión de Arrendatarios'} objectName={'Nuevo Arrendatario'} rowData={rentRowData} headerData={rentHeaderData} /></TabPanel>
                <TabPanel><CarbonGrid name={'Gestión de Propietarios'} objectName={'Nuevo Propietario'} rowData={rentRowData} headerData={rentHeaderData} /></TabPanel>
                {/* <TabPanel>Tab Panel 4</TabPanel> */}
            </TabPanels>
            {/* </div> */}
        </Tabs>
    )
}
