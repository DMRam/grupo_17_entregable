import { Dashboard, CloudMonitoring, Activity, Settings, Home, Analytics } from "@carbon/icons-react";
import { Button, Checkbox, Search, Tab, TabList, TabPanel, TabPanels, Tabs, TextInput } from "@carbon/react";
import { useUser } from "../../hooks/useUser";
import { ImmDashboard } from "../../screens/dashboard/ImmDashboard";
import { CarbonHeader } from "../carbon_header/CarbonHeader";


export const CarbonTabs = () => {
    const { userLoggedGlobal } = useUser();

    return (
        <>
            <div style={{ marginBottom: '45px' }}>
                <CarbonHeader name={userLoggedGlobal.name} /></div>
            <div style={{ backgroundColor: 'whitesmoke' }}>
                <Tabs >
                    <TabList aria-label="List of tabs" activation="manual">
                        <Tab renderIcon={() => <Home size={15} />}/>
                        <Tab renderIcon={() => <Dashboard size={15} />}>Dashboard</Tab>
                        <Tab renderIcon={() => <CloudMonitoring size={15} />}>Monitoring</Tab>
                        <Tab renderIcon={() => <Activity size={15} />}>Activity</Tab>
                        <Tab renderIcon={() => <Analytics size={15} />}>Analyze</Tab>
                        <Tab renderIcon={() => <Settings size={15} />} >Settings</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel><ImmDashboard /></TabPanel>
                        <TabPanel>
                            <form style={{ margin: '2em' }}>
                                <legend className={`cds--label`}>Validation example</legend>
                                <Checkbox id="cb" labelText="Accept privacy policy" />
                                <Button style={{ marginTop: '1rem', marginBottom: '1rem' }} type="submit">
                                    Submit
                                </Button>
                                <TextInput type="text" labelText="Text input label" helperText="Optional help text" id="text-input-1" />
                            </form>
                        </TabPanel>
                        <TabPanel>Tab Panel 3</TabPanel>
                        <TabPanel>Tab Panel 4</TabPanel>
                        <TabPanel>Tab Panel 5</TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </>
    )
}
