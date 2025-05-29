import { useEffect, useState, useRef } from 'react';
import mouse from '../img/header/mouse.svg';
import logo from '../img/logo.svg';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { NavLink } from 'react-router-dom';

function Header() {
  const [user, setUser] = useState(null);
  const [isMenu, setIsMenu] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    // Автовоспроизведение видео
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented, trying with muted");
        videoRef.current.muted = true;
        videoRef.current.play();
      });
    }

    return () => subscription?.unsubscribe();
  }, []);

  function menuClick() {
    setIsMenu(true);
  }

  function menuClose(e) {
    if (e.target.id === "menu-modal") {
      setIsMenu(false);
    }
  }

  return (
    <header className="header-video none1">
      {/* Фоновое видео */}
      <div className="video-background">
        <video 
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="video-bg"
        >
          <source src="../videos/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>
      
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
                    <Link to="/">О комплексе</Link>
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
                  <li>
                    <Link to="/profile">Профиль</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="header__nav-btn" onClick={menuClick}>
              <button className="nav-icon-btn">
                <div className="nav-icon" />
              </button>
            </div>
            {isMenu && (
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
            )}
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
            <img src="/img/header/map.svg" alt="Адрес" className="contact-icon" />
            Наб. реки Фонтанки 10-15
          </a>
        </div>
        <a href="tel:+78121234567" className="info info--tel">
          <img src="/img/header/phone.svg" alt="Телефон" className="contact-icon" />
          8 (812) 123-45-67
        </a>
      </div>
    </header>
  );
}

export default Header;