import React, { useState } from 'react';
import { Button, Checkbox, FileUploader, Form, FormGroup, Modal, NumberInput, RadioButton, RadioButtonGroup, Search, Select, SelectItem, Stack, TextArea, TextInput } from '@carbon/react';
import { CarbonDangerModal } from '../modal/CarbonDangerModal';
import { Loading } from '@carbon/react';

const TenantCreateForm = () => {

    const [displayModal, setDisplayModal] = useState<boolean>(false)
    const [loading, setLoading] = useState(false);



    const [uploadedFile, setUploadedFile] = useState(null);

    const [fileUploading, setFileUploading] = useState(false);

    const fileUploaderEvents = {
        buttonLabel: 'Subir Foto',
        className: 'some-class',
        onChange: (event: any) => handleFileUpload(event.target.files),
        onClick: () => setFileUploading(true), // Set fileUploading to true when file upload starts
        onComplete: () => setFileUploading(false), // Set fileUploading to false after upload completes
    };


    const handleFileUpload = (files: any) => {
        if (files.length > 0) {
            setLoading(true); // Set loading to true when file upload starts
            const uploaded = files[0];
            setUploadedFile(uploaded);
            // Simulate file upload completion after some time (you can replace this with actual file upload logic)
            setTimeout(() => {
                setLoading(false); // Set loading to false after upload completes
            }, 2000); // Simulating 2 seconds upload time
        }
    };

    // const checkboxEvents = {
    //     className: 'some-class',
    //     labelText: 'Aceptar términos y condiciones'
    // };

    const numberInputProps = {
        className: 'some-class',
        id: 'edad-arrendatario',
        label: 'Edad',
        min: 18,
        max: 120,
        value: 18,
        step: 1,
        iconDescription: 'Añadir/restar edad'
    };

    const radioProps = {
        className: 'some-class'
    };

    const selectProps = {
        className: 'some-class'
    };

    const TextInputNameProps = {
        className: 'some-class',
        id: 'nombre-arrendatario',
        labelText: 'Nombre',
        placeholder: 'Ingrese el nombre'
    };

    const TextInputLastNameProps = {
        className: 'some-class',
        id: 'nombre-arrendatario',
        labelText: 'Apellido',
        placeholder: 'Ingrese el apellido'
    };
    const TextInputPreviousAddressProps = {
        className: 'some-class',
        id: 'nombre-arrendatario',
        labelText: 'Dirección Anterior',
        placeholder: 'Ingrese el nombre completo'
    };
    const TextInputAddressToRentProps = {
        className: 'some-class',
        id: 'nombre-arrendatario',
        labelText: 'Dirección a arrendar',
        placeholder: 'Ingrese el nombre completo'
    };
    const TextInputReferencesProps = {
        className: 'some-class',
        id: 'nombre-arrendatario',
        labelText: 'Contacto y/o referencias',
        placeholder: 'Ingrese el nombre completo'
    };

    const textareaProps = {
        labelText: 'Detalles',
        className: 'some-class',
        placeholder: 'Detalles adicionales...',
        id: 'descripcion-arrendatario',
        rows: 4
    };

    const buttonEvents = {
        className: 'some-class'
    };
    const onHandleModal = () => {
        setDisplayModal(!displayModal)
    }

    const onCancelFormRemoveTab = () => {
        setDisplayModal(false);
    }

    return (
        <div style={{ backgroundColor: 'white', width: '60%', margin: 'auto', textAlign: 'center', padding: 20 }}>
            <h3>Crear un Nuevo Arrendatario</h3>
            <Form aria-label="Formulario de creación de nuevo arrendatario">
                <Stack gap={4}>
                    <FormGroup legendText="Subir Foto">
                        <div className="cds--file__container">
                            <FileUploader labelTitle="Upload files" labelDescription="Max file size is 500mb. Only .jpg files are supported." buttonLabel="Add file" buttonKind="primary" size="md" filenameStatus="edit" accept={['.jpg', '.png']} multiple={true} disabled={false} iconDescription="Delete file" name="" />
                        </div>
                    </FormGroup>
                    {loading && <Loading small />}

                    <TextInput {...TextInputNameProps} />
                    <TextInput {...TextInputLastNameProps} />
                    <TextInput {...TextInputAddressToRentProps} />
                    <TextInput {...TextInputPreviousAddressProps} />
                    <TextInput {...TextInputReferencesProps} />

                    <NumberInput {...numberInputProps} />

                    <RadioButtonGroup name="grupo-botones-radio" legendText="Género">
                        <RadioButton value="masculino" labelText="Masculino" {...radioProps} />
                        <RadioButton value="femenino" labelText="Femenino" {...radioProps} />
                    </RadioButtonGroup>

                    <Select {...selectProps} id="estado-civil">
                        <SelectItem disabled hidden value="placeholder-item" text="Estado Civil" />
                        <SelectItem value="soltero" text="Soltero/a" />
                        <SelectItem value="casado" text="Casado/a" />
                        <SelectItem value="divorciado" text="Divorciado/a" />
                        <SelectItem value="viudo" text="Viudo/a" />
                    </Select>

                    <TextArea {...textareaProps} />

                    {/* <FormGroup legendText="Subir Foto">
                        <Checkbox defaultChecked {...checkboxEvents} id="aceptar-terminos" />
                    </FormGroup> */}
                    <div>
                        <Button style={{ marginRight: 10 }} type="submit" {...buttonEvents}>
                            Crear Arrendatario
                        </Button>
                        {/* <Button onClick={onHandleModal} kind="danger--tertiary">
                            Cancelar
                        </Button> */}
                    </div>

                    {displayModal && <CarbonDangerModal open={displayModal} closeModal={onHandleModal} handleCancel={onCancelFormRemoveTab} />}
                </Stack>
            </Form>
        </div>
    );
};

export default TenantCreateForm;
