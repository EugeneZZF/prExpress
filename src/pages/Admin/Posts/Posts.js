import React, { useEffect, useState } from "react";
import styles from "./Posts.module.css";
import Checkbox from "../../Landing/comp_landing/Checkbox";
import { getPosts } from "../../../components/services";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [checkboxes, setCheckboxes] = useState({
    all: false,
    dateChanged: false,
    resources: false,
    moderation: false,
    myPublications: false,
  });

  const handleCheckboxChange = (name) => {
    setCheckboxes((prev) => {
      const updatedCheckboxes = { ...prev, [name]: !prev[name] };

      // Если включён "all", включаем всё остальное
      if (name === "all") {
        Object.keys(updatedCheckboxes).forEach((key) => {
          updatedCheckboxes[key] = updatedCheckboxes.all;
        });
      }

      fetchPosts(updatedCheckboxes);
      return updatedCheckboxes;
    });
  };

  async function fetchPosts(filters = checkboxes) {
    const { dateChanged, resources, moderation, myPublications } = filters;

    // Определяем параметры сортировки в зависимости от чекбоксов
    let sort_by = "date";
    if (dateChanged) sort_by = "date_changed";
    else if (resources) sort_by = "resources";
    else if (moderation) sort_by = "moderation";
    else if (myPublications) sort_by = "my_publications";

    const posts = await getPosts(1, 10, "", null, null, sort_by, "desc");
    setPosts(posts);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  function formatDateTime(isoString) {
    let date = new Date(isoString);

    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let year = date.getFullYear();

    let hours = String(date.getHours()).padStart(2, "0");
    let minutes = String(date.getMinutes()).padStart(2, "0");
    let seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}.${month}.${year}\n${hours}:${minutes}:${seconds}`;
  }
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
                isChecked={checkboxes.all}
                onChange={() => handleCheckboxChange("all")}
              />
              <span>Показать все</span>
            </div>
            <div className={styles.checkbox_cnt}>
              <Checkbox
                label="Измененная дата"
                isChecked={checkboxes.dateChanged}
                onChange={() => handleCheckboxChange("dateChanged")}
              />
              <span>Измененная дата</span>
            </div>
            <div className={styles.checkbox_cnt}>
              <Checkbox
                label="Ресурсы"
                isChecked={checkboxes.resources}
                onChange={() => handleCheckboxChange("resources")}
              />
              <span>Ресурсы</span>
            </div>
            <div className={styles.checkbox_cnt}>
              <Checkbox
                label="На модерации"
                isChecked={checkboxes.moderation}
                onChange={() => handleCheckboxChange("moderation")}
              />
              <span>На модерации</span>
            </div>
            <div className={styles.checkbox_cnt}>
              <Checkbox
                label="Мои публикации"
                isChecked={checkboxes.myPublications}
                onChange={() => handleCheckboxChange("myPublications")}
              />
              <span>Мои публикации</span>
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
          <div className={styles.card_cont}>
            {posts.map((post, index) => (
              <div
                key={index}
                className={styles.post_cont}
                onClick={console.log(post)}
              >
                <div className={styles.post_first_line}>
                  <div className={styles.post_id}>№ {post.id}</div>
                  <div className={styles.post_author}>{post.name}</div>
                  <div className={styles.post_name}>
                    <p>{post.name}</p>
                  </div>
                  <div className={styles.post_language}>
                    {post.language === "ru" ? (
                      <img
                        src="/images/Resources/ru_flag.svg"
                        alt="Russian flag"
                        className={styles.flag_post}
                      />
                    ) : (
                      <img
                        src="/images/Resources/en_flag.svg"
                        alt="English flag"
                        className={styles.flag_post}
                      />
                    )}
                  </div>
                  <div className={styles.post_price}>$ {post.price}</div>
                  <div className={styles.post_date}>
                    <p>{formatDateTime(post.created_at)}</p>
                  </div>
                  {post.status === "in process" ? (
                    <img
                      className={styles.post_status}
                      src="/images/Resources/status_3.svg"
                    />
                  ) : post.status === "verified" ? (
                    <img
                      className={styles.post_status}
                      src="/images/Resources/status_1.svg"
                    />
                  ) : (
                    <img
                      className={styles.post_status}
                      src="/images/Resources/status_2.svg"
                    />
                  )}
                </div>
                <div className={styles.post_line}></div>
                <div className={styles.post_second_line}>
                  <p className={styles.post_actions_title}>Действия:</p>
                  <div className={styles.actions_cnt}>
                    <img
                      className={styles.actions_chat}
                      src="\images\admin\action_1.svg"
                    ></img>
                    <img
                      className={styles.actions_new_res}
                      src="\images\admin\action_2.svg"
                    ></img>
                    <img
                      className={styles.actions_info}
                      src="\images\admin\action_3.svg"
                    ></img>
                    <img
                      className={styles.actions_edit}
                      src="\images\admin\action_4.svg"
                    ></img>
                    <img
                      className={styles.actions_trash}
                      src="\images\admin\action_7.svg"
                    ></img>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
