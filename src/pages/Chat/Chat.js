import React, { useEffect, useState } from "react";
import styles from "./Chat.module.css";
import { useParams, useLocation } from "react-router-dom";
import { getUser } from "../../components/services";

export default function Chat() {
  const { user_id } = useParams();
  const location = useLocation();
  const userData = location.state?.user;

  const [user, setUser] = useState({});
  async function fetchUser() {
    try {
      const user_f = await getUser(user_id); // Ждем завершения промиса
      setUser(user_f); // Передаем уже загруженные данные
      console.log("user", user_f); // Выводим полученного пользователя
    } catch (error) {
      console.error("Ошибка при загрузке пользователя:", error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={styles.cont}>
      <div className={styles.user_info}>
        <div className={styles.user_info_first_line}>
          <p className={styles.user_id}>User №{user_id}</p>
          <img
            className={styles.user_img}
            src="\images\Chat\user_img.svg"
            onClick={() => {
              console.log(user);
            }}
          ></img>
        </div>
        <div className={styles.user_line}></div>
        <div className={styles.user_full}>
          <div className={styles.full_left_side}>
            <div className={styles.full_cont}>
              <p className={styles.full_title}>Имя Фамилия</p>
              <p className={styles.user_name}>{user.name}</p>
            </div>
            <div className={styles.full_cont}>
              <p className={styles.full_title}>Почта</p>
              <p className={styles.user_name}>alias@mail.ru</p>
            </div>
          </div>
          <div className={styles.full_right_side}>
            <div className={styles.full_cont}>
              <p className={styles.full_title}>Номер телефона</p>
              <p className={styles.user_name}>{}</p>
            </div>
          </div>
        </div>
        <div className={styles.user_line}></div>
        <div className={styles.statistic}>
          <div className={styles.statistic_left}>
            <div className={styles.statistic_info}>
              <p className={styles.full_title}>Мой доход за все время</p>
              <p className={styles.user_name}>189.00 $</p>
            </div>
            <div className={styles.statistic_info}>
              <p className={styles.full_title}>Количество ресурсов</p>
              <p className={styles.user_name}>123</p>
            </div>
            <div className={styles.statistic_info}>
              <p className={styles.full_title}>Дата регистрации</p>
              <p className={styles.user_name}>15:30:34</p>
            </div>
          </div>
          <div className={styles.statistic_left}>
            <div className={styles.statistic_info}>
              <p className={styles.full_title}>Расход за все время</p>
              <p className={styles.user_name}>189.00 $</p>
            </div>
            <div className={styles.statistic_info}>
              <p className={styles.full_title}>Публикаций за все время</p>
              <p className={styles.user_name}>123</p>
            </div>
            <div className={styles.statistic_info}>
              <p className={styles.full_title}>Последняя активность</p>
              <p className={styles.user_name}>15:30:34</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.chat}>
        <div className={styles.chat_header}>
          <div className={styles.header_title}>
            <p className={styles.chat_title}>Чат</p>
            <img
              className={styles.chat_img}
              src="\images\Chat\chat_ico.svg"
            ></img>
          </div>
          <div className={styles.line_header}></div>
          <div className={styles.chat_data}>Сегодня</div>
        </div>
        <div className={styles.chat_messages}></div>
        <form className={styles.input_cont}>
          <input
            className={styles.input_message}
            placeholder="Введите сообщение"
          ></input>
          <button className={styles.message_sen}></button>
        </form>
      </div>
    </div>
  );
}
