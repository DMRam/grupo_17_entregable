import React from 'react';
import { CarbonGrid } from '../../components/carbon_grid/CarbonGrid';
import { CarbonHeader } from '../../components/carbon_header/CarbonHeader';
import { useUser } from '../../hooks/useUser';
import { CreateView } from './CreateView';

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        marginTop: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    gridContainer: {
        maxWidth: '90%', // Adjust the maximum width of the grid container as needed
        width: '100%',
        borderRadius: 10, // Add border-radius for smoother corners
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add box shadow for floating effect
    },
};

export const GridView = () => {
    const { userLoggedGlobal } = useUser();

    return (
        <div style={styles.container}>
            <CarbonHeader name={userLoggedGlobal.name} />
            <div style={styles.gridContainer}>
                <CarbonGrid />
            </div>
        </div>
    );
};