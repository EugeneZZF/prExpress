import React, { useState } from "react";
import styles from "./DropDownButton.module.css";

const DropdownButton = ({ selectedOption, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className={styles.button}
      >
        {selectedOption || "Выберите опцию"}
        <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
          <img
            className={styles.arrow_img}
            src="\images\admin\arrow_user.svg"
          ></img>
        </span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <ul className={styles.list}>
            {options.map((option, index) => (
              <li
                key={index}
                className={styles.listItem}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
