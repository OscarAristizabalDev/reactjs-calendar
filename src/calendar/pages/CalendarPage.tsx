import { Calendar, EventPropGetter } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { CalendarEvent, Navbar } from '../';
import { localizer, getMessagesES } from '../../helpers';


const eventos = [{
    title: 'Cumpleanios del Jefe',
    notas: 'prueba',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Oscar'
    }
}]

const eventStyleGetter = () => {

    const style = {
        backgroundColor: '#347CF7',
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white'
    }

    return {
        style
    }
}

export const CalendarPage = () => {
    return (
        <>
            <Navbar />

            <Calendar
                culture='es' // permite cambiar a espaniol
                localizer={localizer}
                events={eventos}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100 vh - 80px)' }}
                messages={getMessagesES()} // permite cambiar a espaniol
                eventPropGetter={eventStyleGetter}
                // permite modificar un componente para su respectiva personalizacion
                components={{
                    event: CalendarEvent
                }}
            />
        </>
    )
}
