import { useState } from 'react';
import mouse from '../img/header/mouse.svg';
import logo from '../img/logo.svg';
import { Link } from 'react-router-dom'

function Header() {

  const [isMenu, setIsMenu] = useState(false);

  function menuClick(){
    setIsMenu(true);
  }

  function menuClose(e){
    if (e.target.id == "menu-modal") {
      setIsMenu(false);
    }
  }


    return (
        <header className="header none1">
        <div className="header__top">
          <div className="container">
            <div className="header__top-row">
              <a href="#">
                <img src={logo} alt="UtopiaEstates" />
              </a>
              <div className="header__nav">
                <nav className="nav">
                  <ul className="nav__list">
                    <li>
                      <Link to="/header">О комплексе</Link>
                    </li>
                    <li>
                      <a href="#map">Район</a>
                    </li>
                    <li>
                      <Link to="/catalog">Каталог квартир</Link>
                    </li>
                    <li>
                      <Link to="/ipoteka">Ипотека</Link>
                    </li>
                    <li>
                      <Link to="/contacts">Контакты</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="header__nav-btn" onClick={menuClick}>
                <button className="nav-icon-btn">
                  <div className="nav-icon" />
                </button>
              </div>
              {
                isMenu
                ? (
                  <div onClick={menuClose} id="menu-modal" className='top-0 left-0 fixed w-[100vw] h-[100vh] bg-white/50 flex flex-col gap-5 justify-center items-center text-black z-20'>
                    <li>
                      <Link to="/catalog">Каталог квартир</Link>
                    </li>
                    <li>
                      <Link to="/ipoteka">Ипотека</Link>
                    </li>
                    <li>
                      <Link to="/contacts">Контакты</Link>
                    </li>
                  </div>
                )
                : ''
              }
            </div>
          </div>
        </div>
        <div className="container">
          <h1 className="header__title">
            Жилой комплекс <br />в историческом центре
            <a href="#benefits">
              <img
                src={mouse}
                alt="Scroll next"
                className="header__title-icon"
              />
            </a>
          </h1>
        </div>
        <div className="header__footer">
          <div className="text-right">
            <a href="#section-map" className="info info--map">
              Наб. реки Фонтанки 10-15
            </a>
          </div>
          <a href="tel:+78121234567" className="info info--tel">
            8 (812) 123-45-67
          </a>
        </div>
      </header>
    );
}

export default Header;