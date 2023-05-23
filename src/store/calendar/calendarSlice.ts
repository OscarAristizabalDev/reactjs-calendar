import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

import { EventCalendar } from '../../calendar';

const tempEvent: EventCalendar = {
    _id: new Date().getTime(),
    title: 'Cumpleanios del Jefe',
    notas: 'prueba',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Oscar'
    }
}


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [tempEvent],
        activeEvent: {
            _id: 0,
            title: '',
            notas: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: "",
            user: {
                _id: "",
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
                if (event._id === action.payload._id) {
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
                state.events = state.events.filter(event => event._id !== state.activeEvent._id);
                state.activeEvent = {} as EventCalendar;
            }
        }
    }
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;