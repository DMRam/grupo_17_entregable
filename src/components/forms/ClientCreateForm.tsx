import React, { useState } from 'react';
import { Button, Checkbox, FileUploader, Form, FormGroup, Modal, NumberInput, RadioButton, RadioButtonGroup, Search, Select, SelectItem, Stack, TextArea, TextInput } from '@carbon/react';
import { CarbonDangerModal } from '../modal/CarbonDangerModal';

export const ClientCreateForm = () => {

    const [displayModal, setDisplayModal] = useState<boolean>(false)

    const checkboxEvents = {
        className: 'some-class',
        labelText: 'Aceptar términos y condiciones'
    };

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

    const fileUploaderEvents = {
        buttonLabel: 'Subir Foto',
        className: 'some-class'
    };

    const radioProps = {
        className: 'some-class'
    };

    const selectProps = {
        className: 'some-class'
    };

    const TextInputProps = {
        className: 'some-class',
        id: 'nombre-arrendatario',
        labelText: 'Nombre Completo',
        placeholder: 'Ingrese el nombre completo'
    };

    const textareaProps = {
        labelText: 'Acerca de Mí',
        className: 'some-class',
        placeholder: 'Escribe algo sobre ti...',
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

    }

    return (
        <div style={{ backgroundColor: 'white', width: '80%', margin: 'auto', textAlign: 'center', padding: 20 }}>
            <h3>Crear un Nuevo Arrendatario</h3>
            <Form aria-label="Formulario de creación de nuevo arrendatario">
                <Stack gap={7}>
                    <FormGroup legendText="Subir Foto">
                        <FileUploader filenameStatus='uploading' {...fileUploaderEvents} id="subir-foto" role="button" labelDescription="Tamaño máximo de archivo es 500mb. Solo se admiten archivos .jpg." accept={['.jpg', '.png']} />
                    </FormGroup>

                    <TextInput {...TextInputProps} />

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

                    <FormGroup legendText="Subir Foto">
                        <Checkbox defaultChecked {...checkboxEvents} id="aceptar-terminos" />
                    </FormGroup>
                    <div>
                        <Button style={{ marginRight: 10 }} type="submit" {...buttonEvents}>
                            Crear Arrendatario
                        </Button>
                        <Button onClick={onHandleModal} kind="danger--tertiary">
                            Cancelar
                        </Button>
                    </div>

                    {displayModal && <CarbonDangerModal open={displayModal} closeModal={onHandleModal} handleCancel={onCancelFormRemoveTab}/>}
                </Stack>
            </Form>
        </div>
    );
};