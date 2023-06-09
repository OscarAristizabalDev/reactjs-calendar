import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

import { EventCalendar } from '../../calendar';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [] as EventCalendar[],
        activeEvent: {
            id: 0,
            title: '',
            notas: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: "",
            user: {
                uid: "",
                name: ""
            }
        } as EventCalendar
    },
    reducers: {
        onSetActiveEvent: (state, action: PayloadAction<EventCalendar>) => {
            state.activeEvent = action.payload;
        },
        onAddNewEvent: (state, action: PayloadAction<EventCalendar>) => {
            state.events.push(action.payload);
            state.activeEvent = {} as EventCalendar;
        },
        onUpdateEvent: (state, action: PayloadAction<EventCalendar>) => {
            // sobreescribimos los eventos mediante el map, el cual regresa un nuevo arreglo
            state.events = state.events.map(event => {
                if (event.id === action.payload.id) {
                    // Cuando sean igual retornamos el evento que recibimos en el payload
                    return action.payload;
                }
                return event
            });
        },
        onDeleteEvent: (state) => {
            // Si hay una nota activa
            if (state.activeEvent) {
                // Se retornan todos los eventos cuyo Id sean diferentes al de la nota activa
                state.events = state.events.filter(event => event.id !== state.activeEvent.id);
                state.activeEvent = {} as EventCalendar;
            }
        },
        onLoadEvents: (state, action: PayloadAction<EventCalendar[]>) => {
            state.isLoadingEvents = false;
            action.payload.forEach(event => {
                // Se valida que cada uno de los eventos que se van agregar al store no existan
                const exist = state.events.some(dbEvent => dbEvent.id === event.id)
                if (!exist) {
                    state.events.push(event);
                }
            })
        },
        onLogoutCalendar: (state) => {
            state.isLoadingEvents = true;
            state.events = [];
            state.activeEvent = {} as EventCalendar;
        }
    }
});

// Action creators are generated for each case reducer function
export const {
    onAddNewEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar,
    onSetActiveEvent,
    onUpdateEvent
} = calendarSlice.actions;
