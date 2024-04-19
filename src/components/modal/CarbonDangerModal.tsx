import React from 'react';
import { Button, Modal } from '@carbon/react';

interface Props {
    open: boolean;
    closeModal: () => void;
    handleCancel: () => void; // Function to handle cancel action
}

export const CarbonDangerModal = ({ closeModal, open, handleCancel }: Props) => {
    return (
        <>
            <Modal
                open={open}
                onRequestClose={closeModal}
                danger
                modalHeading="Cancelar creación de Arrendatario?"
                modalLabel="Crear Nuevo Arrendatario"
                primaryButtonText="Si, cancelar"
                secondaryButtonText="Cancel"
                onRequestSubmit={handleCancel} // Call handleCancel function on primary button click
            />
        </>
    );
};
