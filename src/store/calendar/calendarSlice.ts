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
        }
    }
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent } = calendarSlice.actions;