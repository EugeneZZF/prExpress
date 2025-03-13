import React from "react";
import styles from "./ResourceAdmin.module.css";
import Checkbox from "../../Landing/comp_landing/Checkbox";
import { useState } from "react";
import Dropdown from "../../../components/elements/Dropdown";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteResource,
  getAllResurce,
  getResourceInfo,
  getResurceUser,
  verifyResource,
} from "../../Catalog/MainsServices";
import Cookies from "js-cookie";
import { getDecode, searchResources } from "../../../components/services";
import SliderInput from "../../../components/elements/SliderInput";

export default function ResourceAdmin() {
  const navigate = useNavigate();
  const accesstoken = Cookies.get("token");
  const URL = "https://prexpress.io";

  const [statusRes, setStatusRes] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRes, setAcitveRes] = useState();

  const handleSearch = async (event) => {
    setSearchQuery(event.target.value);
    // if (event.target.value.length > 2) {
    // Начать поиск после 3 символов
    const results = await searchResources(event.target.value);
    console.log("Search Results:", results);
    setReceived(results.items);
    console.log(received);
    // }
  };

  const [resourceLanguage, setResourceLanguage] = useState("russian");
  const [name, setName] = useState("");
  const [link, setLink] = useState("https://ruscrime.com");
  const [description, setDescription] = useState("");

  const [cost, setCost] = useState("");
  const [token, setToken] = useState("");
  const [login, setLogin] = useState("TEST_USER");
  const [password, setPassword] = useState("cOzm QHpG 0fp2 mvly j6IV w86n");

  const [selectedCategories, setSelectedCategorues] = useState([]);
  const [received, setReceived] = useState([]);

  // КОНСТ RIGHT SIDE CATALOG
  const [rightStatus, setRightStatus] = useState("0");
  const [activeIndex, setActiveIndex] = useState(null);
  // const [value, setValue] = useState(0);
  const [sliderValues, setSliderValues] = useState({});
  const handleSliderChange = (id, newValue) => {
    setSliderValues((prevValues) => ({
      ...prevValues,
      [id]: newValue,
    }));
  };
  const [sliderValues_2, setSliderValues_2] = useState({});
  const handleSliderChange_2 = (id, newValue) => {
    setSliderValues_2((prevValues) => ({
      ...prevValues,
      [id]: newValue,
    }));
  };
  const [checkboxValues, setCheckboxValues] = useState({});

  const handleCheckboxChange = (resId, category) => {
    setCheckboxValues((prev) => {
      const currentCategories = prev[resId] || [];
      const updatedCategories = currentCategories.includes(category)
        ? currentCategories.filter((cat) => cat !== category) // Убираем категорию, если была выбрана
        : [...currentCategories, category]; // Добавляем, если не была выбрана
      return { ...prev, [resId]: updatedCategories };
    });
  };

  // sinh + res /////////////////////////////////////////////////////////////////
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
          login: login,
          password: password,
          url: link,
        },
        config
      );

      if (response.status === 200) {
        let newElements = [];

        if (selectedCategories.length !== 0) {
          console.log("1");
          for (let i = 0; i < selectedCategories.length; i++) {
            response.data.forEach((element) => {
              console.log(arraysEqual(selectedCategories[i], element));
              if (arraysEqual(selectedCategories[i], element)) {
                newElements.push({ ...element, is_active: true });
              }
            });
          }
        } else {
          newElements = response.data.map((element) => ({
            ...element,
            is_active: true,
          }));

          console.log(newElements);
          selectedCategories.push(...newElements);
        }

        console.log(response.data);
        console.log(selectedCategories, " selected");
      }

      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Synchronization Error:", error);
    }
  };

  const handleCreateResource = async (e) => {
    e.preventDefault();

    const categories = selectedCategories.filter(
      (category) => category.is_active
    );

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
          language: resourceLanguage === "ru" ? "ru" : "en",
          name: name,
          image: "string",
          link: link,
          description: description,
          price_for_pub: Number(cost),
          login: login,
          password: password,

          categories: categories,

          user_id: id,

          // login: resourceLogin
        },
        config
      );

      console.log("Server Responseww:", response.data);
    } catch (error) {
      console.error("Create resurse Error:", error);
    }
  };

  const handleUpdateResource = async (e) => {
    e.preventDefault();

    const categories = selectedCategories.filter(
      (category) => category.is_active
    );

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const id = getDecode().id;

      console.log(activeRes);

      const response = await axios.put(
        `${URL}/resources/${activeRes.id}`,
        {
          language: resourceLanguage === "ru" ? "ru" : "en",
          name: activeRes.name,
          image: "string",
          link: activeRes.link,
          description: activeRes.description,
          price_for_pub: Number(activeRes.price_for_pub),
          login: activeRes.login,
          password: activeRes.password,

          categories: categories,

          user_id: id,
        },
        config
      );

      console.log("Server Responseww:", response.data);
    } catch (error) {
      console.error("Create resurse Error:", error);
    }
  };
  // FETCH RES + USEEFFECT
  async function fetchResurce() {
    try {
      // const receiveds = await getResurceUser();
      const receiveds = await getAllResurce();

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
  }, []);

  // funk
  function arraysEqual(a, b) {
    if (a.Link === b.Link) return false;
    return true;
  }

  async function handleActions(e) {
    e.stopPropagation();

    if (statusRes === "del") {
      const response = await deleteResource(activeRes.id);
      alert("Ресурс успешно удален!");
    }
    if (statusRes === "verify") {
      const response = await verifyResource(activeRes.id);
      if (response.detail === "Resource verified") {
        alert("Верефикация прошла успешно!");
      } else alert("something went wrong!");
    }
  }

  async function goToChat() {
    const response = await getResourceInfo(activeIndex);
    const user = response.user;
    console.log(response);
    navigate(`/chat/${response.user.id}`, { state: { user } });
  }

  return (
    <>
      <div className={styles.cont}>
        <div className={styles.left_side}>
          <div className={styles.category_sort}>
            <div className={styles.category_sort_title}>
              <p>Категории</p>
            </div>
            <div className={styles.category_sort_line}></div>
            <div className={styles.category_sort_checkbox}>
              <div className={styles.checkbox_cnt}>
                <Checkbox
                  label="Все"
                  // isChecked={checkboxes.all}
                  // onChange={handleAllChange}
                />
                Все ресурсы
                <img src="/images/Resources/card_trash.svg" alt="delete icon" />
              </div>
              <div className={styles.checkbox_cnt}>
                <Checkbox
                  label="Все"
                  // isChecked={checkboxes.all}
                  // onChange={handleAllChange}
                />
                Мои ресурсы
              </div>
              <div className={styles.checkbox_cnt}>
                <Checkbox
                  label="Все"
                  // isChecked={checkboxes.all}
                  // onChange={handleAllChange}
                />
                Частные ресурсы
              </div>
              <div className={styles.checkbox_cnt}>
                <Checkbox
                  label="Все"
                  // isChecked={checkboxes.all}
                  // onChange={handleAllChange}
                />
                На модерации
              </div>
            </div>
            <button className={styles.sort_btn}>Применить</button>
          </div>
          <div className={styles.category_select}>
            <div className={styles.category_sort_title}>
              <p>Категории</p>
            </div>
            <div className={styles.category_sort_line}></div>
            <div className={styles.category_sort_checkbox}>
              <div className={styles.checkbox_cnt}>
                <Checkbox
                  label="Все"
                  // isChecked={checkboxes.all}
                  // onChange={handleAllChange}
                />
                Все ресурсы
                <img src="/images/Resources/card_trash.svg" alt="delete icon" />
              </div>
              <div className={styles.checkbox_cnt}>
                <Checkbox
                  label="Все"
                  // isChecked={checkboxes.all}
                  // onChange={handleAllChange}
                />
                Мои ресурсы
              </div>
              <div className={styles.checkbox_cnt}>
                <Checkbox
                  label="Все"
                  // isChecked={checkboxes.all}
                  // onChange={handleAllChange}
                />
                Частные ресурсы
              </div>
              <div className={styles.checkbox_cnt}>
                <Checkbox
                  label="Все"
                  // isChecked={checkboxes.all}
                  // onChange={handleAllChange}
                />
                На модерации
              </div>
            </div>
            <button className={styles.sort_btn}>Применить</button>
          </div>
          <button
            className={styles.back}
            onClick={() => {
              setRightStatus("0");
            }}
          >
            Назад
          </button>
        </div>
        {rightStatus === "edit" ? (
          <div className={styles.right_side}>
            <div className={styles.category_sort_title}>
              <p>Редактировать ресурс</p>
              <img src="/images/Resources/plus.svg" alt="plus icon" />
            </div>
            <div className={styles.category_select_line}></div>

            <div className={styles.set_language_catalog}>
              <p className={styles.language_p}>Выбор языка</p>
              <div className={styles.language_cnt}>
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
            </div>

            <div className={styles.select_cont}>
              <div className={styles.select_left_side}>
                <input
                  className={styles.input_small}
                  placeholder="Название"
                  value={activeRes.name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setAcitveRes((prev) => ({ ...prev, name: e.target.value }));
                  }}
                />
                <input
                  className={styles.input_small}
                  placeholder="Ссылка"
                  value={activeRes.link}
                  onChange={(e) => {
                    setLink(e.target.value);
                    setAcitveRes((prev) => ({ ...prev, link: e.target.value }));
                  }}
                />
                <textarea
                  className={styles.input_description}
                  placeholder="Описание"
                  value={activeRes.description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setAcitveRes((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }}
                />
                <Dropdown
                  setSelectedCategories={setSelectedCategorues}
                  categories={selectedCategories}
                ></Dropdown>
              </div>
              <div className={styles.select_right_side}>
                <input
                  className={styles.input_small}
                  placeholder="Стоимость публикации"
                  value={activeRes.price_for_pub}
                  onChange={(e) => {
                    setCost(e.target.value);
                    setAcitveRes((prev) => ({
                      ...prev,
                      price_for_pub: e.target.value,
                    }));
                  }}
                />
                <input
                  className={styles.input_small}
                  placeholder="Токен"
                  value={activeRes.token}
                  onChange={(e) => {
                    setToken(e.target.value);
                    setAcitveRes((prev) => ({
                      ...prev,
                      token: e.target.value,
                    }));
                  }}
                />
                <input
                  className={styles.input_small}
                  placeholder="Логин"
                  value={activeRes.login}
                  onChange={(e) => {
                    setLogin(e.target.value);
                    setAcitveRes((prev) => ({
                      ...prev,
                      login: e.target.value,
                    }));
                  }}
                />
                <input
                  className={styles.input_small}
                  placeholder="Пароль"
                  value={activeRes.password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setAcitveRes((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                />
                <button
                  className={styles.sinh_btn}
                  onClick={(e) => handleSynchronization(e)}
                >
                  Синхронизировать
                </button>
                <button
                  className={styles.add_btn}
                  onClick={(e) => {
                    console.log(selectedCategories);
                    handleUpdateResource(e);
                  }}
                >
                  Добавить ресурс
                </button>
              </div>
            </div>
          </div>
        ) : null}
        {rightStatus === "0" ? (
          <div className={styles.catalog_cnt}>
            <div className={styles.catalog}>
              <div className={styles.catalog_title}>
                <h1>Частные ресурсы</h1>
                <input
                  className={styles.search_input}
                  placeholder="Поиск"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <div className={styles.card_info}>
                <p className={styles.card_name_title}>Название</p>
                <p className={styles.card_category_title}>Категории</p>
                <p className={styles.card_language_title}>Язык</p>
                <p className={styles.card_link_title}>Ссылка</p>
                <p className={styles.card_price_title}>Стоимость</p>
                <p className={styles.card_data_title}>Статус</p>
              </div>
              <div className={styles.cards}>
                {received.length > 0 ? (
                  received.map((res, index) => (
                    <div
                      key={index}
                      className={`${styles.card} ${
                        activeIndex === index ? styles.active : ""
                      }`}
                      onClick={() => {
                        setActiveIndex(index);
                        setAcitveRes(res);
                        if (index === activeIndex) {
                          setActiveIndex(-1);
                        }
                      }}
                    >
                      <div className={styles.res_info}>
                        <p className={styles.card_name}>{res.name}</p>
                        <p className={styles.card_category}>
                          {res.categories[0]}
                        </p>
                        <div className={styles.card_language}>
                          {res.language === "ru" ? (
                            <img
                              src="/images/Resources/ru_flag.svg"
                              alt="Russian flag"
                              className={styles.flag_res}
                            />
                          ) : (
                            <img
                              src="/images/Resources/en_flag.svg"
                              alt="English flag"
                              className={styles.flag_res}
                            />
                          )}
                        </div>

                        <a
                          href={res.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.card_link}
                        >
                          <img
                            src="/images/Resources/link_ico.svg"
                            alt="link icon"
                          />
                        </a>

                        <p className={styles.card_price}>
                          $ {res.price_for_pub}.00
                        </p>
                        {res.status === "in process" ? (
                          <img
                            className={styles.status_img}
                            src="/images/Resources/status_3.svg"
                            alt="status icon"
                          />
                        ) : res.status === "good" ? (
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
                      </div>
                      <div
                        className={`${styles.res_other} ${
                          activeIndex === index ? styles.active : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <div className={styles.res_line}></div>
                        <div className={styles.change_info}>
                          <div className={styles.dolya_dohod_cnt}>
                            <p>Настроить долю дохода</p>
                            <input
                              className={styles.slider_info}
                              type="text"
                              value={(sliderValues[res.id] || 0) + " %"}
                              onChange={(e) => {
                                const newValue = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                ); // Убираем все символы, кроме цифр
                                handleSliderChange(res.id, Number(newValue));
                              }}
                            />

                            <SliderInput
                              value={sliderValues[res.id] || 0} // Значение по умолчанию 0
                              onChange={(newValue) =>
                                handleSliderChange(res.id, newValue)
                              }
                            />
                          </div>
                          <div className={styles.dolya_dohod_cnt}>
                            <p>Рекомендовать цену 1 публикации</p>
                            <input
                              className={styles.slider_info}
                              type="text"
                              value={`$${
                                sliderValues_2[res.id] !== undefined
                                  ? sliderValues_2[res.id]
                                  : res.price_for_pub
                              }`}
                              onChange={(e) => {
                                const newValue = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                ); // Убираем все символы, кроме цифр
                                handleSliderChange_2(res.id, Number(newValue));
                              }}
                            />

                            <SliderInput
                              value={sliderValues_2[res.id] || 0} // Значение по умолчанию 0
                              onChange={(newValue) =>
                                handleSliderChange_2(res.id, newValue)
                              }
                              max={1500}
                            />
                          </div>
                          <div className={styles.select_res_category}>
                            <p>Добавить категорию</p>
                            {res.categories.map((cat, catIndex) => (
                              <div
                                key={catIndex}
                                className={styles.checkbox_cnt}
                              >
                                <Checkbox
                                  label={cat}
                                  isChecked={
                                    checkboxValues[res.id]?.includes(cat) ||
                                    false
                                  }
                                  onChange={() => {
                                    handleCheckboxChange(res.id, cat);
                                    console.log(checkboxValues);
                                  }}
                                />
                                {cat}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className={styles.res_line}></div>
                        <div className={styles.card_actions}>
                          <div className={styles.actions_cnt}>
                            <p>Действия:</p>
                            <div className={styles.actions_ico}>
                              <img
                                className={styles.actions_chat}
                                src="\images\admin\action_1.svg"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goToChat();
                                }}
                              ></img>
                              <img
                                className={styles.actions_new_res}
                                src="\images\admin\action_2.svg"
                              ></img>
                              <img
                                className={styles.actions_check}
                                src="\images\admin\action_3.svg"
                              ></img>
                              <img
                                className={styles.actions_edit}
                                src="\images\admin\action_4.svg"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRightStatus("edit");
                                }}
                              ></img>
                              <img
                                className={styles.actions_cancel}
                                src="\images\admin\action_5.svg"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setStatusRes("del");
                                }}
                              ></img>
                              <img
                                className={styles.actions_confirm}
                                src="\images\admin\action_6.svg"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setStatusRes("verify");
                                }}
                              ></img>
                              <img
                                className={styles.actions_delite}
                                src="\images\admin\action_7.svg"
                              ></img>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>
        ) : null}
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
                ресурс <span style={{ color: "green" }}>{activeRes.name}?</span>
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
                  // handleDoSomething();
                  handleActions(e);
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

      {statusRes === "verify" ? (
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
            <h1>Верификация ресурса</h1>
            <div className={styles.confirm_line}></div>
            <div className={styles.confirm_content}>
              <p>
                Вы уверены, что хотите{" "}
                <span style={{ color: "green" }}>верефицировать </span>
                ресурс <span style={{ color: "green" }}>{activeRes.name}?</span>
                <br></br>
                {/* <span style={{ color: "yellow" }}>
                  После верификация произойдет снятие ресурса со всех публикаций.
                </span> */}
              </p>
            </div>
            <div className={styles.confirm_btn}>
              <button
                className={styles.yes_btn}
                onClick={(e) => {
                  e.stopPropagation();
                  // handleDoSomething();
                  handleActions(e);
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
    </>
  );
}
