import React from "react";
import styles from "./Dispatch.module.css";
import Checkbox from "../../Landing/comp_landing/Checkbox";
import ReactQuill from "react-quill";
import { useState } from "react";
import { notificationsSend } from "../../../components/services";

export default function Dispatch() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [checkboxes, setCheckboxes] = useState({
    all: false,
    premium: false,
    owners: false,
    user: false,
    online: false,
  });

  const handleCheckboxChange = (name) => {
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  async function DispatchNotifucatuiins(e) {
    e.stopPropagation();
    console.log(title);
    console.log(text);
    // notificationsSend(title, text, checkboxes);
    const options = Object.keys(checkboxes).filter((key) => checkboxes[key]);

    if (options.length <= 0) {
      alert("Выберите хотя бы один вариант рассылки!");
    } else if (!title.trim()) {
      alert("Поле 'Название поста' не должно быть пустым");
    } else if (!text.trim()) {
      alert("Поле 'Описание' не должно быть пустым");
    } else {
      notificationsSend(title, text, options);
    }
  }

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }, "blockquote"],
      ["link", "image", "video"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };
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
              Все
            </div>
            <div className={styles.checkbox_cnt}>
              <Checkbox
                label="Премиум пользователи"
                isChecked={checkboxes.premium}
                onChange={() => handleCheckboxChange("premium")}
              />
              Премиум пользователи
            </div>
            <div className={styles.checkbox_cnt}>
              <Checkbox
                label="Владельцы ресурсов"
                isChecked={checkboxes.owners}
                onChange={() => handleCheckboxChange("owner")}
              />
              Владельцы ресурсов
            </div>
            <div className={styles.checkbox_cnt}>
              <Checkbox
                label="Стандартные пользователи"
                isChecked={checkboxes.standard}
                onChange={() => handleCheckboxChange("user")}
              />
              Стандартные пользователи
            </div>
            <div className={styles.checkbox_cnt}>
              <Checkbox
                label="Сейчас онлайн"
                isChecked={checkboxes.online}
                onChange={() => handleCheckboxChange("online")}
              />
              Сейчас онлайн
            </div>
          </div>
          <button className={styles.sort_btn}>Применить</button>
        </div>
      </div>
      <div className={styles.right_side}>
        <input
          className={styles.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название поста"
        ></input>
        <ReactQuill
          theme="snow"
          value={text}
          modules={modules}
          formats={formats}
          onChange={(value) => {
            setText(value);
            // console.log(uploadedImage, "dsads");
          }}
          placeholder="Описание..."
        />
        <button
          className={styles.send_button}
          onClick={(e) => DispatchNotifucatuiins(e)}
        >
          Отправить
        </button>
      </div>
    </div>
  );
}
