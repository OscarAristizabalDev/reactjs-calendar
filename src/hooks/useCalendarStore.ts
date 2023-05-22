import { useSelector } from "react-redux";
import { RootState, onSetActiveEvent, useAppDispatch } from "../store"
import { EventCalendar } from "../calendar/interfaces/interfaces";

export const useCalendarStore = () => {

    // con useDispath puedo ejecutar cualquier acción, ya sea desde un thunks, o directamente desde el reducer del store
    const dispatch = useAppDispatch();

    // el hook useSelector de react-redux permite leer datos del store
    const { events, activeEvent } = useSelector((state: RootState) => state.calendar);

    const setActiveEvent = (calendarEvent: EventCalendar) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    return {
        // Properties
        activeEvent,
        events,
        // Methods
        setActiveEvent
    }

}
