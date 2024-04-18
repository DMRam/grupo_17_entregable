import React, { useState } from 'react';
import { Button, FileUploader, Form, FormGroup, NumberInput, RadioButton, RadioButtonGroup, Select, SelectItem, Stack, TextArea, TextInput } from '@carbon/react';
import axios from 'axios';
import { useUser } from '../../hooks/useUser';
import { CarbonDangerModal } from '../modal/CarbonDangerModal';
import { Loading } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import { useCreate } from '../../hooks/useCreate';
import axios_api from '../../api/axios/ImmAxios';
import { Client } from '../../interfaces/UserInterface';
import { urlToApiCall } from '../../data/UrlForAPICalls';

interface Props {
    indexRendered: number
    emailFromUpdateButton?: string
}


export const ClientCreateForm = ({ indexRendered, emailFromUpdateButton = '' }: Props) => {
    const { userLoggedGlobal } = useUser();
    const [client, setClient] = useState<Client>({
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
        property: {
            propertyRole: '',
            address: '',
            city: '',
            country: '',
            number: '',
            department_number: '',
            postalCode: ''
        }
    });

    const [displayModal, setDisplayModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fileUploading, setFileUploading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate()
    const { addedTab, onRemovingTabs, onSubmitFormTabIndexToRemove, onIsSubmission, onSubmissionDoRefresh } = useCreate();



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
        setClient((prevClient) => ({
            ...prevClient,
            [name]: value,
        }));
    };

    // Set up global axios interceptor for error handling
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error('HTTP request error:', error);
            return Promise.reject(error);
        }
    );

    const onSubmitCreateClient = async (event: any) => {
        event.preventDefault();
        setSubmitting(true);

        let emailToSubmitAPI = ''
        if (emailFromUpdateButton != '') {
            emailToSubmitAPI = emailFromUpdateButton
        } else {
            emailToSubmitAPI = client.email
        }

        try {
            const response = await axios.get(`${urlToApiCall}api/clients/email/${emailToSubmitAPI}`);
            const existingClient = response.data.client;

            if (existingClient && existingClient.email === emailToSubmitAPI) {
                const confirmMessage = `Este cliente ya existe. ¿Desea actualizarlo?`;
                if (window.confirm(confirmMessage)) {
                    await updateExistingClient(existingClient);
                    onSubmissionDoRefresh();
                }
            } else {
                const confirmMessageAccept = `¿Desea crear un nuevo cliente con estos detalles?`;
                if (window.confirm(confirmMessageAccept)) {
                    await createNewClient();
                    
                }
            }

            resetForm();
            onSubmitFormTabIndexToRemove(indexRendered);
            onIsSubmission();
            onSubmissionDoRefresh();
            console.log("New client created successfully:", response.data);
        } catch (error) {
            console.error('Error in onSubmitCreateClient:', error);
            // Handle error and set submitting state accordingly
        } finally {
            setSubmitting(false);
        }
    };


    const updateExistingClient = async (existingClient: any) => {
        try {
            await axios.put(`${urlToApiCall}api/clients/${existingClient.uid}`, {
                ...existingClient,
                brokerIdAssociated: [...existingClient.brokerIdAssociated, userLoggedGlobal.uid],
                name: client.name
            });
            onSubmitFormTabIndexToRemove(indexRendered);
            onIsSubmission()
            console.log("Client updated successfully.");
        } catch (error) {
            console.error("Error updating existing client:", error);
            // Handle error
        }
    };

    const createNewClient = async () => {
        try {
            const response = await axios.post(`${urlToApiCall}api/clients/`, {
                ...client,
                brokerIdAssociated: [userLoggedGlobal.uid],
            });
            onSubmitFormTabIndexToRemove(indexRendered);
            onIsSubmission()
            onSubmissionDoRefresh();
            console.log("New tenant created successfully:", response.data);
        } catch (error) {
            console.error("Error creating new tenant:", error);
            // Handle error
        }
    };

    const resetForm = () => {
        setClient({
            name: '',
            email: '',
            brokerIdAssociated: '',
            address: '',
            references: '',
            age: 18, // Default age
            gender: null,
            maritalStatus: '',
            details: '',
            uploadedFile: null,
            property: {
                propertyRole: '',
                address: '',
                city: '',
                country: '',
                number: '',
                department_number: '',
                postalCode: ''
            }
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
            <h3>Crear un Nuevo Cliente</h3>
            <hr />
            <Form onSubmit={onSubmitCreateClient} aria-label="Formulario de creación de nuevo cliente">
                <Stack gap={4}>
                    {/* Other form fields */}
                    <TextInput
                        id="nombre-cliente"
                        name="name"
                        labelText="Nombre"
                        placeholder="Ingrese el nombre"
                        value={client.name}
                        onChange={onChange}
                    />
                    <TextInput
                        id="correo-cliente"
                        name="email"
                        labelText="Correo"
                        placeholder="Ingrese el correo"
                        value={emailFromUpdateButton != '' ? emailFromUpdateButton : client.email}
                        onChange={onChange}
                        disabled={emailFromUpdateButton != '' ? true : false}
                    />
                    <TextInput
                        id="direccion-cliente"
                        name="address"
                        labelText="Dirección"
                        placeholder="Ingrese la dirección"
                        value={client.address}
                        onChange={onChange}
                    />
                    <NumberInput
                        id="edad-cliente"
                        label="Edad"
                        min={18}
                        max={120}
                        value={client.age}
                        step={1}
                        onChange={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, state: { value: string | number; direction: string; }) => {
                            // Handle age change
                        }}
                    />
                    <Select
                        id="estado-civil-cliente"
                        labelText="Estado Civil"
                        onChange={(event) => setClient({ ...client, maritalStatus: event.target.value })}
                    >
                        <SelectItem value="soltero" text="Soltero/a" />
                        <SelectItem value="casado" text="Casado/a" />
                        <SelectItem value="divorciado" text="Divorciado/a" />
                        <SelectItem value="viudo" text="Viudo/a" />
                    </Select>

                    <h3 style={{ marginTop: 30 }}>Sobre la Propiedad</h3>
                    <hr />

                    <TextInput
                        id="propertyRole"
                        name="property.propertyRole"
                        labelText="Rol de la propiedad"
                        placeholder="Ingrese el rol de la propiedad"
                        value={client.property.propertyRole}
                        onChange={(event) => {
                            const { name, value } = event.target;
                            setClient((prevClient) => ({
                                ...prevClient,
                                property: {
                                    ...prevClient.property,
                                    propertyRole: value, // Update the specific property within property object
                                },
                            }));
                        }}
                    />
                    <TextInput
                        id="propertyAddress"
                        name="property.address"
                        labelText="Dirección de la propiedad"
                        placeholder="Ingrese la dirección de la propiedad"
                        value={client.property.address}
                        onChange={(event) => {
                            const { name, value } = event.target;
                            setClient((prevClient) => ({
                                ...prevClient,
                                property: {
                                    ...prevClient.property,
                                    address: value, // Update the specific property within property object
                                },
                            }));
                        }}
                    />

                    <TextInput
                        id="propertyCity"
                        name="property.city"
                        labelText="Ciudad"
                        placeholder="Ingrese la ciudad conde se encuentra la propiedad"
                        value={client.property.city}
                        onChange={(event) => {
                            const { name, value } = event.target;
                            setClient((prevClient) => ({
                                ...prevClient,
                                property: {
                                    ...prevClient.property,
                                    city: value, // Update the specific property within property object
                                },
                            }));
                        }}
                    />
                    <TextInput
                        id="propertyCountry"
                        name="property.country"
                        labelText="País"
                        placeholder="Ingrese el país conde se encuentra la propiedad"
                        value={client.property.country}
                        onChange={(event) => {
                            const { name, value } = event.target;
                            setClient((prevClient) => ({
                                ...prevClient,
                                property: {
                                    ...prevClient.property,
                                    country: value, // Update the specific property within property object
                                },
                            }));
                        }}
                    />
                    <TextInput
                        id="propertyNumber"
                        name="property.number"
                        labelText="Número"
                        placeholder="Ingrese el numero cívico de la propiedad"
                        value={client.property.number}
                        onChange={(event) => {
                            const { name, value } = event.target;
                            setClient((prevClient) => ({
                                ...prevClient,
                                property: {
                                    ...prevClient.property,
                                    number: value, // Update the specific property within property object
                                },
                            }));
                        }}
                    />
                    <TextInput
                        id="propertyNumber"
                        name="property.number"
                        labelText="Número departamento"
                        placeholder="Ingrese el numero de departamento (si corresponde)"
                        value={client.property.department_number}
                        onChange={(event) => {
                            const { name, value } = event.target;
                            setClient((prevClient) => ({
                                ...prevClient,
                                property: {
                                    ...prevClient.property,
                                    department_number: value, // Update the specific property within property object
                                },
                            }));
                        }}
                    />
                    <TextInput
                        id="propertyPostalCode"
                        name="property.postalCode"
                        labelText="Código postal"
                        placeholder="Ingrese el código postal (opcional)"
                        value={client.property.postalCode}
                        onChange={(event) => {
                            const { name, value } = event.target;
                            setClient((prevClient) => ({
                                ...prevClient,
                                property: {
                                    ...prevClient.property,
                                    postalCode: value, // Update the specific property within property object
                                },
                            }));
                        }}
                    />
                    <TextArea
                        id="detalles-cliente"
                        labelText="Detalles"
                        placeholder="Detalles adicionales..."
                        value={client.details}
                        onChange={(event) => setClient({ ...client, details: event.target.value })}
                        rows={4}
                    />
                    <div>
                        <Button style={{ marginRight: 10 }} type="submit">
                            {emailFromUpdateButton !== '' ? "Actualizar Propietario" : "Crear Propietario"}
                        </Button>

                    </div>
                    {displayModal && <CarbonDangerModal open={displayModal} closeModal={onHandleModal} handleCancel={onCancelFormRemoveTab} />}

                </Stack>
                {submitting && <Loading description="Submitting..." />}
            </Form>
        </div>
    );
};