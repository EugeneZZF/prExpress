import React, { useState } from "react";
import styles from "./Settings.module.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getDecode } from "../../components/services";

export default function Settings() {
  const [address, setAddress] = useState("");
  const [token, setToken] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [profilePassword, setProfilePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const URL = "https://prexpress.io";

  // const isWalletFormValid = address && token && login && password;
  // const isProfileFormValid =
  //   name && phone && email && profilePassword && confirmPassword;

  const navigate = useNavigate();
  const validateInputs = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email.";
    if (!profilePassword || profilePassword.length < 6)
      newErrors.password = "Password 6 characters.";
    if (profilePassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords!=";
    return newErrors;
  };

  const accesstoken = Cookies.get("token");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const inputErrors = validateInputs();
    console.log(accesstoken);

    if (Object.keys(inputErrors).length === 0) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${accesstoken}`, // Добавление токена в заголовки
          },
        };

        const response = await axios.post(
          "http://api.prexpress.pro/Client/UpdateProfile",
          {
            name,
            phone,
            email,
            password,
          },
          config
        );

        console.log("Server Response:", response.data);

        if (response.data.status) {
        }
      } catch (error) {
        console.error("Registration Error:", error);
      }
    } else {
      setErrors(inputErrors);
    }
  };

  const handleRemoveProfile = async (e) => {
    e.preventDefault();
    const inputErrors = validateInputs();

    console.log("Зашел в функцию удаления профиля.");

    if (Object.keys(inputErrors).length === 0) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${accesstoken}`, // Добавление токена
          },
        };
        const user_id = getDecode().id;
        const response = await axios.delete(`${URL}/users/${user_id}`, config);

        console.log("Server Response:", response);

        if (response.data.status) {
          console.log("Profile successfully removed!");
          console.log(response);
        }
      } catch (error) {
        console.error("Remove Profile Error:", error);

        // Обработка конкретной ошибки
        if (error.response) {
          if (error.response.status === 401) {
            console.error("Unauthorized: токен недействителен или истек.");
          } else if (error.response.status === 404) {
            console.error("User not found: профиль не существует.");
          }
        }
      }
    } else {
      console.error("Validation errors:", inputErrors);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    const inputErrors = validateInputs();

    console.log("Зашел в функцию обновления профиля.");

    if (Object.keys(inputErrors).length === 0) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${accesstoken}`, // Добавление токена
          },
        };
        const user_id = getDecode();
        const response = await axios.put(
          `${URL}/users/${user_id.id}`,
          {
            name: name,
            phone_number: phone,
            role: user_id.role,
          },
          config
        );

        console.log("Server Response:", response);

        if (response.data.status) {
          console.log("Profile successfully updated!");
          console.log(response);
        }
      } catch (error) {
        console.error("Update Profile Error:", error);

        // Обработка конкретных ошибок
        if (error.response) {
          if (error.response.status === 401) {
            console.error("Unauthorized: токен недействителен или истек.");
          } else if (error.response.status === 400) {
            console.error("Bad Request: некорректные данные.");
          }
        }
      }
    } else {
      console.error("Validation errors:", inputErrors);
    }
  };

  const user_wallet = {
    name: "name",
    currency: "USDT",
    token: "token",
    address: "addddddreeeeesss",
  };
  const handleUpdateWallet = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const user_id = getDecode().id;

      const response = await axios.post(
        `${URL}/wallets/`,
        {
          name: user_wallet.name,
          currency: user_wallet.currency,
          token: user_wallet.token,
          address: user_wallet.address,
          user_id: user_id,
        },
        config
      );
      console.log("Server Response:", response);

      if (response.data.status) {
        console.log("Wallet create successfully!");
        console.log(response);
      }
    } catch (error) {
      console.error("Create Wallet Error:", error);

      if (error.response && error.response.status === 401) {
        console.error("Unauthorized");
      }
    }
  };

  return (
    <div className={styles.cont_settings}>
      <div className={styles.new_wallet_cont}>
        <div className={styles.wallet_content}>
          <div className={styles.wallet_first_line}>
            <h1 className={styles.wallet_h1}>Новый кошелёк</h1>
            <img
              className={styles.wallet_plus}
              src="\images\settings\plus.svg"
            ></img>
          </div>
          <div className={styles.wallet_line}></div>
          <form className={styles.wallet_form} onSubmit={handleUpdateWallet}>
            <div className={styles.form_group}>
              <input
                type="text"
                id="wallet"
                placeholder="USDT TRC-20"
                className={styles.input_field}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className={styles.form_group}>
              <img
                className={styles.info_token}
                src="\images\settings\info_token.svg"
              ></img>
              <label className={styles.wallet_lable} htmlFor="token">
                Токен
              </label>
              <input
                type="text"
                id="token"
                placeholder="Такой-то"
                className={styles.input_field}
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>
            <div className={styles.form_group}>
              <label className={styles.wallet_lable} htmlFor="login">
                Логин
              </label>
              <input
                type="text"
                id="login"
                placeholder="Login"
                className={styles.input_field}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div className={styles.form_group}>
              <label className={styles.wallet_lable} htmlFor="password">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className={styles.input_field}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className={styles.submit_button}>
              Добавить кошелёк
            </button>
          </form>
        </div>
      </div>
      <div className={styles.right_side_settings}>
        <div className={styles.profile_cont}>
          <div className={styles.profile_content}>
            <div className={styles.profile_first_line}>
              <h1 className={styles.profile_h1}>Настройки профиля</h1>
              <img
                className={styles.profile_ico}
                src="\images\settings\settings_ico.svg"
              ></img>
            </div>
            <div className={styles.profile_line}></div>
            <form
              className={styles.profile_form}
              // onSubmit={handleUpdateProfile}
            >
              <img className={styles.edit_ico}></img>
              <div className={styles.input_cnt}>
                <input
                  className={styles.profile_input}
                  placeholder="Имя Фамилия"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <img
                  className={styles.profile_ico}
                  src="\images\settings\edit_new.svg"
                ></img>
              </div>
              <div className={styles.input_cnt}>
                <input
                  className={styles.profile_input}
                  placeholder="8 (888) 888 - 88 - 88"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <img
                  className={styles.profile_ico}
                  src="\images\settings\edit_ico.svg"
                ></img>
              </div>
              <div className={styles.input_cnt}>
                <input
                  className={styles.profile_input}
                  placeholder="Эл. почта"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <img
                  className={styles.profile_ico}
                  src="\images\settings\edit_ico.svg"
                ></img>
              </div>
              <div className={styles.input_cnt}>
                <input
                  className={styles.profile_input}
                  placeholder="Пароль"
                  type="password"
                  value={profilePassword}
                  onChange={(e) => setProfilePassword(e.target.value)}
                />
                <img
                  className={styles.profile_ico}
                  src="\images\settings\edit_ico.svg"
                ></img>
              </div>
              <div className={styles.input_cnt}>
                <input
                  className={styles.profile_input}
                  placeholder="Повторить пароль"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <img
                  className={styles.profile_ico}
                  src="\images\settings\edit_ico.svg"
                ></img>
              </div>
              <button
                className={styles.change_btn}
                onClick={(e) => updateProfile(e)}
                type="submit"
              >
                Изменить
              </button>
            </form>
          </div>
        </div>
        <div className={styles.delete_cont}>
          <button
            className={styles.exit_btn}
            onClick={() => {
              Cookies.remove("token");
              navigate("/");
              console.log("exit");
              console.log(Cookies.get("token"));
            }}
          >
            Выйти
          </button>
          <button
            className={styles.delete_btn}
            onClick={(e) => handleRemoveProfile(e)}
          >
            Удалить профиль
          </button>
        </div>
      </div>
    </div>
  );
}
