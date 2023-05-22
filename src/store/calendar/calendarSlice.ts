import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

import { EventCalendar, Events } from '../../calendar';

const tempEvent: Events = {
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
        activeEvent: {} as EventCalendar
    },
    reducers: {
        onSetActiveEvent: (state, action: PayloadAction<EventCalendar>) => {
            state.activeEvent = action.payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent } = calendarSlice.actions;