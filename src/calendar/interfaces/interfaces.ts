export type EventCalendar = {
    id: number,
    bgColor: string,
    end: Date,
    notas: string,
    start: Date,
    title: string,
    user: UserEventCalendar
}

export type UserEventCalendar = {
    uid: string,
    name: string
}

