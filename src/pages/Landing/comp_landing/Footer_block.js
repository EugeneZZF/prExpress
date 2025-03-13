import React from "react";
import styles from "./Footer_block.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer_block() {
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isChecked) {
      alert("Пожалуйста, примите соглашение перед отправкой.");
      return;
    }
    alert("Форма отправлена!");
  };
  return (
    <footer>
      <div className={styles.footer_blocks}>
        <div className={styles.footer_blocks_left}>
          <h1>Готовы начать?</h1>
          <div className={styles.footer_blocks_left_bot}>
            <p>Присоединяйтесь к нам прямо сейчас!</p>
            <img src="\images\main\arrow_footer.svg"></img>
          </div>
        </div>
        <div className={styles.footer_blocks_right}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              placeholder="Ваше имя"
              className={styles.input}
              required
            />
            <input
              type="email"
              placeholder="Ваша эл. почта"
              className={styles.input}
              required
            />

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className={styles.checkbox}
              />
              <p>
                {" "}
                Даю согласие на{" "}
                <a href="#" className={styles.link}>
                  обработку персональных данных
                </a>{" "}
                в соответствии с{" "}
                <a href="#" className={styles.link}>
                  политикой конфиденциальности
                </a>
              </p>
            </label>

            <button type="submit" className={styles.button}>
              ОТПРАВИТЬ
            </button>
          </form>
        </div>
      </div>
      <div className={styles.footer_content}>
        <div className={styles.footer_up_cont}>
          <div className={styles.footer_link}>
            <Link className={styles.footer_site_link}>Главная</Link>
            <Link className={styles.footer_site_link}>Ресурсы</Link>
            <Link className={styles.footer_site_link}>Публикации</Link>
          </div>
          <div className={styles.footer_title}>
            <p className={styles.footer_title_p}>
              Если у вас есть вопросы или предложения, не стесняйтесь обращаться
              к нам:
            </p>
          </div>
          <div className={styles.footer_social_media_cont}>
            <div className={styles.footer_media}>
              <img
                className={styles.footer_media_img}
                src="\images\Layout\media_1.svg"
              ></img>
              <p className={styles.footer_media_p}>support@prexpress.io</p>
            </div>
            <div className={styles.footer_media}>
              <img
                className={styles.footer_media_img}
                src="\images\Layout\media_2.svg"
              ></img>
              <p className={styles.footer_media_p}>Telegram</p>
            </div>
          </div>
          <div className={styles.footer_link_2}>
            <Link to={"./privacy-policy"} className={styles.footer_site_link}>
              Политика конфиденциальности
            </Link>
            <Link className={styles.footer_site_link}>
              Лицензионный договор
            </Link>
          </div>
        </div>
        <div className={styles.footer_line}></div>
        <div className={styles.copyright_cont}>
          <p className={styles.copyright_p}>
            Copyright © 2023 PR Express. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
