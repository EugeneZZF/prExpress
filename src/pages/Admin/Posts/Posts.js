import React, { useEffect, useState } from "react";
import styles from "./Posts.module.css";
import Checkbox from "../../Landing/comp_landing/Checkbox";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {}

  return (
    <div className={styles.cont}>
      <div className={styles.left_side}>
        <div className={styles.category_sort}>
          <div className={styles.category_sort_title}>
            <p>Получатели</p>
          </div>
          <div className={styles.category_sort_line}></div>
          <div className={styles.category_sort_checkbox}>
            <div className={styles.checkbox_cnt}>
              <Checkbox
                label="Все"
                // isChecked={checkboxes.all}
                // onChange={handleAllChange}
              />
              Все
            </div>
            <div className={styles.checkbox_cnt}>
              <Checkbox
                label="Все"
                // isChecked={checkboxes.all}
                // onChange={handleAllChange}
              />
              Премиум пользователи
            </div>
            <div className={styles.checkbox_cnt}>
              <Checkbox
                label="Все"
                // isChecked={checkboxes.all}
                // onChange={handleAllChange}
              />
              Владельцы ресурсов
            </div>
            <div className={styles.checkbox_cnt}>
              <Checkbox
                label="Все"
                // isChecked={checkboxes.all}
                // onChange={handleAllChange}
              />
              Стандартные пользователи
            </div>
            <div className={styles.checkbox_cnt}>
              <Checkbox
                label="Все"
                // isChecked={checkboxes.all}
                // onChange={handleAllChange}
              />
              Сейчас онлайн
            </div>
          </div>
          <button className={styles.sort_btn}>Применить</button>
        </div>
      </div>
      <div className={styles.right_side}>
        <div className={styles.right_side_cnt}>
          <div className={styles.title}>
            <p className={styles.card_id_title}>ID</p>
            <p className={styles.card_username_title}>Имя</p>
            <p className={styles.card_name_title}>Название статьи</p>
            <p className={styles.card_language_title}>Язык</p>
            <p className={styles.card_cost_title}>Сумма</p>
            <p className={styles.card_data_title}>Дата</p>
            <p className={styles.card_status_title}>Статус</p>
          </div>
        </div>
      </div>
    </div>
  );
}
