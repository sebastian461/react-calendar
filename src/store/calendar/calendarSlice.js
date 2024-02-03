import { createSlice } from "@reduxjs/toolkit";

/* const tempEvent = {
  _id: new Date().getTime(),
  title: "Cumpleaños",
  notes: "Hay que comprar el pastel",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _id: "123",
    name: "Sebastián",
  },
}; */

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, action) => {
      state.activeEvent = action.payload;
    },
    onAddNewEvent: (state, action) => {
      state.events.push(action.payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((e) => {
        if (e.id === payload.id) return payload;
        return e;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (e) => e.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      //state.events = payload;
      payload.forEach((e) => {
        const exist = state.events.some((dbEvent) => dbEvent.id === e.id);
        if (!exist) {
          state.events.push(e);
        }
      });
    },
  },
});

export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} = calendarSlice.actions;
