export type EventCalendar = {
    bgColor: string,
    end: Date,
    notas: string,
    title: string,
    user: UserEventCalendar
}

export type UserEventCalendar = {
    _id: string,
    name: string
}