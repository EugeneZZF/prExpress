import React from "react";
import styles from "./AdminPanel.module.css";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();

  return (
    <div className={styles.cont}>
      <div className={styles.first_line}>
        <div
          className={styles.res_btn}
          onClick={() => {
            navigate("./resource");
          }}
        >
          Ресурсы
        </div>
        <div
          className={styles.res_btn}
          onClick={() => {
            navigate("./users");
          }}
        >
          Пользователи
        </div>
        <div
          className={styles.res_btn}
          onClick={() => {
            navigate("./dispatch");
          }}
        >
          Уведомления
        </div>
      </div>
      <div className={styles.first_line}>
        <div
          className={styles.res_btn}
          onClick={() => {
            navigate("./posts");
          }}
        >
          Посты
        </div>
      </div>
    </div>
  );
}
