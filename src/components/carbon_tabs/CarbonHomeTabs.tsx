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
                {/* <Tab disabled>Settings</Tab> */}
            </TabList>
            <TabPanels >
                <TabPanel style={{ backgroundColor: 'whitesmoke' }}><ImmDashboard /></TabPanel>
                <TabPanel>
                    {/* <form style={{
                        margin: '2em'
                    }}>
                        <legend className={`cds--label`}>Validation example</legend>
                        <Checkbox id="cb" labelText="Accept privacy policy" />
                        <Button style={{
                            marginTop: '1rem',
                            marginBottom: '1rem'
                        }} type="submit">
                            Submit
                        </Button>
                        <TextInput type="text" labelText="Text input label" helperText="Optional help text" id="text-input-1" />
                    </form> */}
                    <CarbonGrid />
                </TabPanel>
                <TabPanel><CarbonGrid /></TabPanel>
                <TabPanel><CarbonGrid /></TabPanel>
                {/* <TabPanel>Tab Panel 4</TabPanel> */}
            </TabPanels>
            {/* </div> */}
        </Tabs>
    )
}
