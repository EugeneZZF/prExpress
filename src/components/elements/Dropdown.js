import React, { useState, useEffect } from "react";
import Checkbox from "../../pages/Landing/comp_landing/Checkbox";
import { ChevronDown } from "lucide-react";
import styles from "./Dropdown.module.css";

const Dropdown = ({ categories, setSelectedCategories }) => {
  const [selected, setSelected] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Обновляем `selected` при изменении `categories`
  useEffect(() => {
    setSelected(categories.filter((cat) => cat.is_active).map((cat) => cat.id));
  }, [categories]);

  const toggleSelection = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

    setSelectedCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, is_active: !cat.is_active } : cat
      )
    );
  };

  const toggleAll = () => {
    const allActive = selected.length === categories.length;
    setSelected(allActive ? [] : categories.map((cat) => cat.id));

    setSelectedCategories((prev) =>
      prev.map((cat) => ({ ...cat, is_active: !allActive }))
    );
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
        <span>Выбор категории</span>
        <ChevronDown
          className={`${styles.chevron} ${isOpen ? styles.rotate : ""}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdownContent}>
          <div className={styles.list}>
            <div className={styles.item} onClick={toggleAll}>
              <div className={styles.check}>
                <Checkbox checked={selected.length === categories.length} />
              </div>
              <span>Выбрать все</span>
            </div>
            {categories.map((category) => (
              <div
                key={category.id}
                className={styles.item}
                onClick={() => toggleSelection(category.id)}
              >
                <div className={styles.check}>
                  <Checkbox checked={selected.includes(category.id)} />
                </div>
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
