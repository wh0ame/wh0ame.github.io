import React, { useState } from 'react';
import SmallHeader from '../layouts/SmallHeader';

const rooms = [
  {
    title: "Пентхаус Utopia House",
    src: "/img/cards/01.jpg",
    description: [
      "Цена: 10 000 000 Р",
      "Бассейн: ☓",
      "Кол-во комнат: 5",
      "Обслуживание номера: ☓"
    ],
  },
  {
    title: "Апартаменты NiceLoft ",
    src: "/img/cards/02.jpg",
    description: [
      "Цена: 20 000 000 Р",
      "Бассейн: ☓",
      "Кол-во комнат: 6",
      "Обслуживание номера: ✓",
    ],
  },
  {
    title: "Апартаменты LoftStudio",
    src: "/img/cards/03.jpg",
    description: [
      "Цена: 30 000 000 Р",
      "Бассейн: ✓",
      "Кол-во комнат: 7",
      "Обслуживание номера: ☓",
    ],
  },
  {
    title: "Loft Квартира Престиж",
    src: "/img/cards/04.jpg",
    description: [
      "Цена: 40 000 000 Р",
      "Бассейн: ✓",
      "Кол-во комнат: 8",
      "Обслуживание номера: ✓"
    ],
  },
]

export default function Catalog(){

const roomsJsx = rooms.map((room, i) => {
  
  return (<CreateModal room={room} key={i} />);
});

return(
  <>
       <SmallHeader />
    <div className="container">
      <div className="apartments__title">
        <h2 className="title-2 text-center m-11">Наши квартиры</h2>
      </div>
      <div className="apartments__cards">
        {roomsJsx}
      </div>
    </div>
    <p className='p-10'></p>
    <footer className="footer">
                <div className="container">
                <div className="footer__grid">
                    <div className="footer__logo">
                    <a href="#!">
                        <img src="./img/logo.svg" alt="Utopia Estates" />
                    </a>
                    </div>
                    <div className="footer__nav">
                    <nav>
                        <ul className="footer__nav-list">
                        <li>
                            <a href="#!">О комплексе</a>
                        </li>
                        <li>
                            <a href="#!">Район</a>
                        </li>
                        <li>
                            <a href="#!">Каталог квартир</a>
                        </li>
                        <li>
                            <a href="#!">Ипотека</a>
                        </li>
                        <li>
                            <a href="#!">Контакты</a>
                        </li>
                        </ul>
                    </nav>
                    </div>
                    <div className="footer__nav">
                    <nav>
                        <ul className="footer__nav-list">
                        <li>
                            <a href="#!">Поселение и переезд</a>
                        </li>
                        <li>
                            <a href="#!">Сервисные услуги</a>
                        </li>
                        <li>
                            <a href="#!">Экологическая устойчивость</a>
                        </li>
                        <li>
                            <a href="#!">Инвестиционные возможности</a>
                        </li>
                        <li>
                            <a href="#!">Программа лояльности</a>
                        </li>
                        </ul>
                    </nav>
                    </div>
                    <div className="footer__address">
                    <ul className="footer__nav-list">
                        <li>Адрес: Наб. реки Фонтанки 10-15</li>
                        <li>
                        Телефон: <a href="tel:+78121234567">8 (812) 123-45-67</a>
                        </li>
                        <li>Отдел продаж: 10:00 - 20:00</li>
                        <li>
                        E-mail:{" "}
                        <a className="link-bold" href="mailto:vip@lofthouse.ru">
                            vip@lofthouse.ru
                        </a>
                        </li>
                    </ul>
                    <ul className="footer__socials">
                        <li>
                        <a href="#!">
                            <img src="./img/socials/youtube.svg" alt="" />
                        </a>
                        </li>
                        <li>
                        <a href="#!">
                            <img src="./img/socials/vk.svg" alt="" />
                        </a>
                        </li>
                        <li>
                        <a href="#!">
                            <img src="./img/socials/facebook.svg" alt="" />
                        </a>
                        </li>
                        <li>
                        <a href="#!">
                            <img src="./img/socials/instagram.svg" alt="" />
                        </a>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </footer>
  </>
);
}


function CreateModal({ room }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const descriptionJsx = room.description.map((desc, i) => (
    <p key={i}>{desc}</p>
  ));

  return (
    <>
      <div className="card" onClick={openModal}>
        <img className="card__img" src={room.src} alt={room.title} />
        <h3 className="card__title">{room.title}</h3>
      </div>
      {modalIsOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике внутри модального окна
          >
            <div className="modal-image">
              <img src={room.src} alt={room.title} />
            </div>
            <div className="modal-text">
              <h3>{room.title}</h3>
              {descriptionJsx}
              <button className="close-button" onClick={closeModal}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
