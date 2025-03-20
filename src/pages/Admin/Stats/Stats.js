import React, { useEffect } from "react";
import styles from "./Stats.module.css";
import DateTimePicker from "../../Post/DatePicker";
import { useState } from "react";
import { useRef } from "react";
import { statsUsers } from "../../../components/services";

export default function Stats() {
  const [statsUser, setStatsUser] = useState();
  async function fetchInfo() {
    const stat = await statsUsers();
    console.log(stat);
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className={styles.cont}>
      <div className={styles.user_stats}>
        <div className={styles.user_title_line}>
          <p>
            Антон Орлов <span>(в сети)</span>
          </p>
          <img src="/images/admin/user_ico.svg"></img>
        </div>
        {/* <div className={styles.user_line}></div> */}
        <div className={styles.user_fin}>
          <p>Финансы</p>
        </div>
        <div className={styles.user_line}></div>
        <div className={styles.user_info}>
          <div className={styles.user_global_info}>
            <p>
              <span>$ 36,789.00</span>
            </p>
            <p>Доход всех пользователей на сайте последний месяц</p>
          </div>
          <div className={styles.user_global_info}>
            <p>
              <span>$ 6,789.00</span>
            </p>
            <p>Мой доход за последний месяц</p>
          </div>
          <div className={styles.user_global_info}>
            <p>
              <span>$ 6,789.00</span>
            </p>
            <p>Доход с моих ресурсов</p>
          </div>
          <div className={styles.user_global_info}>
            <p>
              <span>$ 6,789.00</span>
            </p>
            <p>Мой доход с частных ресурсов</p>
          </div>
        </div>
      </div>
      {/* 2 */}
      <div className={styles.user_stats}>
        <div className={styles.user_fin}>
          <p>Публикации</p>
        </div>
        <div className={styles.user_line}></div>
        <div className={styles.user_info}>
          <div className={styles.user_global_info}>
            <p>
              <span>$ 36,789.00</span>
            </p>
            <p>Доход всех пользователей на сайте последний месяц</p>
          </div>
          <div className={styles.user_global_info}>
            <p>
              <span>$ 6,789.00</span>
            </p>
            <p>Мой доход за последний месяц</p>
          </div>
          <div className={styles.user_global_info}>
            <p>
              <span>$ 6,789.00</span>
            </p>
            <p>Доход с моих ресурсов</p>
          </div>
          <div className={styles.user_global_info}>
            <p>
              <span>$ 6,789.00</span>
            </p>
            <p>Мой доход с частных ресурсов</p>
          </div>
        </div>
      </div>
      {/* 3 */}
      <div className={styles.user_stats}>
        <div className={styles.user_fin}>
          <p>Ресурсы</p>
        </div>
        <div className={styles.user_line}></div>

        <div className={styles.user_info}>
          <div className={styles.user_global_info}>
            <p>
              <span>$ 36,789.00</span>
            </p>
            <p>Количество публикаций за период</p>
          </div>
          <div className={styles.user_global_info}>
            <p>
              <span>$ 6,789.00</span>
            </p>
            <p>Публикации на моих ресурсах</p>
          </div>
          <div className={styles.user_global_info}>
            <p>
              <span>$ 6,789.00</span>
            </p>
            <p>Частных ресурсов</p>
          </div>
          <div className={styles.user_global_info}>
            <p>
              <span>$ 6,789.00</span>
            </p>
            <p>Новых ресурсов за период</p>
          </div>
        </div>
      </div>
    </div>
  );
}
