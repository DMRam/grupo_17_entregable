import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './dashboard_styles.css';
import { Card } from 'react-bootstrap';
import { useUser } from '../../hooks/useUser';
import { ResponsiveCards } from '../../components/responsive_cards/ResponsiveCards';
import { CarbonHeader } from '../../components/carbon_header/CarbonHeader';

export const ImmDashboard: React.FC = () => {

    const { userLoggedGlobal } = useUser()

    return (
        <>
            <div style={{ marginBottom: 100 }}>
                <CarbonHeader name={userLoggedGlobal.name} />
            </div>
            <ResponsiveCards />
        </>
    );
};
