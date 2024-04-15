import React, { useState } from 'react';
import { Button, FileUploader, Form, FormGroup, NumberInput, RadioButton, RadioButtonGroup, Select, SelectItem, Stack, TextArea, TextInput } from '@carbon/react';
import axios from 'axios';
import { useUser } from '../../hooks/useUser';
import { CarbonDangerModal } from '../modal/CarbonDangerModal';
import { Loading } from '@carbon/react';

const TenantCreateForm = () => {
    const { userLoggedGlobal } = useUser();
    const [tenant, setTenant] = useState({
        name: '',
        email: '',
        brokerIdAssociated: userLoggedGlobal.uid,
        address: '',
        references: '',
        age: 18, // Default age
        gender: null,
        maritalStatus: '',
        details: '',
        uploadedFile: null,
    });

    const [displayModal, setDisplayModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fileUploading, setFileUploading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);


    const handleFileUpload = (files: any) => {
        if (files.length > 0) {
            setLoading(true);
            const uploaded = files[0];
            setUploadedFile(uploaded);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    const onChange = (event: any) => {
        const { name, value } = event.target;
        setTenant((prevTenant) => ({
            ...prevTenant,
            [name]: value,
        }));
    };

    const onSubmitCreateTenant = (event: any) => {
        event.preventDefault();
        setSubmitting(true);

        // Check if the email exists in the system
        axios.get(`http://localhost:8080/api/tenants/email/${tenant.email}`)
            .then((res) => {
                const existingTenant = res.data.tenant;
                if (existingTenant && existingTenant.email === tenant.email) {
                    // Show a confirmation message to the user
                    const confirmMessage = `Este arrendatario ya existe. ¿Desea actualizarlo?`;
                    if (window.confirm(confirmMessage)) {
                        // Update the existing tenant
                        axios.put(`http://localhost:8080/api/tenants/${existingTenant.uid}`, {
                            ...existingTenant,
                            brokerIdAssociated: [...existingTenant.brokerIdAssociated, userLoggedGlobal.uid],
                        }).then(() => {
                            console.log("Tenant updated successfully.");
                            resetForm();
                            setTimeout(() => {
                                window.location.reload();
                            }, 1500);
                        }).catch((updateErr) => {
                            console.error("Error updating tenant:", updateErr);
                            setSubmitting(false);
                        });
                    } else {
                        // User chose not to update, do nothing
                        setSubmitting(false);
                    }
                } else {
                    // If the email doesn't exist, create a new tenant
                    createNewTenant();
                }
            }).catch((err) => {
                console.error("Error checking if email exists:", err);
                // If the email is not found, create a new tenant
                createNewTenant();
                setSubmitting(false);
            });
    };

    const createNewTenant = () => {
        axios.post('http://localhost:8080/api/tenants/', {
            ...tenant,
            brokerIdAssociated: [userLoggedGlobal.uid],
        }).then(() => {
            console.log("Tenant created successfully.");
            resetForm();
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }).catch((createErr) => {
            console.error("Error creating tenant:", createErr);
            setSubmitting(false);
        });
    };



    const resetForm = () => {
        setTenant({
            name: '',
            email: '',
            brokerIdAssociated: '',
            address: '',
            references: '',
            age: 18,
            gender: null,
            maritalStatus: '',
            details: '',
            uploadedFile: null,
        });
    }



    const onHandleModal = () => {
        setDisplayModal(!displayModal);
    };

    const onCancelFormRemoveTab = () => {
        setDisplayModal(false);
    };

    return (
        <div style={{ backgroundColor: 'white', width: '60%', margin: 'auto', textAlign: 'center', padding: 20 }}>
            <h3>Crear un Nuevo Arrendatario</h3>
            <Form onSubmit={onSubmitCreateTenant} aria-label="Formulario de creación de nuevo arrendatario">
                <Stack gap={4}>
                    <FormGroup legendText="Subir Foto">
                        <div className="cds--file__container">
                            <FileUploader
                                labelTitle="Upload files"
                                labelDescription="Max file size is 500mb. Only .jpg files are supported."
                                buttonLabel="Add file"
                                buttonKind="primary"
                                size="md"
                                filenameStatus="edit"
                                accept={['.jpg', '.png']}
                                multiple={true}
                                disabled={false}
                                iconDescription="Delete file"
                                name=""
                                onChange={(event: any) => handleFileUpload(event.target.files)}
                                onClick={() => setFileUploading(true)}
                            />

                        </div>
                    </FormGroup>
                    {loading && <Loading small />}
                    <TextInput
                        id="nombre-arrendatario"
                        name="name"
                        labelText="Nombre"
                        placeholder="Ingrese el nombre"
                        value={tenant.name}
                        onChange={onChange}
                    />
                    <TextInput
                        id="correo-arrendatario"
                        name="email"
                        labelText="Correo"
                        placeholder="Ingrese el correo"
                        value={tenant.email}
                        onChange={onChange}
                    />
                    <TextInput
                        id="direccion-arrendatario"
                        name="address"
                        labelText="Dirección"
                        placeholder="Ingrese la dirección"
                        value={tenant.address}
                        onChange={onChange}
                    />
                    <TextInput
                        id="referencias-arrendatario"
                        name="references"
                        labelText="Contacto y/o referencias"
                        placeholder="Ingrese las referencias"
                        value={tenant.references}
                        onChange={onChange}
                    />
                    <NumberInput
                        className="some-class"
                        id="edad-arrendatario"
                        label="Edad"
                        min={18}
                        max={120}
                        value={tenant.age}
                        step={1}
                        iconDescription="Añadir/restar edad"
                        onChange={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, state: { value: string | number; direction: string; }) => {
                            // Handle the onChange event here
                            // You can access the value and direction from the state parameter
                            const { value, direction } = state;
                            // Update the tenant state accordingly
                            setTenant({ ...tenant, age: parseInt(value as string, 10) || 18 });
                        }}
                    />
                    {/* <RadioButtonGroup
                        name="grupo-botones-radio"
                        legendText="Género"
                        onChange={onChange}
                        valueSelected={selectedGender} // You may need to set the selected value if necessary
                    >
                        <RadioButton value="masculino" labelText="Masculino" id="masculino" />
                        <RadioButton value="femenino" labelText="Femenino" id="femenino" />
                    </RadioButtonGroup> */}

                    <Select
                        id="estado-civil"
                        labelText="Estado Civil"
                        onChange={(event) => setTenant({ ...tenant, maritalStatus: event.target.value })}
                    >
                        <SelectItem value="soltero" text="Soltero/a" />
                        <SelectItem value="casado" text="Casado/a" />
                        <SelectItem value="divorciado" text="Divorciado/a" />
                        <SelectItem value="viudo" text="Viudo/a" />
                    </Select>

                    <TextArea
                        id="descripcion-arrendatario"
                        labelText="Detalles"
                        placeholder="Detalles adicionales..."
                        value={tenant.details}
                        onChange={(event) => setTenant({ ...tenant, details: event.target.value })}
                        rows={4}
                    />
                    <div>
                        <Button style={{ marginRight: 10 }} type="submit">
                            Crear Arrendatario
                        </Button>
                    </div>
                    {displayModal && <CarbonDangerModal open={displayModal} closeModal={onHandleModal} handleCancel={onCancelFormRemoveTab} />}
                </Stack>
                {submitting && <Loading description="Submitting..." />}
            </Form>
        </div>
    );
};


export default TenantCreateForm;