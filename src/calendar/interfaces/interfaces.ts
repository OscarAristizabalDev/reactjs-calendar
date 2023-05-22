export type EventCalendar = {
    _id: number,
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

