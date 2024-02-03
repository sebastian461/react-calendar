import { addHours, differenceInSeconds } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import Modal from "react-modal";
import es from "date-fns/locale/es";

import { useEffect, useMemo, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useCalendarStore, useUiStore } from "../../hooks";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

//const format = "dd/MM/yyyy h:mm aa";
const format = "Pp";

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const { closeDateModal } = useUiStore();
  const { isDateModalOpen } = useUiStore();

  const [formSubmited, setFormSubmited] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmited) return "";

    return formValues.title.length > 0 ? "is-valid" : "is-invalid";
  }, [formValues.title, formSubmited]);

  useEffect(() => {
    if (activeEvent !== null) setFormValues({ ...activeEvent });
  }, [activeEvent]);

  const onInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmited(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire(
        "Las fechas no son correctas",
        "Revisar las fechas ingresadas",
        "error"
      );
      throw new Error("Las fechas no son correctas");
    }

    if (formValues.title.length <= 0) {
      throw new Error("El título no es correcto");
    }

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmited(false);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={closeDateModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <div className="customDatePickerWidth">
            <DatePicker
              minDate={formValues.start}
              selected={formValues.start}
              onChange={(event) => onDateChange(event, "start")}
              dateFormat={format}
              className="form-control"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
            />
          </div>
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <div className="customDatePickerWidth">
            <DatePicker
              minDate={formValues.start}
              selected={formValues.end}
              onChange={(event) => onDateChange(event, "end")}
              dateFormat={format}
              className="form-control"
              showTimeSelect
              locale="es"
              timeCaption="Hora"
            />
          </div>
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            value={formValues.title}
            autoComplete="off"
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
