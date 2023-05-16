import { ChangeEvent, useState } from 'react';

import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';

import "react-datepicker/dist/react-datepicker.css";

registerLocale('es', es)


import { addHours } from 'date-fns';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true);

    const [formValues, setformValues] = useState({
        title: 'Oscar',
        notes: 'Aristizabal',
        start: new Date(),
        end: addHours(new Date(), 2)
    });

    const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = target;

        setformValues({
            ...formValues, //  se obtiene los valores actuales
            [name]: value // se sobreescribre valor que tenga el target.name por el valor del target.value
        })
    }

    const onTextAreaChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = target;

        setformValues({
            ...formValues, //  se obtiene los valores actuales
            [name]: value // se sobreescribre valor que tenga el target.name por el valor del target.value
        })
    }

    const onCloseModal = () => {
        setIsOpen(false);
    }

    /**
     * Permite ejecutar el evento onChange DatePicker
     * @param event el evento recibido es una fecha
     * @param changing 
     */
    const onDateChanged = (event: Date, changing: string) => {
        setformValues({
            ...formValues, //  se obtiene los valores actuales
            [changing]: event // se sobreescribre valor que tenga el target.name por el valor del target.value
        })
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container">

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                        selected={formValues.start}
                        onChange={(event: Date) => onDateChanged(event, 'start')}
                        className='form-control'
                        name="start"
                        dateFormat='Pp' // habilita la hora y minutos
                        showTimeSelect // habilita la barra para cambiar la hora
                        locale="es" // cambia a espanol
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker 
                        selected={formValues.end}
                        onChange={(event: Date) => onDateChanged(event, 'end')}
                        className='form-control'
                        name="end"
                        dateFormat='Pp' // habilita la hora y minutos
                        minDate={formValues.start} // no permite seleccionar una fecha menor a la inicial
                        showTimeSelect // habilita la barra para cambiar la hora
                        locale="es" // cambia a espanol
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        className="form-control"
                        placeholder="Notas"
                        rows={5}
                        name="notes"
                        value={formValues.notes}
                        onChange={onTextAreaChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
