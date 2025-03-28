import React from "react";
import styles from "./MyDetails.module.css";

export default function MyDetails() {
  return (
    <div className={styles.cont}>
      <div className={styles.container}>
        <div className={styles.post_id}>№34567</div>
        <div className={styles.header_post}>
          <div className={styles.zagolovok_header}>Заголовок</div>
          <div className={styles.count_res_cnt}>
            <div className={styles.count_res}>23</div>
            <img
              className={styles.count_img}
              src="/images/details/sort-vertical-02.svg"
            ></img>
          </div>
          <p className={styles.sum_header}>Сумма</p>
          <p className={styles.date_header}>Дата / Время</p>
          <p className={styles.res_header}>Ресурсы</p>
        </div>
        <div className={styles.card_res}>
          <div className={styles.card_res_first_line}>
            <div className={styles.card_res_name_cnt}>
              <p className={styles.card_res_name}>
                Семантический разбор внешних противодействий...
              </p>
            </div>
            <div className={styles.card_res_sum}>189.00$</div>
          </div>
        </div>
      </div>
    </div>
  );
}
