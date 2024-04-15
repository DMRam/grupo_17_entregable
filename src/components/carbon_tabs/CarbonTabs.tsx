import React, { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';
import { useCreate } from '../../hooks/useCreate';
import { useUser } from '../../hooks/useUser';
import { CarbonHeader } from '../carbon_header/CarbonHeader';
import { CarbonHomeTabs } from './CarbonHomeTabs';
import { Close, Home } from '@carbon/icons-react';
import { TabInfo } from '../../interfaces/UserInterface';
import TenantCreateForm from '../forms/TenantCreateForm';
import { ClientCreateForm } from '../forms/ClientCreateForm';
import { PropertyCreateForm } from '../forms/PropertyCreateForm';
import { RentalCreateForm } from '../forms/RentalCreateForm';

interface Props {
    contained?: any;
}

export const removeTab = (indexToRemove: number, tabList?: any, setTabList?: any, onRemovingTabs?: any) => {
    const updatedTabList = [...tabList];
    updatedTabList.splice(indexToRemove, 1);
    setTabList(updatedTabList);
    onRemovingTabs(indexToRemove);
};

export const CarbonTabs = ({ contained }: Props) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const { userLoggedGlobal, onAddUserLoggedToGlobalAppState } = useUser();
    const { addedTab, onRemovingTabs, getIndexToRemoveFromSubmitForm, isSubmission, indexToRemoveFormSubmission } = useCreate();

    useEffect(() => {
        const storedUserString = localStorage.getItem('user');
        if (storedUserString !== null) {
            const storedUser = JSON.parse(storedUserString);
            onAddUserLoggedToGlobalAppState(storedUser);
        }
    }, []);

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
            let filteredList = addedTab.filter(item => item.label != '');
            const newList = [...emptyTabList, ...filteredList];
            setTabList(newList);
            setSelectedIndex(newList.length - 1);
        }
    }, [addedTab.length]);

    const handleTabSelection = (index: number) => {
        setSelectedIndex(index);
    };

    const onTabPanel = (index: number, label: string) => {
        switch (label) {
            case 'Home':
                return <CarbonHomeTabs />;
            case 'Nuevo Arriendo':
                return <RentalCreateForm />;
            case 'Nuevo Cliente':
                return <ClientCreateForm />;
            case 'Nueva Propiedad':
                return <PropertyCreateForm />;
            case 'Nuevo Arrendatario':
                return <TenantCreateForm indexRendered={index} />;
            default:
                return null;
        }
    };

    // call this function with useEffect when the form is submitted true/false and global index 

    useEffect(() => {
        if (isSubmission) {
            onRemovingTabsFromTabs(indexToRemoveFormSubmission)
        }
    }, [isSubmission])

    const onRemovingTabsFromTabs = (index: number) => {
        removeTab(index, tabList, setTabList, onRemovingTabs)
    }

    tabList.map(item => {

        console.log(item.fromCreateGrid + " ########")
    })

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
                                    renderIcon={() => <Close onClick={() => onRemovingTabsFromTabs(index)} />}
                                    aria-current={index === selectedIndex ? "page" : undefined}
                                    onClick={() => handleTabSelection(index)}
                                >
                                    {tab.label}
                                </Tab>)
                        ))}
                    </TabList>
                    <TabPanels>
                        {tabList.map((tab, index) => (
                            <TabPanel style={{ backgroundColor: 'white' }} key={index}>
                                {onTabPanel(index, tab.label)}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </div>
        </>
    );
};
