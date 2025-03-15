import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Modal.module.css";
import Checkbox from "./Checkbox";
import axios from "axios";
import Cookies from "js-cookie";
//

export default function Modal({
  activeModal,
  setActiveModal,
  isLogin,
  setIsLogin,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState(null);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [responseRegistr, setResponsRegistr] = useState(null);

  // const socket = new WebSocket("wss://prexpress.io:8800");
  // socket.onopen = function (event) {
  //   console.log("Соединение установлено");
  //   socket.send("Привет, сервер!");
  // };
  // socket.onmessage = function (event) {
  //   console.log("Сообщение от сервера:", event.data);
  // };
  // socket.onerror = function (error) {
  //   console.error("Ошибка WebSocket:", error);
  // };

  const URL = "https://prexpress.io";
  // const URL = "localhost:8000";

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => setCountry(data.country))
      .catch((error) => console.error("Error fetching country data:", error));
  }, []);

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/register`, {
        // fullname: email,
        fullname: name,
        email: email,
        password: password,
        language: country === "RU" ? "ru" : "en",
      });
      console.log("Server Response:", response);
      if (response.status === 201) {
        // Cookies.remove("token");
        // Cookies.set("token", response.data.token, { expires: 7 });
        // navigate("/settings");

        handleLogin(e);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      if (error.status === 400) {
        alert("Username already registered");
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);

      const response = await axios.post(
        `${URL}/login`,
        {
          username: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("server Response:", response);
      if (response.status === 200) {
        Cookies.remove("token");
        Cookies.set("token", response.data.access_token, { expires: 7 });
        navigate("/settings");
      }
    } catch (error) {
      console.error("Login Error", error);
      if (error.response && error.response.status === 422) {
        alert("The email address or password was entered incorrectly!");
      }
    }
  };

  const togglePasswordVisibility = (setType) => {
    setType((prevState) => !prevState);
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email.";
    if (!password || password.length < 6)
      newErrors.password = "Password 6 characters.";
    if (!isLogin && password !== confirmPassword)
      newErrors.confirmPassword = "Passwords!=";
    return newErrors;
  };

  return (
    <div
      className={`${activeModal ? styles.active : ""} ${styles.modal}`}
      onClick={() => setActiveModal(false)}
    >
      {message && <div className={styles.message}>{message}</div>}
      {errors.form && <div className={styles.error}>{errors.form}</div>}
      {isLogin ? (
        <div
          className={styles.modal_content}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modal_content_cont}>
            <h1
              className={styles.modal_title}
              onClick={() => {
                console.log(country);
              }}
            >
              Вход
            </h1>
            <div className={styles.line}></div>
            <form className={styles.registrationForm} onSubmit={handleLogin}>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input_email}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Эл. почта"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* {errors.email && <div className={styles.error}>{errors.email}</div>} */}
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.passwordContainer}>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className={styles.togglePassword}
                    onClick={() => togglePasswordVisibility(setPasswordVisible)}
                  >
                    {passwordVisible ? (
                      <img
                        src="/images/main/show-password_1.svg"
                        alt="Показать пароль"
                      />
                    ) : (
                      <img
                        src="/images/main/show-password_2.svg"
                        alt="Показать пароль"
                      />
                    )}
                  </button>
                  {errors.password && (
                    <div className={styles.error}>{errors.password}</div>
                  )}
                </div>
              </div>
              <button className={styles.registration_btn} type="submit">
                Войти
              </button>
            </form>
            <p className={styles.forget_p}>Забыли пароль?</p>
            <div className={styles.forget_cont}>
              <Checkbox />
              <p className={styles.forget}>Запомнить меня на этом устройстве</p>
            </div>
            <div className={styles.queston_cont}>
              <p className={styles.queston_cont_p}>Нет учётной записи?</p>
              <button
                className={styles.already}
                onClick={() => setIsLogin(false)}
              >
                Регистрация
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={styles.modal_content}
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className={styles.modal_title}>Регистрация</h1>
          <div className={styles.line}></div>
          <form
            className={styles.registrationForm}
            onSubmit={handleRegistration}
          >
            <div className={styles.inputContainer}>
              <input
                className={styles.input_email}
                type="email"
                id="email"
                name="email"
                placeholder="Эл. почта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input
              className={styles.input_name}
              placeholder="Василий Васильевич"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className={styles.inputContainer}>
              <div className={styles.passwordContainer}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => togglePasswordVisibility(setPasswordVisible)}
                >
                  {passwordVisible ? (
                    <img
                      src="/images/main/show-password_1.svg"
                      alt="Показать пароль"
                    />
                  ) : (
                    <img
                      src="/images/main/show-password_2.svg"
                      alt="Показать пароль"
                    />
                  )}
                </button>
                {errors.password && (
                  <div className={styles.error}>{errors.password}</div>
                )}
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.passwordContainer}>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="Подтвердите пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() =>
                    togglePasswordVisibility(setConfirmPasswordVisible)
                  }
                >
                  {confirmPasswordVisible ? (
                    <img
                      src="/images/main/show-password_1.svg"
                      alt="Показать пароль"
                    />
                  ) : (
                    <img
                      src="/images/main/show-password_2.svg"
                      alt="Показать пароль"
                    />
                  )}
                </button>
                {errors.confirmPassword && (
                  <div className={styles.error}>{errors.confirmPassword}</div>
                )}
              </div>
            </div>
            <button className={styles.registration_btn} type="submit">
              Зарегистрироваться
            </button>
          </form>
          <div className={styles.queston_cont}>
            <p className={styles.queston_cont_p}>Уже зарегистрированы?</p>
            <button className={styles.already} onClick={() => setIsLogin(true)}>
              Войти
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
