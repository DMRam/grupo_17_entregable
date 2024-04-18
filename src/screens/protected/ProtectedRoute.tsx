import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { CarbonTabs } from '../../components/carbon_tabs/CarbonTabs';
import { useAuthentication } from '../../hooks/useAuthentication';

export const ProtectedRoute = () => {

    const { isUserLoggedOut } = useAuthentication()
    return isUserLoggedOut ? <Navigate to="/" /> : <CarbonTabs />;
}
