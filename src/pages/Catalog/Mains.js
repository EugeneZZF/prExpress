import React, { useState } from "react";
import styles from "./Mains.module.css";
import Checkbox from "../Landing/comp_landing/Checkbox";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getDecode, getImage } from "../../components/services";
import { URL } from "../../components/services";

import {
  deleteResource,
  getResurceUser,
  uploadFormData,
} from "./MainsServices";

export default function Mains() {
  const accesstoken = Cookies.get("token");
  // const URL = "https://prexpress.io";

  // const URL = "https://localhost:8000/api/v1";

  const [selectedRes, setSelectedRes] = useState({});
  const [statusRes, setStatusRes] = useState("");
  const [statusEdit, setStatusEdit] = useState(false);

  const [visibleCards, setVisibleCards] = useState(10);
  const handleShowMore = () => {
    setVisibleCards((prev) => prev + 10);
  };
  const [checkboxes, setCheckboxes] = useState({
    all: false,
  });

  const handleAllChange = () => {
    const newValue = !checkboxes.all;

    const newCheckboxes = {};
    for (const key in checkboxes) {
      if (key !== "all") {
        newCheckboxes[key] = newValue;
      }
    }
    newCheckboxes.all = newValue; // Update the all property
    setCheckboxes(newCheckboxes);
    console.log(checkboxes);
  };

  const handleCheckboxChange = (name) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: !prevCheckboxes[name],
    }));
    // console.log(checkboxes);
  };

  const validateInputs = () => {
    const errors = {};
    if (!resourceName) errors.resourceName = "Resource name is required";
    if (!resourceUri) errors.resourceUri = "Resource URI is required";
    if (!resourceDescription)
      errors.resourceDescription = "Resource description is required";
    if (!resourceLogin) errors.resourceLogin = "Resource login is required";
    if (!resourcePassword)
      errors.resourcePassword = "Resource password is required";
    return errors;
  };

  const [resourceName, setResourceName] = useState("name");
  const [resourceDescription, setResourceDescription] = useState("Discription");
  const [resourceLanguage, setResourceLanguage] = useState("ru");
  const [hoverStates, setHoverStates] = useState({});

  const handleMouseEnter = (id) => {
    setHoverStates((prev) => ({ ...prev, [id]: true }));
  };

  const handleMouseLeave = (id) => {
    setHoverStates((prev) => ({ ...prev, [id]: false }));
  };

  const [resourceLogin, setResourceLogin] = useState("adminuser415409");
  const [resourcePassword, setResourcePassword] = useState(
    "iZhT c9Sj zjHN ctW4 HAgu HmlL"
  );
  const [resourceUri, setResourceUri] = useState(
    "https://s-q5m5hmqfvvs9.eu1.wpsandbox.org"
  );
  const [resourcePrice, setResourcePrice] = useState("21");
  // const [resourceId, setResourceid] = useState("");
  // const [resourceWalletId, setResourceWalletId] = useState("usdt_trc20");
  // const [resourcetoken, setResourceToken] = useState("565");
  const [errors, setErrors] = useState({});
  const [selectedCategories, setSelectedCategorues] = useState([]);
  // const [error, setError] = useState(null);

  const [received, setReceived] = useState([]);
  const [formDataISO, setFormDataISO] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const loginData = {
    username: "TEST_USER",
    password: "cOzm QHpG 0fp2 mvly j6IV w86n",
    uri: "https://ruscrime.com",
  };

  function arraysEqual(a, b) {
    if (a.Link == b.Link) return false;
    return true;
  }

  async function handleSelectedRes(rec) {
    // await getImage(rec.im);
    setSelectedRes(rec);
    setStatusRes("edit");
    setStatusEdit((prev) => !prev);
  }

  const handleSynchronization = async (e) => {
    e.preventDefault();
    fetchResurce();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const response = await axios.post(
        `${URL}/resources/syncronize`,
        {
          login: resourceLogin,
          password: resourcePassword,
          url: resourceUri,
        },
        config
      );

      if (response.status === 200) {
        if (selectedCategories.length !== 0) {
          const newElements = [];
          console.log("1");
          for (let i = 0; i < selectedCategories.length; i++) {
            response.data.forEach((element) => {
              console.log(arraysEqual(selectedCategories[i], element));
              if (arraysEqual(selectedCategories[i], element)) {
                newElements.push(element);
              }
            });
          }
        } else {
          const newElements = [];
          response.data.forEach((element) => {
            console.log(element);
            selectedCategories.push(element);
            selectedCategories.push(...newElements);

            console.log("Checkbox", checkboxes);
          });
        }
        for (var i = 0; i < selectedCategories.length; i++) {
          checkboxes[`category${i + 1}`] = false;
        }
        console.log(response.data);
        console.log(selectedCategories, " selected");
        handleAllChange();
        handleCheckboxChange("all");
      }

      console.log("Server Response:", response.data);
    } catch (error) {
      alert("Неверные логин/Ссылка на сайт/пароль!");
      console.error("Synchronization Error:", error);
    }
  };

  const handleCreateResource = async (e) => {
    e.preventDefault();
    const inputErrors = validateInputs();
    const categories = [];
    const keys = Object.keys(checkboxes);

    keys.forEach((key, index) => {
      if (key !== "all" && checkboxes[key]) {
        categories.push({
          ...selectedCategories[index],
          is_active: true,
        });
      }
    });

    console.log("cat ", categories);
    const image = await handleUploadImage();
    if (Object.keys(inputErrors).length === 0) {
      if (!statusEdit) {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          };

          const id = getDecode().id;

          const response = await axios.post(
            `${URL}/resources/`,
            {
              language: resourceLanguage == "ru" ? "ru" : "en",
              name: resourceName,
              image: image,
              link: resourceUri,
              description: resourceDescription,
              price_for_pub: Number(resourcePrice),
              login: resourceLogin,
              password: resourcePassword,
              categories: categories,
              user_id: id,
            },
            config
          );

          console.log("Server Responseww:", response.data);
        } catch (error) {
          console.error("Create resurse Error:", error);
        }
      } else {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          };

          console.log("selected", selectedRes);

          const response = await axios.put(
            `${URL}/resources/${selectedRes.id}`,
            {
              language: resourceLanguage === "ru" ? "en" : "ru",
              name: resourceName,
              image: image,
              link: resourceUri,
              description: resourceDescription,
              price_for_pub: Number(resourcePrice),
              login: resourceLogin,
              password: resourcePassword,
            },
            config
          );
          const response_cat = await axios.put(
            `${URL}/resources/${selectedRes.id}/categories`,
            { categories },
            config
          );

          console.log(response_cat);

          console.log("Server Responseww:", response.data);

          alert("Ресурс успешно обновлен!");
        } catch (error) {
          console.error("Create resurse Error:", error);
        }
      }
    } else {
      setErrors(inputErrors);
    }
  };

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
      console.error("Failed to fetch Resurce:", error);
    }
  }
  useEffect(() => {
    fetchResurce();
  }, []);

  async function handleDoSomething() {
    if (statusRes === "del") {
      await deleteResource(selectedRes.id);
      alert("Ресурс успешно удален!");
    }
  }

  return (
    <div className={styles.cont_1}>
      <div className={styles.cont}>
        <div
          className={`${styles.catalog} ${
            statusEdit ? styles.edit_catalog : ""
          }`}
        >
          <div className={styles.title_catalog}>
            <p>
              {!statusEdit ? "Добавить новый ресурс" : "Редактировать ресурс"}
            </p>
            <img src="/images/Resources/plus.svg" alt="plus icon" />
          </div>
          <div className={styles.line_1}></div>
          <div
            className={styles.upload}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleContainerClick}
          >
            {uploadedImage ? null : (
              <>
                {" "}
                <img src="/images/Post/upload_ico.svg" alt="Upload Icon" />
                <p className={styles.upload_p1}>Загрузить изображение сайта</p>
                <p className={styles.upload_p2}>png, jpg, gif, webp, mp4</p>
                <div className={styles.upload_p3}>Max 200 mb</div>
              </>
            )}

            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className={styles.hidden}
              onChange={handleFileSelect}
            />
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="absolute w-full h-full object-cover"
              />
            )}
          </div>
          <div className={styles.set_language_catalog}>
            <p className={styles.language_p}>Выбор языка</p>
            <div className={styles.language_option}>
              <input
                type="radio"
                id="russian"
                name="language"
                value="ru"
                checked={resourceLanguage === "ru"}
                onChange={(e) => {
                  setResourceLanguage(e.target.value);
                  console.log(resourceLanguage);
                }}
                className={styles.radio_button}
              />
              <label htmlFor="russian" className={styles.language_label}>
                <span className={styles.custom_radio}></span>Русский
                <img
                  src="/images/Resources/ru_flag.svg"
                  alt="Russian flag"
                  className={styles.flag}
                />
              </label>
            </div>
            <div className={styles.language_option}>
              <input
                type="radio"
                id="english"
                name="language"
                value="en"
                checked={resourceLanguage === "en"}
                onChange={(e) => {
                  setResourceLanguage(e.target.value);
                  console.log(resourceLanguage);
                }}
                className={styles.radio_button}
              />
              <label htmlFor="english" className={styles.language_label}>
                <span className={styles.custom_radio}></span>Английский
                <img
                  src="/images/Resources/en_flag.svg"
                  alt="English flag"
                  className={styles.flag}
                />
              </label>
            </div>
          </div>
          <div className={styles.name_res}>
            <p className={styles.name_p}>Укажите название ресурса</p>
            <input
              className={styles.name_input}
              placeholder="Название ресурса"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
            ></input>
          </div>
          <div className={styles.link_site}>
            <p className={styles.lint_p}>Ссылка на сайт</p>
            <input
              className={styles.name_input}
              placeholder="www.fgima.ru"
              value={resourceUri}
              onChange={(e) => setResourceUri(e.target.value)}
            ></input>
          </div>
          <div className={styles.discription_site}>
            <p className={styles.lint_p}>Описание сайта</p>
            <textarea
              className={styles.name_textarea}
              placeholder="Сайт у НВС отличный"
              value={resourceDescription}
              onChange={(e) => setResourceDescription(e.target.value)}
            ></textarea>
          </div>
          {/* <div className={styles.choose_wallet}>
          <p className={styles.lint_p}>Выбор кошелька для оплаты</p>
          <select
            className={styles.wallet_select}
            value={resourceWalletId}
            onChange={(e) => setResourceWalletId(e.target.value)}
          >
            {wallets.map((wallet) => (
              <option className={styles.options} value={wallet.id}>
                {wallet.address}
              </option>
            ))}
          </select>
        </div> */}
          <div className={styles.stoim}>
            <p className={styles.lint_p}>Желаемая стоимость публикации</p>

            <input
              className={styles.stoim_input}
              placeholder="13.5$"
              value={resourcePrice}
              onChange={(e) => setResourcePrice(e.target.value)}
            ></input>
            <p className={styles.lint_p_red}>стоимость включает комиссию 35%</p>
          </div>
          <form onSubmit={handleCreateResource}>
            {/* <div className={styles.link_site}>
              <p className={styles.lint_p}>Токен</p>
              <input
                type="text"
                className={styles.name_input}
                placeholder="Токен"
                value={resourcetoken}
                onChange={(e) => setResourceToken(e.target.value)}
              />
            </div> */}
            <div className={styles.link_site}>
              <p className={styles.lint_p}>Логин</p>
              <input
                type="text"
                className={styles.name_input}
                placeholder="Логин"
                value={resourceLogin}
                onChange={(e) => setResourceLogin(e.target.value)}
              />
            </div>
            <div className={styles.link_site}>
              <p className={styles.lint_p}>Пароль</p>
              <input
                type="password"
                className={styles.name_input}
                placeholder="Пароль"
                value={resourcePassword}
                onChange={(e) => setResourcePassword(e.target.value)}
              />
            </div>
            <div
              className={styles.sort}
              // style={statusEdit ? { display: "none" } : {}}
            >
              <p className={styles.h1_sort}>Выберете категории</p>
              <div className={styles.category_choose}>
                <div className={styles.category_cont}>
                  <Checkbox
                    label="Все"
                    isChecked={checkboxes.all}
                    onChange={handleAllChange}
                  />
                  Выбрать все
                </div>

                {selectedCategories.map((item, index) => (
                  <div className={styles.category_cont} key={index}>
                    <Checkbox
                      checked={checkboxes[`category${index + 1}`]}
                      label={`Категория ${index}`}
                      onChange={() =>
                        handleCheckboxChange(`category${index + 1}`)
                      }
                    />
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
            <button
              className={styles.synchronization_btn}
              onClick={(e) => {
                handleSynchronization(e);
              }}
              // style={statusEdit ? { display: "none" } : {}}
            >
              Синхронизация
            </button>
            <button
              type="submit"
              className={styles.add_btn}
              // style={statusEdit ? { marginTop: "40px" } : {}}
            >
              {!statusEdit ? "Создать ресурс" : "Редактировать ресурс"}
            </button>
          </form>
          {Object.keys(errors).map((errorKey) => (
            <p key={errorKey} className={styles.error}>
              {errors[errorKey]}
            </p>
          ))}
        </div>
        <div className={styles.right_side}>
          <div className={styles.search_info}>
            <div className={styles.card_catalog}>
              <div className={styles.serach_first_info}>
                <p
                  className={styles.search_header_name_1}
                  onClick={(e) => {
                    handleUploadImage(e);
                  }}
                >
                  Название
                </p>
                <p className={styles.search_header_name_2}>Категории</p>
                <p className={styles.search_header_name_3}>Язык</p>
                <p className={styles.search_header_name_4}>Ссылка</p>
                <p className={styles.search_header_name_5}>Статус</p>
                <p className={styles.search_header_name_6}>Действия</p>
              </div>
              {Array.isArray(received) &&
                received.slice(0, visibleCards).map((rec) => (
                  <div key={rec.id} className={styles.card_resurses}>
                    <div className={styles.card_line}></div>
                    <p className={styles.card_name}>{rec.name}</p>
                    <p className={styles.card_category}>
                      {rec.categories?.length > 0 && (
                        <span>{rec.categories[0].name}</span>
                      )}
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

                    <div className={styles.card_cont}>
                      <a
                        className={styles.card_info}
                        onMouseEnter={() => handleMouseEnter(rec.id)}
                        onMouseLeave={() => handleMouseLeave(rec.id)}
                      >
                        {hoverStates[rec.id] && (
                          <div className={styles.info_card_cont}>
                            {rec.categories.map((categ, index) => (
                              <p key={index}>
                                {categ.name}
                                {index !== rec.categories.length - 1
                                  ? ","
                                  : "."}
                              </p>
                            ))}
                          </div>
                        )}
                        <img
                          src="/images/Resources/card_info.svg"
                          alt="info icon"
                        />
                      </a>
                      <a
                        className={styles.card_delete}
                        onClick={() => {
                          setSelectedRes(rec);
                          setStatusRes("del");
                          console.log(statusRes);
                          console.log(selectedRes);
                        }}
                      >
                        <img
                          src="/images/Resources/card_trash.svg"
                          alt="delete icon"
                        />
                      </a>
                      <a
                        className={styles.card_red}
                        onClick={() => {
                          handleSelectedRes(rec);
                          console.log(rec);
                        }}
                      >
                        <img
                          src={
                            statusEdit && selectedRes?.id === rec.id
                              ? "/images/settings/edit_new.svg"
                              : "/images/Resources/card_red.svg"
                          }
                          className={styles.edit_card}
                          alt="edit icon"
                        />
                      </a>
                    </div>
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
      {statusRes === "del" ? (
        <div
          className={styles.cont_selected}
          onClick={(e) => {
            e.stopPropagation();
            setStatusRes("");
          }}
        >
          <div
            className={styles.confirm}
            onClick={(event) => event.stopPropagation()}
          >
            <h1>Удаление аккаунта</h1>
            <div className={styles.confirm_line}></div>
            <div className={styles.confirm_content}>
              <p>
                Вы уверены, что хотите{" "}
                <span style={{ color: "red" }}>удалить </span>
                ресурс{" "}
                <span style={{ color: "green" }}>{selectedRes.name}?</span>
                <br></br>
                <span style={{ color: "red" }}>
                  После удаление произойдет снятие ресурса со всех публикаций.
                </span>
              </p>
            </div>
            <div className={styles.confirm_btn}>
              <button
                className={styles.yes_btn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDoSomething();
                  setStatusRes("");
                }}
              >
                Да
              </button>
              <button
                className={styles.no_btn}
                onClick={(event) => {
                  event.stopPropagation();
                  setStatusRes("");
                }}
              >
                Нет
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {/* {statusRes === "edit" ? (
        <div
          className={styles.cont_selected}
          onClick={(e) => {
            e.stopPropagation();
            setStatusRes("");
          }}
        >
          <div
            className={styles.confirm}
            onClick={(event) => event.stopPropagation()}
          >
            <h1>Удаление аккаунта</h1>
            <div className={styles.confirm_line}></div>
            <div className={styles.confirm_content}>
              <p>
                Вы уверены, что хотите{" "}
                <span style={{ color: "red" }}>удалить </span>
                ресурс{" "}
                <span style={{ color: "green" }}>{selectedRes.name}?</span>
                <br></br>
                <span style={{ color: "red" }}>
                  После удаление произойдет снятие ресурса со всех публикаций.
                </span>
              </p>
            </div>
            <div className={styles.confirm_btn}>
              <button
                className={styles.yes_btn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDoSomething();
                  setStatusRes("");
                }}
              >
                Да
              </button>
              <button
                className={styles.no_btn}
                onClick={(event) => {
                  event.stopPropagation();
                  setStatusRes("");
                }}
              >
                Нет
              </button>
            </div>
          </div>
        </div>
      ) : null} */}
    </div>
  );
}
