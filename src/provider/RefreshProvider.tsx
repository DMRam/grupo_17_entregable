// RefreshContext.tsx

import React, { createContext, useContext, useState } from 'react';

interface RefreshContextType {
    refresh: boolean;
    triggerRefresh: () => void;
}

const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

export const RefreshProvider = ({ children }: any) => {
    const [refresh, setRefresh] = useState(false);

    const triggerRefresh = () => {
        setRefresh((prevRefresh) => !prevRefresh); // Toggle refresh state
    };

    const value: RefreshContextType = {
        refresh,
        triggerRefresh,
    };

    return (
        <RefreshContext.Provider value={value}>
            {children}
        </RefreshContext.Provider>
    );
};

export const useRefresh = (): RefreshContextType => {
    const context = useContext(RefreshContext);
    if (!context) {
        throw new Error('useRefresh must be used within a RefreshProvider');
    }
    return context;
};
