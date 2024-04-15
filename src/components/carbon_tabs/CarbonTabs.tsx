import React, { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';
import { useCreate } from '../../hooks/useCreate';
import { useUser } from '../../hooks/useUser';
import { CarbonHeader } from '../carbon_header/CarbonHeader';
import { CarbonHomeTabs } from './CarbonHomeTabs';
import { Close, Home } from '@carbon/icons-react';
import { TabInfo } from '../../interfaces/UserInterface';

interface Props {
    contained?: any;
}

export const CarbonTabs = ({ contained }: Props) => {

    const [selectedIndex, setSelectedIndex] = useState<number>(0); // Track selected tab index
    const { userLoggedGlobal, onAddUserLoggedToGlobalAppState } = useUser();
    const { addedTab, onRemovingTabs } = useCreate();

    useEffect(() => {

        const storedUserString = localStorage.getItem('user');

        console.log(storedUserString + " *********")
        if (storedUserString !== null) {
            const storedUser = JSON.parse(storedUserString);
            // Update Redux state with the stored user data
            onAddUserLoggedToGlobalAppState(storedUser);
        }
    }, [])


    const emptyTabList: TabInfo[] = [
        {
            label: 'Home',
            panel: <CarbonHomeTabs />,
            icon: () => <Home size={17} />,
            disabled: false
        },
    ];
    const [tabList, setTabList] = useState<TabInfo[]>(emptyTabList);


    useEffect(() => {
        if (addedTab.length > 0) {
            let filteredList = addedTab.filter(item => item.label != '')
            const newList = [...emptyTabList, ...filteredList];
            setTabList(newList);
            setSelectedIndex(newList.length - 1);
        }

    }, [addedTab.length]);

    // Function to handle tab selection
    const handleTabSelection = (index: number) => {
        setSelectedIndex(index);
    };

    const removeTab = (indexToRemove: number) => {
        console.log(indexToRemove + " *******")
        // Get the TabInfo element at the specified index
        const tabToRemove = tabList[indexToRemove];
        // Create a copy of the tabList array
        const updatedTabList = [...tabList];
        // Remove the tab at the specified index
        updatedTabList.splice(indexToRemove, 1);
        // Update the state with the modified array
        setTabList(updatedTabList);
        // Call the onRemovingTabs function with the removed tabInfo
        onRemovingTabs(indexToRemove);
    };


    return (
        <>
            <div style={{ marginBottom: '45px' }}>
                <CarbonHeader name={userLoggedGlobal.name} />
            </div>
            <div style={{ backgroundColor: 'whitesmoke' }}>
                <Tabs selectedIndex={selectedIndex}>
                    <TabList contained={contained} aria-label="List of tabs" activation="manual">
                        {tabList.map((tab, index) => (
                            tab.label === 'Home' ? (
                                <Tab
                                    key={index}
                                    style={{ backgroundColor: 'white' }}
                                    renderIcon={tab.icon}
                                    aria-current={index === selectedIndex ? "page" : undefined} // Apply aria-current to the selected tab
                                    onClick={() => handleTabSelection(index)}
                                >
                                    {/* {tab.label} */}
                                </Tab>
                            ) : (
                                <Tab
                                    key={index}
                                    style={{ backgroundColor: 'white' }}
                                    renderIcon={() => <Close onClick={() => removeTab(index)} />}
                                    aria-current={index === selectedIndex ? "page" : undefined} // Apply aria-current to the selected tab
                                    onClick={() => handleTabSelection(index)}
                                >
                                    {tab.label}
                                </Tab>
                            )
                        ))}
                    </TabList>
                    <TabPanels>
                        {tabList.map((tab, index) => (
                            <TabPanel style={{ backgroundColor: 'white' }} key={index}>{tab.panel}</TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </div>
        </>
    );
};
