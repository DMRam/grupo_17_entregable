import React, { useState } from 'react';
import { Button, FileUploader, Form, FormGroup, NumberInput, RadioButton, RadioButtonGroup, Select, SelectItem, Stack, TextArea, TextInput } from '@carbon/react';
import axios from 'axios';
import { useUser } from '../../hooks/useUser';
import { CarbonDangerModal } from '../modal/CarbonDangerModal';
import { Loading } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import { useCreate } from '../../hooks/useCreate';
import { removeTab } from '../carbon_tabs/CarbonTabs';
import { urlToApiCall } from '../../data/UrlForAPICalls';

interface Props {
    indexRendered: number
    emailFromUpdateButton?: string | undefined
}


const TenantCreateForm = ({ indexRendered, emailFromUpdateButton = '' }: Props) => {
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
    const { addedTab, onRemovingTabs, onSubmitFormTabIndexToRemove, onIsSubmission, onSubmissionDoRefresh } = useCreate();
    const [showAlert, setShowAlert] = useState(false); // State to control alert display


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

    // Set up global axios interceptor for error handling
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 403) {
                setShowAlert(true);
                const confirmMessage = "Este usuario se encuentra bloqueado, por favor contacte al equipo de administración";
                if (window.confirm(confirmMessage)) {
                    // setShowAlert(false); 
                    return Promise.resolve();
                }
                return Promise.reject(error);
            } else {
                console.error('HTTP request error:', error);
                // Handle other errors if needed
            }
            return Promise.reject(error);
        }
    );



    const onSubmitCreateTenant = async (event: any) => {
        event.preventDefault();
        setSubmitting(true);

        let emailToSubmitAPI = ''
        if (emailFromUpdateButton != '') {
            emailToSubmitAPI = emailFromUpdateButton
        } else {
            emailToSubmitAPI = tenant.email
        }

        try {
            const response = await axios.get(`${urlToApiCall}api/tenants/email/${emailToSubmitAPI}`);
            const existingTenant = response.data.tenant;

            if (existingTenant && existingTenant.email === emailToSubmitAPI) {
                const confirmMessage = `Este arrendatario ya existe. ¿Desea actualizarlo?`;
                if (window.confirm(confirmMessage)) {
                    await updateExistingTenant(event, existingTenant);
                    onSubmissionDoRefresh();
                }
            } else {
                const confirmMessageAccept = `¿Desea crear un nuevo Arrendatario con estos detalles?`;
                if (window.confirm(confirmMessageAccept)) {
                    await createNewTenant(event)

                }
            }

            resetForm();
            onSubmitFormTabIndexToRemove(indexRendered);
            onIsSubmission();
        } catch (error: any) {
            console.error('Error in onSubmitCreateTenant:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            }
            // Handle error and set submitting state accordingly
        } finally {
            setSubmitting(false);
        }
    };



    const updateExistingTenant = async (event: any, existingTenant: any) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await axios.put(`${urlToApiCall}api/tenants/${existingTenant.uid}`, {
                ...existingTenant,
                brokerIdAssociated: [...existingTenant.brokerIdAssociated, userLoggedGlobal.email],
                name: tenant.name
            });

            console.log(response + " !!!!!!!!!!!!")
            if (response.status === 200) {
                console.log("Tenant updated successfully.");
                onSubmitFormTabIndexToRemove(indexRendered);
                onIsSubmission();
            } else if (response.status === 403) {
                console.log("User is blocked. Please contact the admin team.");
                setShowAlert(true); // Set state to display alert
            } else {
                console.log("Unexpected response status:", response.status);
                setShowAlert(true); // Set state to display alert for unexpected response status
            }
            onSubmitFormTabIndexToRemove(indexRendered);
            onIsSubmission()
            console.log("WAS SUBMISSION")
        } catch (error) {
            console.error("Error updating existing tenant:", error);
            setShowAlert(true); // Set state to display alert for error
            onIsSubmission()
        }
    };




    const createNewTenant = async (event: any) => {
        event.preventDefault(); // Prevent default form submission behavior
        try {
            const response = await axios.post(`${urlToApiCall}api/tenants/`, {
                ...tenant,
                brokerIdAssociated: [userLoggedGlobal.email],
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
                        value={emailFromUpdateButton != '' ? emailFromUpdateButton : tenant.email}
                        onChange={onChange}
                        disabled={emailFromUpdateButton != '' ? true : false}
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
                            {emailFromUpdateButton !== '' ? "Actualizar Arrendatario" : "Crear Arrendatario"}
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