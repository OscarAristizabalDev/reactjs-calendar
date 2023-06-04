import { parseISO } from "date-fns";
import { EventCalendar } from "../calendar";

export const convertDateEvents = (events: any = []) => {

    return events.map((event:EventCalendar) => {

        event.start = parseISO(event.start.toString());
        event.end = parseISO(event.end.toString());

        return event;
    });
}