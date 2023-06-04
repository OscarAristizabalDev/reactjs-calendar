import { useSelector } from "react-redux";
import { RootState, onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, useAppDispatch } from "../store"
import { EventCalendar } from "../calendar/interfaces/interfaces";
import { calendarApi } from "../api";
import { convertDateEvents } from "../helpers";

export const useCalendarStore = () => {

    // con useDispath puedo ejecutar cualquier acción, ya sea desde un thunks, o directamente desde el reducer del store
    const dispatch = useAppDispatch();

    // el hook useSelector de react-redux permite leer datos del store
    const { events, activeEvent } = useSelector((state: RootState) => state.calendar);
    // el hook useSelector de react-redux permite leer datos del store
    const { user } = useSelector((state: RootState) => state.auth);

    const setActiveEvent = (calendarEvent: EventCalendar) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent: EventCalendar) => {
        // LLegar al backend

        if (calendarEvent.id) {
            // Actualizando
            // al utilizar los tres puntos (...) se garantiza que se envíe un nuevo objeto
            dispatch(onUpdateEvent({ ...calendarEvent }));
        } else {
            // Creando

            let event = {
                'title': calendarEvent.title,
                'notas': calendarEvent.notas,
                'start': calendarEvent.start,
                'end': calendarEvent.end
            }

            const { data } = await calendarApi.post('/events/create', event)

            /// al utilizar los tres puntos (...) se garantiza que se envíe un nuevo objeto
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
        }
    }

    const startDeletingEvent = () => {

        // Llegar al backend
        dispatch(onDeleteEvent());
    }

    const startLoadingEvents = async () => {

        try {
            const { data } = await calendarApi.get('/events');
            const events = convertDateEvents(data.eventos);

        } catch (error) {
            console.log('Error cargando eventos.');
            console.log(error);
        }
    }

    return {
        // Properties
        activeEvent,
        events,
        hasEventSelected: !!activeEvent.id, // si activeEvent es null entonces regresa falso, de lo contrario true
        // Methods
        setActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent
    }

}
