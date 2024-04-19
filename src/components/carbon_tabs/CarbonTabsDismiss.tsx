import React, { useState } from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';
import { useCreate } from '../../hooks/useCreate';

interface Props {
    contained?: any;
    tabs: {
        label: string;
        panel: any;
        icon: () => JSX.Element;
        disabled: boolean;
    }[];
}

export const CarbonTabsDismiss = ({ contained, tabs }: Props) => {



    const [renderedTabs, setRenderedTabs] = useState(Array.isArray(tabs) ? tabs : []);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const { addedTab } = useCreate();

    const handleTabChange = (selectedIndex: number) => {
        setSelectedIndex(selectedIndex);
    };

    const handleCloseTabRequest = (tabIndex: number) => {
        if (renderedTabs[tabIndex].disabled) {
            return;
        }

        // // Exclude the "Home" tab from being removed
        // if (tabIndex === 0) {
        //     return;
        // }

        const filteredTabs = renderedTabs.filter((_, index) => index !== tabIndex);
        const newSelectedIndex = selectedIndex === tabIndex ? 0 : selectedIndex;

        setSelectedIndex(newSelectedIndex);
        setRenderedTabs(filteredTabs);
    };

    return (
        <Tabs selectedIndex={selectedIndex} onChange={() => handleTabChange} dismissable onTabCloseRequest={handleCloseTabRequest}>
            <TabList aria-label="List of tabs" contained={contained}>
                {renderedTabs.map((tab, index) => (
                    <Tab key={index} renderIcon={tab.icon} disabled={index === 0}>
                        {tab.label}
                    </Tab>
                ))}
            </TabList>
            <TabPanels>
                {renderedTabs.map((tab, index) => (
                    <TabPanel key={index}>{tab.panel}</TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};
