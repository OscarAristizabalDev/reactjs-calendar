import { useSelector } from "react-redux";
import { RootState, onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, useAppDispatch } from "../store"
import { EventCalendar } from "../calendar/interfaces/interfaces";

export const useCalendarStore = () => {

    // con useDispath puedo ejecutar cualquier acción, ya sea desde un thunks, o directamente desde el reducer del store
    const dispatch = useAppDispatch();

    // el hook useSelector de react-redux permite leer datos del store
    const { events, activeEvent } = useSelector((state: RootState) => state.calendar);

    const setActiveEvent = (calendarEvent: EventCalendar) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent: EventCalendar) => {
        // LLegar al backend

        if (calendarEvent._id) {
            // Actualizando
            // al utilizar los tres puntos (...) se garantiza que se envíe un nuevo objeto
            dispatch(onUpdateEvent({ ...calendarEvent }));
        } else {
            // Creando
            /// al utilizar los tres puntos (...) se garantiza que se envíe un nuevo objeto
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }
    }

    const startDeletingEvent = () => {

        // Llegar al backend
        dispatch(onDeleteEvent());
    }

    return {
        // Properties
        activeEvent,
        events,
        hasEventSelected: !!activeEvent._id , // si activeEvent es null entonces regresa falso, de lo contrario true
        // Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }

}
