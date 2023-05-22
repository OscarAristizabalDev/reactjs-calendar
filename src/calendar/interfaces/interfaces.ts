export type EventCalendar = {
    bgColor: string,
    end: Date,
    notas: string,
    start: Date,
    title: string,
    user: UserEventCalendar
}

export type UserEventCalendar = {
    _id: string,
    name: string
}

export interface Events {
    _id: number,
    title: string,
    notas: string,
    start: Date,
    end: Date,
    bgColor: string,
    user: UserEvent
}

interface UserEvent {
    _id: string,
    name: string
}