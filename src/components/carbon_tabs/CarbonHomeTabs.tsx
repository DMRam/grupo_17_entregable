import { InventoryManagement } from "@carbon/icons-react";
import { Button, Checkbox, Tab, TabList, TabPanel, TabPanels, Tabs, TextInput, Tile } from "@carbon/react";
import { TableHead } from "carbon-components-react";
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

                    <CarbonGrid name={'Gestión de Arriendos'} />
                </TabPanel>
                <TabPanel><CarbonGrid name={'Gestión de Ventas'} /></TabPanel>
                <TabPanel><CarbonGrid name={'Gestión de Propiedades'} /></TabPanel>
                <TabPanel><CarbonGrid name={'Gestión de Arrendatarios'} /></TabPanel>
                <TabPanel><CarbonGrid name={'Gestión de Propietarios'} /></TabPanel>
                {/* <TabPanel>Tab Panel 4</TabPanel> */}
            </TabPanels>
            {/* </div> */}
        </Tabs>
    )
}
