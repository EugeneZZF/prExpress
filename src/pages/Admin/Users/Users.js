import React, { useState, useEffect } from "react";
import styles from "./Users.module.css";
import {
  deleteUser,
  getAmount,
  getDecode,
  getUserInfo,
  getUsers,
  updateProfile,
} from "../../../components/services";
import { useNavigate } from "react-router-dom";
import DropdownButton from "../../../components/elements/DropDownButton";
import { handleCreateId } from "../../Catalog/MainsServices";

export default function Users() {
  const [selectedOption, setSelectedOption] = useState("Опция 1");

  const options = ["Показать всё", "Статус", "Язык", "Ждет модерации"];

  const [selectedRole, setSelectedRole] = useState("nothing");
  const optionsRole = ["user", "admin", "premium"];

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [statusConfirm, setStatusConfirm] = useState("0");

  const [amountUser, setAmount] = useState(12);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleDoSomething = async () => {
    if (statusConfirm === "del") {
      const response = await deleteUser(selectedUser.id);
      if (response === 204) {
        alert("user deleted!");
        setConfirmOpen(false);
      }
    }
    if (statusConfirm === "edit") {
      const response = await updateProfile(
        selectedUser.name,
        selectedUser.phone_number,
        selectedRole,
        selectedUser.id
      );
      if (response === 204) {
        alert("user deleted!");
        setConfirmOpen(false);
      }
    }
  };

  const fetchUsers = async (pageNum) => {
    const userInfo = getDecode();

    if (userInfo.role !== "user") {
      navigate("/");
      return;
    }

    try {
      const newAmount = await getAmount();
      const newUsers = await getUsers(pageNum, 10);

      setAmount(newAmount);

      if (newUsers && newUsers.length > 0) {
        setUsers((prevUsers) => {
          const uniqueUsers = newUsers.filter(
            (newUser) => !prevUsers.some((user) => user.id === newUser.id)
          );
          return [...prevUsers, ...uniqueUsers];
        });
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Ошибка при получении пользователей:", error);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);
  const loadMoreUsers = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchUsers(nextPage);
      return nextPage;
    });
  };

  const sortedUsers = () => {
    switch (selectedOption) {
      case "Статус":
        return [...users].sort(
          (a, b) => Number(b.is_active) - Number(a.is_active)
        );
      case "Язык":
        return [...users].sort((a, b) => a.language.localeCompare(b.language));
      case "Ждет модерации":
        return [...users].sort(
          (a, b) => b.waiting_moderation - a.waiting_moderation
        );
      default:
        return users;
    }
  };

  return (
    <>
      <div className={styles.cont}>
        <div className={styles.user_list}>
          <div className={styles.user_header}>
            <div className={styles.user_header_info}>
              <div className={styles.user_header_info_1}>
                <p>Пользователи</p>
                <div className={styles.colvo_users}>{amountUser}</div>
              </div>
              <div className={styles.user_header_info_2}>
                <p>Сортировать по:</p>
                <div className={styles.show_all}>
                  <DropdownButton
                    selectedOption={selectedOption}
                    options={options}
                    onSelect={setSelectedOption}
                  />
                </div>
              </div>
            </div>
            <div className={styles.user_header_heading}>
              <p className={styles.heading_1}>ID</p>
              <p className={styles.heading_2}>Имя Фамилия</p>
              <p className={styles.heading_3}>Эл. почта</p>
              <p className={styles.heading_4}>Язык</p>
              <p className={styles.heading_5}>Статус</p>
              <p className={styles.heading_6}>Премиум</p>
              <p className={styles.heading_7}>Ждет модерации</p>
              <p className={styles.heading_8}>Действия</p>
            </div>
          </div>
          <div className={styles.users}>
            <div className={styles.user_container}>
              {users.length !== 0 ? (
                <div>
                  {sortedUsers().map((user) => (
                    <div key={user.id}>
                      <div className={styles.user_line}></div>
                      <div className={styles.user_info}>
                        <div className={styles.user_id}>{user.id}</div>
                        <p className={styles.user_name}>{user.name}</p>
                        <p className={styles.user_email}>{user.email}</p>
                        <div className={styles.user_language_cont}>
                          {user.language === "ru" ? (
                            <img
                              className={styles.user_language}
                              src="/images/admin/ru_flag.svg"
                              alt="Язык пользователя"
                            />
                          ) : (
                            <img
                              className={styles.user_language}
                              src="\images\Resources\en_flag.svg"
                              alt="Язык пользователя"
                            />
                          )}
                        </div>
                        <p className={styles.user_status}>{"Не в сети"}</p>
                        <div className={styles.user_prem_cont}>
                          <img
                            className={styles.user_prem_1}
                            src="/images/admin/prem_1.svg"
                            alt="Премиум статус"
                          />
                        </div>
                        <p className={styles.user_wait}>
                          {user.waiting_moderation}
                        </p>
                        <div className={styles.buttons_cnt}>
                          <img
                            className={styles.but_chat}
                            src="/images/admin/but_1.svg"
                            alt="Чат"
                          />
                          <img
                            className={styles.but_post}
                            src="/images/admin/but_2.svg"
                            alt="Пост"
                          />
                          <img
                            className={styles.but_edit}
                            src="/images/admin/but_3.svg"
                            alt="Редактировать"
                            onClick={() => {
                              setSelectedUser(user);
                              setConfirmOpen(true);
                              setStatusConfirm("edit");

                              console.log(selectedUser);
                            }}
                          />
                          <img
                            className={styles.but_block}
                            src="/images/admin/but_4.svg"
                            alt="Заблокировать "
                            onClick={() => {
                              setSelectedUser(user);
                              setConfirmOpen(true);
                              setStatusConfirm("block");

                              console.log(selectedUser);
                            }}
                          />
                          <img
                            className={styles.but_delete}
                            src="/images/admin/but_5.svg"
                            alt="Удалить"
                            onClick={() => {
                              setSelectedUser(user);
                              setConfirmOpen(true);
                              setStatusConfirm("del");

                              console.log(selectedUser);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {confirmOpen ? (
        <div
          className={styles.confirm_cnt}
          onClick={() => {
            setConfirmOpen(false);
          }}
        >
          {statusConfirm === "del" ? (
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
                  пользователя {selectedUser.name}{" "}
                  <span style={{ color: "green" }}>Id: {selectedUser.id}</span>
                </p>
              </div>
              <div className={styles.confirm_btn}>
                <button className={styles.yes_btn} onClick={handleDoSomething}>
                  Да
                </button>
                <button
                  className={styles.no_btn}
                  onClick={(event) => {
                    event.stopPropagation();
                    setConfirmOpen(false);
                  }}
                >
                  Нет
                </button>
              </div>
            </div>
          ) : null}

          {statusConfirm === "block" ? (
            <div
              className={styles.confirm}
              onClick={(event) => event.stopPropagation()}
            >
              <h1>Удаление аккаунта</h1>
              <div className={styles.confirm_line}></div>
              <div className={styles.confirm_content}>
                <p>
                  Вы уверены, что хотите{" "}
                  <span style={{ color: "red" }}>Заблокировать </span>
                  пользователя {selectedUser.name}{" "}
                  <span style={{ color: "green" }}>Id: {selectedUser.id}</span>
                  <br></br>
                  <span style={{ color: "red" }}>
                    снятие всех статьей с публикации
                  </span>
                  ?
                </p>
              </div>
              <div className={styles.confirm_btn}>
                <button className={styles.yes_btn} onClick={handleDoSomething}>
                  Да
                </button>
                <button
                  className={styles.no_btn}
                  onClick={(event) => {
                    event.stopPropagation();
                    setConfirmOpen(false);
                  }}
                >
                  Нет
                </button>
              </div>
            </div>
          ) : null}

          {statusConfirm === "edit" ? (
            <div
              className={styles.profile_cont}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.profile_content}>
                <h1 className={styles.profile_h1}>
                  Настройки профиля <br /> <br />
                  {selectedUser.email}{" "}
                  <span style={{ color: "green" }}>Id: {selectedUser.id}</span>
                </h1>
                <form className={styles.profile_form}>
                  <input
                    className={styles.profile_input}
                    placeholder="Имя Фамилия"
                    value={selectedUser.name}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, name: e.target.value })
                    }
                  />
                  <input
                    className={styles.profile_input}
                    placeholder="8 (888) 888 - 88 - 88"
                    value={selectedUser.phone_number || ""}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        phone_number: e.target.value,
                      })
                    }
                  />
                  <input
                    className={styles.profile_input}
                    placeholder="Эл. почта"
                    value={selectedUser.email}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        email: e.target.value,
                      })
                    }
                  />
                  <div className={styles.edit_role}>
                    <DropdownButton
                      selectedOption={selectedRole}
                      options={optionsRole}
                      onSelect={setSelectedRole}
                      onClick={(e) => e.stopPropagation()}
                    ></DropdownButton>
                  </div>
                  <button
                    className={styles.change_btn}
                    type="submit"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDoSomething();
                    }}
                  >
                    Изменить
                  </button>
                </form>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
