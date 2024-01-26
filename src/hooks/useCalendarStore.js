import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const disptach = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

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
      disptach(onAddNewEvent({ _id: new Date().getTime(), ...calendarEvent }));
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
