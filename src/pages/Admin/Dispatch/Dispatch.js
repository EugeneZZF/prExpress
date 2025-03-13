import React from "react";
import styles from "./Dispatch.module.css";
import Checkbox from "../../Landing/comp_landing/Checkbox";
import ReactQuill from "react-quill";
import { useState } from "react";

export default function Dispatch() {
  const [text, setText] = useState("");

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
        <input className={styles.title} placeholder="Название поста"></input>
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
        <button className={styles.send_button}>Отправить</button>
      </div>
    </div>
  );
}
