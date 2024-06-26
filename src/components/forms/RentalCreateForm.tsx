import React, { useState, useEffect } from 'react';
import { Button, Checkbox, DatePicker, DatePickerInput, Dropdown, FileUploader, Form, FormGroup, Stack, TextInput } from '@carbon/react';
import { RentalForm } from '../../interfaces/RentalInterface';
import { CreateTenantForm } from '../../interfaces/UserInterface';
import { useUser } from '../../hooks/useUser';
import axios from 'axios';
import { urlToApiCall } from '../../data/UrlForAPICalls';

export const RentalCreateForm = () => {
    const { userLoggedGlobal } = useUser();
    const [formData, setFormData] = useState<RentalForm>({
        systemName: '',
        ownerId: userLoggedGlobal.uid, // Autogenerated from logged user ID
        address: '',
        propertyRole: '',
        dateFrom: '',
        dateTo: '',
        status: false,
        client_uid: '',
        tenant_uid: ''
    });
    const [clientData, setClientData] = useState<CreateTenantForm>({
        name: '',
        address: '',
        phone: ''
    });
    const [tenantData, setTenantData] = useState<CreateTenantForm>({
        name: '',
        address: '',
        phone: ''
    });
    const numberInputProps = {
        className: 'some-class',
        id: 'edad-arrendatario',
        label: 'Edad',
        min: 18,
        max: 120,
        value: 18,
        step: 1,
        iconDescription: 'Añadir/restar edad',
    };

    const fileUploaderEvents = {
        buttonLabel: 'Subir Foto',
        className: 'some-class',
    };

    const radioProps = {
        className: 'some-class',
    };

    const selectProps = {
        className: 'some-class',
    };

    const textInputProps = {
        className: 'some-class',
        id: '',
        labelText: '',
        placeholder: '',
    };

    const textareaProps = {
        labelText: 'Acerca de Mí',
        className: 'some-class',
        placeholder: 'Escribe algo sobre ti...',
        id: 'descripcion-arrendatario',
        rows: 4,
    };

    const buttonEvents = {
        className: 'some-class',
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        let newValue: string | boolean = value;

        // For checkboxes, use the checked property
        if (type === 'checkbox') {
            newValue = (e.target as HTMLInputElement).checked;
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: newValue,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData); // You can handle form submission logic here
        // https://grupo-17-418915.uc.r.appspot.com
        // http://localhost:8080
        axios.post(`${urlToApiCall}api/rentals/`, formData).then(resp => {
            console.log(resp + " RESPONSE")
        })
    };

    useEffect(() => {
        // Autogenerate systemName based on propertyRole + ownerId + date
        const currentDate = new Date().toISOString().slice(0, 10); // Get current date in yyyy-mm-dd format
        const systemName = `${formData.propertyRole}${userLoggedGlobal.uid}${currentDate}`;
        const ownerId = userLoggedGlobal.uid;
        setFormData((prevFormData) => ({
            ...prevFormData,
            systemName,
            ownerId // Autogenerated from logged user ID
        }));
    }, [formData.propertyRole, userLoggedGlobal.uid]); // Run this effect whenever propertyRole or userLoggedGlobal.uid changes
    const handleDateChange = (dates: any) => {
        const [dateFrom, dateTo] = dates;
        setFormData({ ...formData, dateFrom, dateTo });
    };

    const getClientByBrokerId = () => {

    }


    return (
        <div style={{ backgroundColor: 'white', width: '80%', margin: 'auto', textAlign: 'center', padding: 20 }}>
            <h3>Crear un nuevo registro de Arriendo</h3>
            <Form aria-label="Formulario de creación de nuevo arrendatario" onSubmit={handleSubmit}>
                <Stack style={{ alignContent: 'center' }} gap={7}>
                    {/* Autogenerated fields */}
                    <TextInput name="systemName" value={formData.systemName} onChange={handleInputChange} labelText="Identificador del Contrato" placeholder="Ingrese el nombre del sistema" disabled id={''} />
                    <TextInput name="ownerId" value={formData.ownerId} onChange={handleInputChange} labelText="ID del Corredor" placeholder="ID del Corredor" disabled id={''} />

                    {/* Other input fields */}
                    <TextInput name="address" value={formData.address} onChange={handleInputChange} labelText="Dirección" placeholder="Ingrese la dirección" id={''} />
                    <TextInput name="propertyRole" value={formData.propertyRole} onChange={handleInputChange} labelText="Rol" placeholder="Ingrese el rol de la propiedad" id={''} />
                    {/* <TextInput name="dateFrom" value={formData.dateFrom} onChange={handleInputChange} labelText="Fecha de Inicio" placeholder="Ingrese la fecha de inicio" id={''} />
                    <TextInput name="dateTo" value={formData.dateTo} onChange={handleInputChange} labelText="Fecha de Fin" placeholder="Ingrese la fecha de fin" id={''} /> */}

                    <DatePicker
                        onChange={handleDateChange}
                        datePickerType="range"
                    >
                        <DatePickerInput
                            id="date-picker-input-id-start"
                            placeholder="mm/dd/yyyy"
                            labelText="Fecha de Inicio"
                            size="md"
                        />
                        <DatePickerInput
                            id="date-picker-input-id-finish"
                            placeholder="mm/dd/yyyy"
                            labelText="Fecha de Término"
                            size="md"
                        />
                    </DatePicker>

                    <Checkbox defaultChecked id="aceptar-terminos" onChange={handleInputChange} name="status" labelText="Aceptar términos y condiciones" />
                    <hr />

                    <h3>Dueño de la propiedad</h3>

                    <TextInput
                        name="clientName"
                        value={clientData.name}
                        onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                        labelText="Nombre del Cliente"
                        placeholder="Ingrese el nombre del cliente"
                        id={''} // Add your ID if needed
                    />

                    {/* <Dropdown id="default" titleText="Dropdown label" helperText="This is some helper text" initialSelectedItem={items[1]} label="Option 1" items={items} itemToString={item => item ? item.text : ''} /> */}

                    <TextInput name="clientAddress" value={clientData.address} onChange={(e) => setClientData({ ...clientData, address: e.target.value })} labelText="Dirección del Cliente" placeholder="Ingrese la dirección del cliente" id={''} />
                    <TextInput name="clientPhone" value={clientData.phone} onChange={(e) => setClientData({ ...clientData, phone: e.target.value })} labelText="Teléfono del Cliente" placeholder="Ingrese el teléfono del cliente" id={''} />
                    <hr />
                    <h3>Datos de la Arrendatario</h3>

                    <TextInput name="tenantName" value={tenantData.name} onChange={(e) => setTenantData({ ...tenantData, name: e.target.value })} labelText="Nombre del Arrendatario" placeholder="Ingrese el nombre del arrendatario" id={''} />
                    <TextInput name="tenantAddress" value={tenantData.address} onChange={(e) => setTenantData({ ...tenantData, address: e.target.value })} labelText="Dirección del Arrendatario" placeholder="Ingrese la dirección del arrendatario" id={''} />
                    <TextInput name="tenantPhone" value={tenantData.phone} onChange={(e) => setTenantData({ ...tenantData, phone: e.target.value })} labelText="Teléfono del Arrendatario" placeholder="Ingrese el teléfono del arrendatario" id={''} />

                    <Button style={{ marginRight: 10 }} type="submit">
                        Crear Registro de arriendo
                    </Button>

                </Stack>
            </Form>
            {/* {displayModal && <CarbonDangerModal open={displayModal} closeModal={() => setDisplayModal(false)} handleCancel={() => { }} />} */}
        </div>
    );
};