import "react-quill/dist/quill.snow.css";
import React, { useState, useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import styles from "./Post.module.css";
import "./quill.css";
import { useNavigate } from "react-router-dom";
import { getResurceUser, uploadFormData } from "../Catalog/MainsServices";
import axios from "axios";
import { getDecode } from "../../components/services.js";
import { URL } from "../../components/services.js";

import DateTimePicker from "./DatePicker.js";

export default function Post() {
  const navigate = useNavigate();
  const [unicOpen, setUnicOpen] = useState(false);
  const [dataOpen, setDataOpen] = useState(false);
  const [received, setReceived] = useState([]);
  const [visibleCards, setVisibleCards] = useState(10);
  const handleShowMore = () => {
    setVisibleCards((prev) => prev + 10);
  };

  const [categoryCont, setCategoryCont] = useState(false);
  const [shake, setShake] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [unicCont, setUnicCont] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [author, setAuthor] = useState("");
  const [hashtags, setHashtags] = useState("");

  const [post_name, setPostName] = useState("");
  const [text, setText] = useState("");
  const [formDataISO, setFormDataISO] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [time, setTime] = useState({ hours: "12", minutes: "30" });
  const containerRef = useRef(null);
  const [selectedMedia, setSelectedMedia] = useState([]);

  // КАТЕГОРИИ РЕСУРСА
  const [activeRes, setActiveRes] = useState(-1);

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

  const handleUploadImage = async () => {
    const isEmpty = [...formDataISO.entries()].length;
    if (isEmpty) {
      const image = await uploadFormData(formDataISO);

      console.log(image.filename);
      return image.filename;
    }
    // console.log("form ", formDataISO);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    handleFileUpload(file);
  };

  const handleFileUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);

      const formDatas = new FormData();
      console.log("form1: ", formDatas);
      formDatas.append("image", file);
      console.log("form2: ", formDatas.get);

      setFormDataISO(formDatas);
    }
  };

  const handleContainerClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleTimeChange = (e) => {
    setTime({ ...time, [e.target.name]: e.target.value });
  };

  async function fetchResurce() {
    try {
      const receiveds = await getResurceUser();

      if (receiveds && Array.isArray(receiveds.items)) {
        setReceived(receiveds.items); // Используем массив items
      } else {
        console.warn("Expected an array but got:", receiveds);
        setReceived([]); // Устанавливаем пустой массив, чтобы избежать ошибок
      }

      console.log(receiveds.items, "wall");
    } catch (error) {
      console.error("Failed to fetch wallets:", error);
    }
  }
  useEffect(() => {
    fetchResurce();
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setDataOpen(false);
      }
    };

    if (dataOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [dataOpen]);

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
    const image = await handleUploadImage();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const id = getDecode().id;
      const finalData =
        String(selectedDate).slice(0, 15) +
        " " +
        String(time.hours) +
        ":" +
        String(time.minutes);

      const isoString = new Date(finalData).toISOString().slice(0, 16);

      const categories = [
        { id: 1, name: "Технологии" },
        { id: 2, name: "Наука" },
      ];

      const finalHeaders = unicCont
        .filter((item) => item.title && item.title.trim() !== "")
        .map((item) => ({
          name: item.title,

          categories: item.activeCateg,
          resource_id: item.id,
        }));

      const hash = [];
      hash.push(...hashtags.split("#").filter((tag) => tag));

      console.log(hash);

      const data = {
        name: post_name,
        description: text,
        author: author,
        image: image,
        date: isoString,

        user_id: id,
        headers: finalHeaders,
        hashtags: hash,
      };
      console.log(data);

      const response = await axios.post(`${URL}/posts/`, data, config);

      console.log("Server Response:", response.data);
      navigate(`./profit/${response.data}`);
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
          <button
            className={styles.edit_media_btn}
            onClick={(e) => {
              e.stopPropagation();

              navigate("/resources");
            }}
          >
            <p className={styles.edit_media_btn_p}>Редактировать ресурсы</p>
            <img
              className={styles.edit_media_img}
              src="/images/Post/pencil-02.svg"
              alt="Edit Icon"
            />
          </button>
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
                  if (selectedCategory.length === 0) {
                    setShake(true);
                  } else {
                    setUnicOpen(!unicOpen);
                  }

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
                  <div
                    className={`${styles.container_categpry_0} ${
                      activeRes === 0 ? `${styles.active}` : ""
                    }`}
                  >
                    {selectedCategory?.[0]?.categories?.map((categ, index) => (
                      <div
                        key={categ.id} // Используем id как ключ
                        className={`${styles.categ_cnt} ${
                          selectedCategory[0].activeCateg?.some(
                            (active) => active.id === categ.id
                          )
                            ? styles.active
                            : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(selectedCategory);
                          setSelectedCategory((prevSelected) =>
                            prevSelected.map((item) => {
                              if (item.id === selectedCategory[0].id) {
                                const updatedActiveCateg = item.activeCateg
                                  ? item.activeCateg.some(
                                      (active) => active.id === categ.id
                                    )
                                    ? item.activeCateg.filter(
                                        (c) => c.id !== categ.id
                                      ) // Удаляем, если уже есть
                                    : [...item.activeCateg, categ] // Добавляем, если нет
                                  : [categ];

                                return {
                                  ...item,
                                  activeCateg: updatedActiveCateg,
                                };
                              }
                              return item;
                            })
                          );
                        }}
                      >
                        {categ.name} {/* Отображаем name вместо строки */}
                      </div>
                    ))}
                  </div>
                  <div className={styles.name_res}>
                    <p className={styles.name_t}>Название ресурса</p>
                    <div
                      className={styles.name_i}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(selectedCategory);
                        if (activeRes !== 0) {
                          setActiveRes(0);
                        } else setActiveRes(-1);
                      }}
                    >
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
                      value={inputValues[selectedCategory[0]?.id] || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        setInputValues((prev) => ({
                          ...prev,
                          [selectedCategory[0]?.id]: value,
                        }));
                      }}
                    />
                  </div>
                  <div className={styles.btn_res}>
                    <button
                      className={styles.save_res_ico}
                      onClick={(e) => {
                        e.preventDefault();

                        if (selectedCategory.length > 0) {
                          setUnicCont((prev) => {
                            const existingIndex = prev.findIndex(
                              (unic) => unic.id === selectedCategory[0].id
                            );

                            const updatedItem = {
                              id: selectedCategory[0].id,
                              name: selectedCategory[0].name,
                              title: inputValues[selectedCategory[0].id] || "",
                              activeCateg:
                                selectedCategory[0]?.activeCateg || [],
                            };

                            if (existingIndex !== -1) {
                              return prev.map((item, index) =>
                                index === existingIndex ? updatedItem : item
                              );
                            } else {
                              return [...prev, updatedItem];
                            }
                          });
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
                    .map((cat, index_cat) => (
                      <form
                        key={index_cat + 1}
                        className={styles.cont_resource}
                      >
                        <div
                          className={`${styles.container_categpry_0} ${
                            activeRes === index_cat + 1
                              ? `${styles.active}`
                              : ""
                          }`}
                        >
                          {cat?.categories?.map((categ, index) => (
                            <div
                              key={categ.id}
                              className={`${styles.categ_cnt} ${
                                cat.activeCateg?.some(
                                  (active) => active.id === categ.id
                                )
                                  ? styles.active
                                  : ""
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCategory((prevSelected) =>
                                  prevSelected.map((item) => {
                                    if (item.id === cat.id) {
                                      const updatedActiveCateg =
                                        item.activeCateg
                                          ? item.activeCateg.some(
                                              (active) => active.id === categ.id
                                            )
                                            ? item.activeCateg.filter(
                                                (c) => c.id !== categ.id
                                              ) // Удаляем, если уже есть
                                            : [
                                                ...item.activeCateg,
                                                {
                                                  id: categ.id,
                                                  name: categ.name,
                                                },
                                              ] // Добавляем, если нет
                                          : [
                                              {
                                                id: categ.id,
                                                name: categ.name,
                                              },
                                            ];

                                      return {
                                        ...item,
                                        activeCateg: updatedActiveCateg,
                                      };
                                    }
                                    return item;
                                  })
                                );
                              }}
                            >
                              {categ.name}
                            </div>
                          ))}
                        </div>
                        <div
                          className={styles.name_res}
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(123123);
                            if (activeRes === index_cat + 1) {
                              setActiveRes(-1);
                            } else {
                              setActiveRes(index_cat + 1);
                            }
                          }}
                        >
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
                            onClick={() => {
                              console.log("Юник", unicCont);
                            }}
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
                                  activeCateg: cat.activeCateg || [], // Добавляем activeCateg
                                };

                                if (existingIndex !== -1) {
                                  // Если уже есть, обновляем
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

            <button
              className={`${styles.chose_site} ${
                shake ? styles.anim_shake : ""
              }`}
              onClick={() => setCategoryCont(true)}
            >
              Выбрать сайт
            </button>
          </div>
          <div className={styles.right_third_line}>
            <input
              className={styles.autor_post}
              placeholder="Автор публикации"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            ></input>
            <div
              className={styles.data_cnt}
              ref={containerRef}
              onClick={() => setDataOpen(true)}
            >
              <div className={styles.data_content}>
                {dataOpen ? (
                  <div className={`${styles.time_cnt}`}>
                    <p onClick={() => setDataOpen((prev) => !prev)}>
                      Укажите вермя
                    </p>
                    <input
                      type="number"
                      name="hours"
                      min="0"
                      max="23"
                      value={time.hours}
                      onChange={handleTimeChange}
                      style={{ width: 40, textAlign: "center" }}
                    />
                    <img src="\images\Post\green_dots.svg"></img>
                    <input
                      type="number"
                      name="minutes"
                      min="0"
                      max="59"
                      value={time.minutes}
                      onChange={handleTimeChange}
                      style={{ width: 40, textAlign: "center" }}
                    />
                  </div>
                ) : (
                  <>
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        setDataOpen(true);
                      }}
                    >
                      Дата и время
                    </p>
                    <img
                      onClick={(e) => {
                        e.stopPropagation();
                        setDataOpen(true);
                      }}
                      src="\images\Post\Calendar_Days.svg"
                    ></img>
                  </>
                )}
              </div>
              {dataOpen ? (
                <DateTimePicker
                  selectedDate={selectedDate}
                  onChange={setSelectedDate}
                ></DateTimePicker>
              ) : null}
            </div>
          </div>
          <input
            className={styles.hashtag}
            placeholder="#хештеги"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
          ></input>
          {/* <div className={styles.radioGroup}>
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
          </div> */}
          <input
            className={`${styles.source} ${unicOpen ? styles.active : ""}`}
            placeholder="Ссылка на источник"
            style={
              unicOpen
                ? {
                    transform: `translateY(${
                      selectedCategory.length * 75.994
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
            className={`${styles.next_btn} ${unicOpen ? styles.active : ""}`}
            style={
              unicOpen
                ? {
                    transform: `translateY(${
                      selectedCategory.length * 75.994
                    }px)`,
                  }
                : {}
            }
          >
            Далее
          </div>
        </div>
      </div>
      <div
        className={`${styles.categor_cnt} ${categoryCont ? styles.active : ""}`}
      >
        <div
          className={styles.right_side}
          onClick={() => setCategoryCont(false)}
        >
          <div className={styles.search_info}>
            <div className={styles.card_catalog}>
              <div className={styles.serach_first_info}>
                <p className={styles.search_header_name_1}>Название</p>
                <p className={styles.search_header_name_2}>Категории</p>
                <p className={styles.search_header_name_3}>Язык</p>
                <p className={styles.search_header_name_4}>Ссылка</p>
                <p className={styles.search_header_name_5}>Статус</p>
              </div>
              {Array.isArray(received) &&
                received
                  .filter((rec) => rec.status === "in process")
                  .slice(0, visibleCards)
                  .map((rec) => (
                    <div
                      key={rec.id}
                      className={`${styles.card_resurses} ${
                        selectedCategory.some((item) => item.id === rec.id)
                          ? styles.active
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedCategory((prevItems) => {
                          if (!prevItems.some((item) => item.id === rec.id)) {
                            return [...prevItems, rec];
                          }
                          return prevItems;
                        });
                        setCategoryCont(false);
                        setShake(false);

                        console.log(selectedCategory);
                      }}
                    >
                      <div className={styles.card_line}></div>
                      {/* <input></input> */}
                      <p className={styles.card_name}>{rec.name}</p>
                      <p className={styles.card_category}>
                        {rec.categories[0]?.name}
                      </p>
                      {rec.language === "ru" ? (
                        <img
                          className={styles.language_flag_card}
                          src="/images/Resources/ru_flag.svg"
                          alt="ru flag"
                        />
                      ) : (
                        <img
                          className={styles.language_flag_card}
                          src="/images/Resources/en_flag.svg"
                          alt="en flag"
                        />
                      )}
                      <a
                        href={rec.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link_card}
                      >
                        <img
                          src="/images/Resources/link_ico.svg"
                          alt="link icon"
                        />
                      </a>
                      {rec.status === "in process" ? (
                        <img
                          className={styles.status_img}
                          src="/images/Resources/status_3.svg"
                          alt="status icon"
                        />
                      ) : rec.status === "good" ? (
                        <img
                          className={styles.status_img}
                          src="/images/Resources/status_1.svg"
                          alt="status icon"
                        />
                      ) : (
                        <img
                          className={styles.status_img}
                          src="/images/Resources/status_3.svg"
                          alt="status icon"
                        />
                      )}

                      <div className={styles.card_cont}></div>
                    </div>
                  ))}
            </div>
          </div>
          {visibleCards < received.length && (
            <button className={styles.load_more} onClick={handleShowMore}>
              Показать еще
            </button>
          )}
        </div>
      </div>
    </>
  );
}
