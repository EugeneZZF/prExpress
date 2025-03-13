import "react-quill/dist/quill.snow.css";
import React, { useState, useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import styles from "../../Post/Post.module.css";
import "../../Post/quill.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { getDecode } from "../../../components/services.js";

export default function PostEdit() {
  const [unicOpen, setUnicOpen] = useState(false);

  const [received, setReceived] = useState([]);
  const [visibleCards, setVisibleCards] = useState(10);
  const handleShowMore = () => {
    setVisibleCards((prev) => prev + 10);
  };

  const [categoryCont, setCategoryCont] = useState(false);
  const [shake, setShake] = useState(false);

  const [unicCont, setUnicCont] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([1, 2]);
  const [inputValues, setInputValues] = useState({});
  const [author, setAuthor] = useState("");
  const [hashtags, setHashtags] = useState("");

  const [post_name, setPostName] = useState("");
  const [text, setText] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  const [selectedMedia, setSelectedMedia] = useState([]);

  const mediaOptions = [
    { id: 1, name: "google" },
    { id: 2, name: "twitter" },
    { id: 3, name: "vk" },
    { id: 4, name: "media" },
  ];
  const toggleMedia = (id, name) => {
    setSelectedMedia((prev) => {
      if (prev.includes(name)) {
        return prev.filter((item) => item !== name);
      } else {
        return [...prev, name];
      }
    });
  };

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

  const navigate = useNavigate();

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

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileUpload = (file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    handleFileUpload(file);
  };

  const handleContainerClick = () => {
    document.getElementById("fileInput").click();
  };

  useEffect(() => {}, []);

  // {
  //   "name": "string",
  //   "description": "string",
  //   "image": "string",
  //   "date": "string",
  //   "user_id": 0,
  //   "headers": [
  //     {
  //       "name": "string",
  //       "resource_id": 0
  //     }
  //   ],
  //   "addons": [
  //     {
  //       "name": "string",
  //       "link": "string"
  //     }
  //   ]
  // }

  const handleCreateResource = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const id = getDecode().id;

      const finalHeaders = unicCont
        .filter((item) => item.title && item.title.trim() !== "")
        .map((item) => ({
          name: item.title,
          resource_id: item.id,
        }));

      const hash = [];
      hash.push(...hashtags.split("#").filter((tag) => tag));

      console.log(hash);

      const data = {
        name: post_name,
        description: text,
        author: author,
        image: uploadedImage,

        user_id: id,
        headers: finalHeaders,
        hashtags: hash,
      };
      console.log(data);

      const response = await axios.post(
        `https://prexpress.io/posts/`,
        data,
        config
      );

      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Create resource Error:", error);
    }
  };

  return (
    <>
      <div
        className={styles.cont}
        style={
          unicOpen
            ? {
                paddingBottom: `${(selectedCategory.length - 1) * 75.994}px`,
              }
            : {}
        }
      >
        <div className={styles.post_left_side}>
          <div
            className={styles.upload_img_cont}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleContainerClick}
            style={{ cursor: "pointer" }}
          >
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Uploaded"
                className={styles.uploaded_img}
              />
            ) : (
              <div className={styles.upload_img_content}>
                <img
                  className={styles.upload_img_ico}
                  src="/images/Post/upload_ico.svg"
                  alt="Upload Icon"
                />
                <p className={styles.upload_img_p1}>
                  Загрузить изображение основной статьи
                </p>
                <p className={styles.upload_img_format}>
                  png, jpg, gif, webp, mp4
                </p>
                <div className={styles.upload_img_size}>Max 200 mb</div>
              </div>
            )}
          </div>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
          <div className={styles.media_btn_cont}>
            <div className={styles.media_btn_container}>
              <div className={styles.media_connect}>
                <h1 className={styles.media_title}>Соц. сети:</h1>
                <div className={styles.media_first_line}>
                  {mediaOptions.slice(0, 2).map(({ id, name }) => (
                    <div
                      key={id}
                      className={styles.media_1}
                      style={{
                        backgroundImage: `url(/images/Post/connect_media_${id}${
                          selectedMedia.includes(name) ? "_green" : ""
                        }.svg)`,
                      }}
                      onClick={() => toggleMedia(id, name)}
                    ></div>
                  ))}
                </div>
                <div className={styles.media_first_line}>
                  {mediaOptions.slice(2, 4).map(({ id, name }) => (
                    <div
                      key={id}
                      className={styles.media_1}
                      style={{
                        backgroundImage: `url(/images/Post/connect_media_${id}${
                          selectedMedia.includes(name) ? "_green" : ""
                        }.svg)`,
                      }}
                      onClick={() => toggleMedia(id, name)}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.edit_media_btn_edit}>Имяпользовывыф</div>
        </div>
        <div className={styles.right_side_post}>
          <input
            className={styles.namePost_input}
            placeholder="Название поста"
            value={post_name}
            onChange={(e) => setPostName(e.target.value)}
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
          <div className={styles.second_line_right}>
            <div className={styles.unic_cont}>
              <button
                className={styles.Unify}
                onClick={() => {
                  setUnicOpen(!unicOpen);
                  console.log(uploadedImage);
                }}
              >
                Уникализировать заголовки
              </button>
              <div
                className={`${styles.unic_menu} ${
                  unicOpen ? styles.active : ""
                }`}
              >
                <div className={styles.first_line_unic}>
                  <p className={styles.unic_title}>Уникализация заголовков</p>
                  <img
                    className={styles.close_btn_unic}
                    src="\images\Post\close_btn.svg"
                    onClick={() => {
                      setUnicOpen(!unicOpen);
                    }}
                  ></img>
                </div>
                <form className={styles.cont_resource_1}>
                  <div className={styles.name_res}>
                    <p className={styles.name_t}>Название ресурса</p>
                    <div className={styles.name_i}>
                      {selectedCategory.length > 0 ? (
                        <>{selectedCategory[0].name}</>
                      ) : null}
                    </div>
                  </div>
                  <div className={styles.name_res}>
                    <p className={styles.name_t}>Заголовок ресурса</p>
                    <input
                      className={`${styles.zag_i} ${
                        selectedCategory.length !== 0 &&
                        unicCont.some(
                          (unic) => unic.id === selectedCategory[0].id
                        )
                          ? styles.zag_green
                          : ""
                      }`}
                      placeholder="Заголовок ресурса"
                      value={inputValues[selectedCategory[0]?.id] || ""} // Привязываем к состоянию
                      onChange={(e) => {
                        const value = e.target.value;
                        setInputValues((prev) => ({
                          ...prev,
                          [selectedCategory[0]?.id]: value, // Сохраняем введённый текст
                        }));
                      }}
                    />
                  </div>
                  <div className={styles.btn_res}>
                    <button
                      className={styles.save_res_ico}
                      onClick={(e) => {
                        e.preventDefault();

                        if (
                          selectedCategory.length > 0 &&
                          !unicCont.some(
                            (unic) => unic.id === selectedCategory[0].id
                          )
                        ) {
                          setUnicCont((prev) => [
                            ...prev,
                            {
                              id: selectedCategory[0].id,
                              name: selectedCategory[0].name,
                              title: inputValues[selectedCategory[0].id] || "", // Берем заголовок из inputValues
                            },
                          ]);
                        }
                      }}
                    ></button>
                    <button
                      type="button"
                      className={styles.delete_res_ico}
                      onClick={() => {
                        if (selectedCategory.length === 1) {
                          setUnicOpen(false);
                        }
                        setSelectedCategory((prevItems) =>
                          prevItems.filter(
                            (item) => item.id !== selectedCategory[0].id
                          )
                        );
                        setUnicCont((prevItems) =>
                          prevItems.filter(
                            (item) => item.id !== selectedCategory[0].id
                          )
                        );
                      }}
                    ></button>
                  </div>
                </form>
                {Array.isArray(selectedCategory) &&
                  selectedCategory
                    .filter((cat) => cat.id !== selectedCategory[0].id)
                    .map((cat) => (
                      <form key={cat.id} className={styles.cont_resource}>
                        <div className={styles.name_res}>
                          <div className={styles.name_i}>{cat.name}</div>
                        </div>
                        <div className={styles.name_res}>
                          <input
                            className={`${styles.zag_i} ${
                              unicCont.some((unic) => unic.id === cat.id)
                                ? styles.zag_green
                                : ""
                            }`}
                            placeholder="Заголовок ресурса"
                            value={inputValues[cat.id] || ""}
                            onChange={(e) =>
                              setInputValues((prev) => ({
                                ...prev,
                                [cat.id]: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className={styles.btn_res_2}>
                          <button
                            type="button"
                            className={styles.save_res_ico}
                            onClick={() => {
                              setUnicCont((prev) => {
                                const existingIndex = prev.findIndex(
                                  (unic) => unic.id === cat.id
                                );
                                const updatedItem = {
                                  id: cat.id,
                                  name: cat.name,
                                  title: inputValues[cat.id] || "", // Берем заголовок из input
                                };

                                if (existingIndex !== -1) {
                                  // Если уже есть, обновляем заголовок
                                  const updatedList = [...prev];
                                  updatedList[existingIndex] = updatedItem;
                                  return updatedList;
                                } else {
                                  // Если нет, добавляем новый элемент
                                  return [...prev, updatedItem];
                                }
                              });
                            }}
                          ></button>

                          <button
                            type="button"
                            className={styles.delete_res_ico}
                            onClick={() => {
                              setSelectedCategory((prevItems) =>
                                prevItems.filter((item) => item.id !== cat.id)
                              );
                              setUnicCont((prevItems) =>
                                prevItems.filter((item) => item.id !== cat.id)
                              );
                              setInputValues((prev) => {
                                const newValues = { ...prev };
                                delete newValues[cat.id]; // Удаляем введённое значение заголовка
                                return newValues;
                              });
                            }}
                          ></button>
                        </div>
                      </form>
                    ))}
              </div>
            </div>
            {/* className={`${styles.source} ${unicOpen ? styles.active : ""}`} */}
            {/* <button
              className={`${styles.chose_site} ${
                shake ? styles.anim_shake : ""
              }`}
              onClick={() => setCategoryCont(true)}
            >
              Выбрать сайт
            </button> */}
          </div>
          <div className={styles.right_third_line}>
            <input
              className={styles.autor_post_edit}
              placeholder="Автор публикации"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            ></input>
          </div>
          <input
            className={styles.hashtag}
            placeholder="#хештеги"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
          ></input>
          <div className={styles.radioGroup}>
            <label className={styles.radioButton}>
              <input type="radio" />
              <span className={styles.customRadio}></span>
              Все связи ведут на указанный источник
            </label>

            <label className={styles.radioButton}>
              <input type="radio" />
              <span className={styles.customRadio}></span>
              Случайное построение ссылок
            </label>
          </div>
          <input
            className={`${styles.source} ${unicOpen ? styles.active : ""}`}
            placeholder="Ссылка на источник"
            style={
              unicOpen
                ? {
                    transform: `translateY(${
                      (selectedCategory.length - 1) * 75.994
                    }px)`,
                  }
                : {}
            }
          />
          <div
            onClick={(e) => {
              // navigate("/post/profit");
              e.preventDefault();
              handleCreateResource();
            }}
            className={`${styles.next_btn_edit} ${
              unicOpen ? styles.active : ""
            }`}
            style={
              unicOpen
                ? {
                    transform: `translateY(${
                      (selectedCategory.length - 1) * 75.994
                    }px)`,
                  }
                : {}
            }
          >
            <textarea
              placeholder="Причина отказа"
              className={styles.text_area_edit}
            ></textarea>
            <div className={styles.button_cont_edit}>
              <button className={styles.publish_btn}>Опубликовать</button>
              <button className={styles.cancel_btn}>Опубликовать</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
