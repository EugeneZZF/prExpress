import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import styles from "./DataPicker.module.css";
import { ru } from "date-fns/locale";

const DateTimePicker = ({ selectedDate, onChange }) => {
  const getDayClassName = (date) => {
    const day = date.getDay();
    if (date.toDateString() === selectedDate.toDateString()) {
      return "selected-day"; // Зеленый цвет для выбранной даты
    }
    if (day === 0 || day === 6) {
      return "weekend-day"; // Красный цвет для выходных
    }
    return "";
  };

  return (
    <div className={styles.cont_date}>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="dd.MM.yyyy"
        inline
        dayClassName={getDayClassName}
        renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
          <div className="custom-header">
            <button onClick={decreaseMonth}>{"<"}</button>
            <span>{format(monthDate, "MMMM yyyy", { locale: ru })}</span>
            <button onClick={increaseMonth}>{">"}</button>
          </div>
        )}
        locale={ru}
      />
    </div>
  );
};

export default DateTimePicker;
