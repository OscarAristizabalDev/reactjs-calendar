import { useEffect, useState } from 'react';
import { Calendar, View } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, EventCalendar, FabAddNew, FabDelete, Navbar } from '../';
import { localizer, getMessagesES } from '../../helpers';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {

    // Se importa el custom hook para hacer uso de la función useUiStore
    const { openDateModal } = useUiStore();
    // mediante el hook useState puedo obtener y modificar en el localStorage el valor de lastView, en caso de no tener
    // valor, por defecto se deja en week
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
    const { user } = useAuthStore();

    const eventStyleGetter = (event: EventCalendar) => {

        const isMyEvent = (user.uid == event.user.uid) || (user.uid == event.user?._id);

        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    const onDoubleClick = (event: EventCalendar) => {
        openDateModal();
    }

    const onSelect = (event: EventCalendar) => {
        setActiveEvent(event);
    }

    const onViewChanged = (event: View) => {
        localStorage.setItem('lastView', event)
        setLastView(event)
    }

    useEffect(() => {
        startLoadingEvents();
    }, []) // apenas se cargue el componente se hace el llamado de startLoadingEvents


    return (
        <>
            <Navbar />

            <Calendar
                culture='es' // permite cambiar a espaniol
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100 vh - 80px)' }}
                messages={getMessagesES()} // permite cambiar a espaniol
                eventPropGetter={eventStyleGetter}
                // permite modificar un componente para su respectiva personalizacion
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick} // evento que sirve cuando se da doble click en el evento registrado en el calendario
                onSelectEvent={onSelect} // evento que sirve cuando solo se da un click en el evento registrado en el calendario
                onView={onViewChanged} // evento que sirve cuando cambia entre Mes, semana, día y agenda
                on
            />
            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>
    )
}
