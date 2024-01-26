import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onSetActiveEvent,
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
    } else {
      //* Creando
      calendarEvent._id = new Date().getTime();
      disptach(onAddNewEvent({ ...calendarEvent }));
    }
  };

  return {
    //* Propiedades
    events,
    activeEvent,

    //* Métodos
    setActiveEvent,
    startSavingEvent,
  };
};
