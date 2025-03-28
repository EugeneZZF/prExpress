import React, { useEffect, useState } from "react";
import styles from "./Mypub.module.css";
import Checkbox from "../Landing/comp_landing/Checkbox";
import { getDecode, getPosts } from "../../components/services";
import { useNavigate } from "react-router-dom";

const allArchiveData = [
  {
    id: "008892",
    sum: "1250",
    title: "Подготовка к презентации продукта",
    date: "05.04.2020",
    time: "09:30:45",
    resources: ["presentationTeam", "fdds"],
    status_num: 3,
    status: "in-review",
  },
  {
    id: "008893",
    sum: "1500",
    title: "Маркетинговая кампания",
    date: "06.04.2020",
    time: "11:15:00",
    resources: ["marketingDept", "budgeting"],
    status_num: 1,
    status: "planned",
  },
  {
    id: "008894",
    sum: "1750",
    title: "Исследование рынка",
    date: "07.04.2020",
    time: "14:30:25",
    resources: ["researchTeam", "dataAnalysis"],
    status_num: 2,
    status: "in-progress",
  },
  {
    id: "008895",
    sum: "2000",
    title: "Разработка нового продукта",
    date: "08.04.2020",
    time: "09:45:10",
    resources: ["devTeam", "design"],
    status_num: 3,
    status: "in-review",
  },
  {
    id: "008896",
    sum: "1600",
    title: "Обучение сотрудников",
    date: "09.04.2020",
    time: "13:00:00",
    resources: ["hrDept", "trainingMaterials"],
    status_num: 1,
    status: "planned",
  },
  {
    id: "008897",
    sum: "1850",
    title: "Участие в конференции",
    date: "10.04.2020",
    time: "10:20:30",
    resources: ["eventTeam", "sponsorship"],
    status_num: 3,
    status: "in-review",
  },
  {
    id: "008898",
    sum: "1700",
    title: "Редизайн сайта",
    date: "11.04.2020",
    time: "15:40:45",
    resources: ["webTeam", "uxDesign"],
    status_num: 2,
    status: "in-progress",
  },
  {
    id: "008899",
    sum: "1550",
    title: "Внедрение CRM-системы",
    date: "12.04.2020",
    time: "16:50:20",
    resources: ["crmTeam", "itDept"],
    status_num: 1,
    status: "planned",
  },
  {
    id: "008900",
    sum: "1950",
    title: "Кампус прослушивания клиентов",
    date: "13.04.2020",
    time: "09:10:15",
    resources: ["customerService", "feedbackAnalysis"],
    status_num: 2,
    status: "in-progress",
  },
  {
    id: "008901",
    sum: "2050",
    title: "Модернизация оборудования",
    date: "14.04.2020",
    time: "11:22:35",
    resources: ["techDept", "procurement"],
    status_num: 3,
    status: "in-review",
  },
  {
    id: "008902",
    sum: "1650",
    title: "Социальные медиа-кампании",
    date: "15.04.2020",
    time: "13:37:50",
    resources: ["socialMediaTeam", "contentCreation"],
    status_num: 2,
    status: "in-progress",
  },
  {
    id: "008903",
    sum: "1800",
    title: "Оптимизация рабочих процессов",
    date: "16.04.2020",
    time: "12:45:00",
    resources: ["opsTeam", "efficiencyAnalysis"],
    status_num: 1,
    status: "planned",
  },
];

