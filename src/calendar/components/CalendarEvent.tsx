import { EventCalendar } from "../interfaces/interfaces"


export const CalendarEvent = ({ event }: CalendarEventProps) => {
    const { user, title } = event

    return (
        <>
            <strong>{title}</strong>
            <span>- {user.name}</span>
        </>
    )
}


type CalendarEventProps = {
    event: EventCalendar
}
