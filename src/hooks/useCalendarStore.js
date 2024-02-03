import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../calendar/helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const disptach = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    disptach(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        //* Actualizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        disptach(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }

      //* Creando
      const { data } = await calendarApi.post("/events", calendarEvent);
      console.log(data);
      disptach(onAddNewEvent({ id: data.evento.id, ...calendarEvent, user }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  const startDeletingEvent = async () => {
    //TODO: conectar con el backend
    disptach(onDeleteEvent());
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsToDateEvents(data.eventos);
      disptach(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //* Métodos
    setActiveEvent,
    startLoadingEvents,
    startDeletingEvent,
    startSavingEvent,
  };
};
