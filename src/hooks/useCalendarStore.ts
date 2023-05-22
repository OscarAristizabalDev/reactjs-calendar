import { useSelector } from "react-redux";
import { RootState, onAddNewEvent, onSetActiveEvent, useAppDispatch } from "../store"
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
        } else {
            // Creando
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }
    }

    return {
        // Properties
        activeEvent,
        events,
        // Methods
        setActiveEvent,
        startSavingEvent
    }

}
