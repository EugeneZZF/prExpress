import { useState } from "react";
import styles from "./SliderInput.module.css";

export default function SliderInput({ value, onChange, max = 100 }) {
  const percentage = (value / max) * 100; // Нормализация значения

  return (
    <div className={styles.sliderContainer}>
      <input
        type="range"
        min="0"
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.slider}
        style={{
          background: `linear-gradient(to right, #49D46F ${percentage}%, #e5e7eb ${percentage}%)`,
        }}
      />
    </div>
  );
}
