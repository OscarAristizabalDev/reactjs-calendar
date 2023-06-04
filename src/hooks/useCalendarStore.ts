import { useSelector } from "react-redux";
import { RootState, onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent, useAppDispatch } from "../store"
import { EventCalendar } from "../calendar/interfaces/interfaces";
import { calendarApi } from "../api";
import { convertDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

    // con useDispath puedo ejecutar cualquier acción, ya sea desde un thunks, o directamente desde el reducer del store
    const dispatch = useAppDispatch();

    // el hook useSelector de react-redux permite leer datos del store
    const { events, activeEvent, } = useSelector((state: RootState) => state.calendar);
    // el hook useSelector de react-redux permite leer datos del store
    const { user } = useSelector((state: RootState) => state.auth);

    const setActiveEvent = (calendarEvent: EventCalendar) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent: EventCalendar) => {
        // LLegar al backend

        try {
            if (calendarEvent.id) {
                // Actualizando
                let event = {
                    'title': calendarEvent.title,
                    'notas': calendarEvent.notas,
                    'start': calendarEvent.start,
                    'end': calendarEvent.end
                }

                await calendarApi.put('events/update/' + calendarEvent.id, event)
                // al utilizar los tres puntos (...) se garantiza que se envíe un nuevo objeto
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }
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
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.message, 'error');
        }



    }

    const startDeletingEvent = async () => {

        // Llegar al backend
        try {
            await calendarApi.delete('/events/delete/' + activeEvent.id);
            dispatch(onDeleteEvent());
        } catch (error) {
            console.log(error);
            Swal.fire('Error al elimnar', error.response.data.message, 'error');
        }

    }

    const startLoadingEvents = async () => {

        try {
            const { data } = await calendarApi.get('/events');
            const events = convertDateEvents(data.eventos);

            dispatch(onLoadEvents(events));

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