export default function Mypub() {
  const navigate = useNavigate();
  const [showCount, setShowCount] = useState(5);
  const [selected, setSelected] = useState(
    Array(allArchiveData.length).fill(false)
  );
  const [selectAll, setSelectAll] = useState(false);
  const [posts, setPosts] = useState([]);
  const [activePostIndex, setactivePostIndex] = useState("");
  const [activePost, setActivePost] = useState();

  const [exitStatus, setExitStatus] = useState("");

  const handleCheckboxChange = (index) => {
    const newSelected = [...selected];
    newSelected[index] = !newSelected[index];
    setSelected(newSelected);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelected(Array(posts.length).fill(newSelectAll));
  };

  const loadMore = () => {
    setShowCount((prevCount) => prevCount + 6);
  };

  const getCardStyle = (index) => {
    const isChecked = selected[index];
    const previousChecked = selected[index - 1];
    const nextChecked = selected[index + 1];

    if (isChecked && previousChecked && nextChecked) {
      return { borderRadius: "0px 0px 0px 0px", background: "#F9F9F9" };
    } else if (isChecked && previousChecked) {
      return { borderRadius: "0px 0px 20px 20px", background: "#F9F9F9" };
    } else if (isChecked && nextChecked) {
      return { borderRadius: "20px 20px 0px 0px", background: "#F9F9F9" };
    } else if (isChecked) {
      return { borderRadius: "20px 20px 20px 20px", background: "#F9F9F9" };
    }
    return {};
  };

  async function handleDoSomething() {
    if (exitStatus === "delete") {
      setExitStatus("");
      alert("пост удален");
    }
  }

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

  async function fetchPosts(user_id) {
    try {
      const receiveds = await getPosts(undefined, undefined, "", user_id);

      if (receiveds && Array.isArray(receiveds)) {
        setPosts(receiveds); // Используем массив items
      } else {
        console.warn("Expected an array but got:", receiveds);
        setPosts([]);
      }

      console.log(receiveds, "wall");
    } catch (error) {
      console.error("Failed to fetch wallets:", error);
    }
  }

  const handleNavigatePost = (postId) => {
    navigate(`/publication/postedit/${postId}`);
  };
  useEffect(() => {
    const user_id = getDecode().id;
    console.log(user_id);
    fetchPosts(user_id);
  }, []);

  return (
    <>
      <div className={styles.cont}>
        <div className={styles.archive}>
          <div className={styles.first_lint}>
            <h1 className={styles.first_line_h1}>Мои публикации</h1>
            <div className={styles.first_line_end_cont}>
              <div className={styles.checkbox_cont}>
                <Checkbox checked={selectAll} onChange={handleSelectAll} />{" "}
                Выбрать все
              </div>
              <div className={styles.inst}>
                <img
                  className={styles.inst_img}
                  src="\images\Mypub\inst.svg"
                  alt="instruction"
                />
              </div>
            </div>
          </div>
          <div className={styles.second_line_title}>
            <p className={styles.second_line_p_1}>Заголовок</p>
            <p className={styles.second_line_p_2}>Сумма</p>
            <p className={styles.second_line_p_3}>Дата / Время</p>
            <p className={styles.second_line_p_4}>Ресурсы</p>
            <p className={styles.second_line_p_5}>ID</p>
            <p className={styles.second_line_p_6}>Статус</p>
            <p className={styles.second_line_p_7}>Действие</p>
          </div>
          {posts
            .slice(0, Math.min(showCount, posts.length))
            .map((card, index) => (
              <div
                key={index}
                className={`${
                  activePostIndex === index
                    ? `${styles.card_cnt} ${styles.active}`
                    : `${styles.card_cnt}`
                }`}
              >
                <div className={styles.card} style={getCardStyle(index)}>
                  <div className={styles.checbox_cont_card}>
                    <Checkbox
                      checked={selected[index]}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </div>
                  <div className={styles.card_name_cnt}>
                    <p className={styles.card_name}>{card.name}</p>
                  </div>
                  <p className={styles.card_sum}>{card.price} $</p>
                  <div className={styles.card_data_cnt}>
                    <p className={styles.card_data}>{`${formatDateTime(
                      card.created_at
                    ).slice(0, 10)} / ${formatDateTime(card.created_at).slice(
                      11,
                      20
                    )}`}</p>
                  </div>
                  <p className={styles.card_res}>Ресурс 1</p>
                  <p className={styles.card_id}>№ {card.id}</p>
                  <div className={styles.status_cont}>
                    <img
                      className={styles.status_img}
                      src={`/images/Mypub/status_${
                        card.status === "published"
                          ? "1"
                          : card.status === "declined"
                          ? "2"
                          : "3"
                      }.svg`}
                      alt={`status`}
                    />
                    <img
                      className={`${
                        activePostIndex === index
                          ? `${styles.arraw_card} ${styles.active}`
                          : `${styles.arraw_card}`
                      }`}
                      src="\images\Layout\header_arrow.svg"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (activePostIndex === index) {
                          setactivePostIndex("");
                        } else {
                          setactivePostIndex(index);
                        }
                      }}
                    ></img>
                  </div>
                  <div className={styles.card_btn}>
                    <img
                      className={styles.actions_edit}
                      src="\images\admin\action_4.svg"
                      onClick={(e) => {
                        e.stopPropagation();

                        handleNavigatePost(card.id);
                      }}
                    ></img>
                    <img
                      className={styles.actions_new_res}
                      src="\images\admin\action_2.svg"
                    ></img>
                    <img
                      className={styles.actions_trash}
                      src="\images\admin\action_7.svg"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExitStatus("delete");
                        setActivePost(card);
                      }}
                    ></img>
                  </div>
                </div>
                <div
                  className={`${
                    activePostIndex === index
                      ? `${styles.card_bottom} ${styles.active}`
                      : `${styles.card_bottom}`
                  }`}
                >
                  <div className={styles.card_res_cnt}>
                    {card.resources.map((res, resIndex) => (
                      <p key={resIndex}>{res}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
        {showCount < posts.length && (
          <div className={styles.load_more} onClick={loadMore}>
            Показать еще
          </div>
        )}
      </div>
      {exitStatus === "delete" ? (
        <div
          className={styles.bgr_cnt}
          onClick={(e) => {
            e.stopPropagation();
            setExitStatus("");
          }}
        >
          <div className={styles.exit_cnt}>
            <h1>Выход</h1>
            <div className={styles.exit_line}></div>
            <div className={styles.exit_content}>
              <p>Вы уверены, что хотите удалить пост "{activePost.name}" ?</p>
              <div className={styles.exit_btn_cnt}>
                <div
                  className={styles.yes_btn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDoSomething();
                  }}
                >
                  Да
                </div>
                <div
                  className={styles.no_btn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setExitStatus("");
                  }}
                >
                  Нет
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
