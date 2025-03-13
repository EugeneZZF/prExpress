import React from "react";
import Slider from "react-slick";
import styles from "./Foirth_block.module.css";
import { useState } from "react";
// import styles1 from "./Third_block.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const reviews = [
  {
    name: "Антон Кучер",
    text: "Как принято считать, действия представителей оппозиции являются только методом политического участия и объективно рассмотрены соответствующими инстанциями. А также явные признаки победы институционализации, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут подвергнуты целой серии независимых исследований",
  },
  {
    name: "Елизавета Кудрявцева",
    text: "Не следует, однако, забывать, что существующая теория играет определяющее значение для первоочередных требований. Современные технологии достигли такого уровня, что реализация намеченных плановых заданий предопределяет высокую востребованность глубокомысленных рассуждений",
  },
  {
    name: "Алексей Алексеев",
    text: "Господа, внедрение современных методик требует от нас анализа вывода текущих активов. Кстати, элементы политического процесса, превозмогая сложившуюся непростую экономическую ситуацию, описаны максимально подробно",
  },
];

const Review = ({ name, text }) => (
  <div className={styles.review}>
    <div className={styles.stars}>
      <img src="\images\main\stars2.svg" alt="star" className={styles.star} />
    </div>
    <h3>{name}</h3>
    <p>{text}</p>
  </div>
);

const Foirth_block = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: (
      <img src="right-arrow.png" alt="next" className={styles.arrow} />
    ),
    prevArrow: <img src="left-arrow.png" alt="prev" className={styles.arrow} />,
  };

  return (
    <div className={styles.container}>
      <div className={styles.sliderContainer}>
        <div className={styles.otz}>
          <p>ОТЗЫВЫ</p>
          <div className={styles.cont_p_otz}>НАШИХ</div>
          <p>КЛИЕНТОВ</p>
        </div>
        <Slider {...settings} className={styles.slickList}>
          {reviews.map((review, index) => (
            <Review key={index} {...review} />
          ))}
        </Slider>
      </div>
      <div className={styles.otz2}>
        <p>часто</p>
        <div className={styles.cont_p_otz}>задаваемые</div>
        <p>вопросы</p>
      </div>
      <div className={styles.accordion}>
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`${styles.accordionItem} ${
              index === 0 ? styles.top_accordionitem : ""
            }`}
          >
            <div
              className={`${styles.accordionTitle} ${
                activeIndex === index ? styles.active : ""
              }`}
              onClick={() => handleToggle(index)}
            >
              <h2>0{index + 1}</h2>
              <div className={styles.accordionItem_cont}>
                <span>
                  {index === 2
                    ? "Финансовый мир очнулся: высококачественный прототип будущего проекта определил дальнейшее развитие?"
                    : index === 3
                    ? "Финансовый мир очнулся: высококачественный прототип будущего проекта определил дальнейшее развитие?"
                    : index === 4
                    ? "Только сложившаяся структура организации процветает, как ни в чем не бывало?"
                    : "Как приобрести стартовый тариф и оплатить его?"}
                </span>
                <img
                  className={`${styles.accordion_arrow} ${
                    activeIndex === index ? styles.rotate : ""
                  }`}
                  src="/images/main/accord_arrow.svg"
                  alt="arrow"
                />
              </div>
            </div>
            <div
              className={`${styles.accordionContent} ${
                activeIndex === index ? styles.active : ""
              }`}
            >
              <div
                className={`${styles.accordionContent_line} ${
                  activeIndex === index ? styles.active : ""
                }`}
              ></div>
              <div className={styles.content_cont}>
                {index === 0
                  ? "Ознакомьтесь с нашими тарифами и выберите тот, который подходит именно вам"
                  : index === 1
                  ? "Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет оценить значение инновационных методов управления процессами. Наше дело не так однозначно, как может показаться: высококачественный прототип будущего проекта представляет собой интересный эксперимент проверки глубокомысленных рассуждений"
                  : "ContentContentContentContent"}
              </div>
              {index === 1 && (
                <img
                  className={`${styles.accordionContent_img} ${
                    activeIndex === index ? styles.active : ""
                  }`}
                  src="/images/main/smile.png"
                  alt="smile"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Foirth_block;
