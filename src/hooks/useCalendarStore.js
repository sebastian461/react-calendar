import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";
import { calendarApi } from "../api";

export const useCalendarStore = () => {
  const disptach = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    disptach(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    //TODO: conectar con el backend

    if (calendarEvent._id) {
      //* Actualizando
      disptach(onUpdateEvent({ ...calendarEvent }));
    } else {
      //* Creando
      const { data } = await calendarApi.post("/events", calendarEvent);
      console.log(data);
      disptach(onAddNewEvent({ id: data.evento.id, ...calendarEvent, user }));
    }
  };

  const startDeletingEvent = async () => {
    //TODO: conectar con el backend
    disptach(onDeleteEvent());
  };

  return {
    //* Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //* Métodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
