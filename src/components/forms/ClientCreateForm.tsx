import React, { useState } from 'react';
import { Button, FileUploader, Form, FormGroup, NumberInput, RadioButton, RadioButtonGroup, Select, SelectItem, Stack, TextArea, TextInput } from '@carbon/react';
import axios from 'axios';
import { useUser } from '../../hooks/useUser';
import { CarbonDangerModal } from '../modal/CarbonDangerModal';
import { Loading } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import { useCreate } from '../../hooks/useCreate';
import { removeTab } from '../carbon_tabs/CarbonTabs';
import axios_api from '../../api/axios/ImmAxios';

interface Props {
    indexRendered: number
}


export const ClientCreateForm = ({ indexRendered }: Props) => {
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
    const navigate = useNavigate()
    const { addedTab, onRemovingTabs, onSubmitFormTabIndexToRemove, onIsSubmission } = useCreate();



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

    console.log(indexRendered + " indexRendered")


    // Set up global axios interceptor for error handling
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error('HTTP request error:', error);
            return Promise.reject(error);
        }
    );

    const onSubmitCreateTenant = async (event: any) => {
        event.preventDefault();
        setSubmitting(true);

        try {
            const response = await axios.get(`https://grupo-17-418915.uc.r.appspot.com/api/tenants/email/${tenant.email}`);
            const existingTenant = response.data.tenant;

            if (existingTenant && existingTenant.email === tenant.email) {
                const confirmMessage = `Este arrendatario ya existe. ¿Desea actualizarlo?`;
                if (window.confirm(confirmMessage)) {
                    await updateExistingTenant(existingTenant);
                } else {
                    await createNewTenant();
                }
            } else {
                await createNewTenant();
            }

            resetForm();
            onSubmitFormTabIndexToRemove(indexRendered);
            onIsSubmission()
        } catch (error) {
            console.error('Error in onSubmitCreateTenant:', error);
            // Handle error and set submitting state accordingly
        } finally {
            setSubmitting(false);
        }
    };

    const updateExistingTenant = async (existingTenant: any) => {
        try {
            await axios_api.put(`tenants/${existingTenant.uid}`, {
                ...existingTenant,
                brokerIdAssociated: [...existingTenant.brokerIdAssociated, userLoggedGlobal.uid],
            });
            onSubmitFormTabIndexToRemove(indexRendered);
            onIsSubmission()
            console.log("Tenant updated successfully.");
        } catch (error) {
            console.error("Error updating existing tenant:", error);
            // Handle error
        }
    };

    const createNewTenant = async () => {
        try {
            const response = await axios_api.post('tenants/', {
                ...tenant,
                brokerIdAssociated: [userLoggedGlobal.uid],
            });
            onSubmitFormTabIndexToRemove(indexRendered);
            onIsSubmission()
            console.log("New tenant created successfully:", response.data);
        } catch (error) {
            console.error("Error creating new tenant:", error);
            // Handle error
        }
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
    };




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