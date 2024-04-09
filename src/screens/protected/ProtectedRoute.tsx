import React from 'react'
import { Navigate } from 'react-router-dom';
import { CarbonTabs } from '../../components/carbon_tabs/CarbonTabs';
import { useAuthentication } from '../../hooks/useAuthentication';
import { ImmDashboard } from '../dashboard/ImmDashboard';

export const ProtectedRoute = () => {

    const { isUserLoggedOut } = useAuthentication()
    console.log(isUserLoggedOut + " isUserLoggedOut PROTECTED ROUTE")
    return isUserLoggedOut ? <Navigate to="/" /> : <CarbonTabs />;
}
