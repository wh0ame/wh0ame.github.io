import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import SmallHeader from '../layouts/SmallHeader';
import ApartmentCard from './ApartmentCard';
import './Catalog.css';

const apartmentsData = [
  {
    id: 1,
    title: "Пентхаус Utopia House",
    image_url: "/img/cards/01.jpg",
    images: [
    "/img/cards/01.jpg",
    "/img/cards/1-01.jpg",
    "/img/cards/1-02.jpg"
    ],
    price: 10000000,
    has_pool: false,
    rooms: 5,
    has_service: false
  },
  {
    id: 2,
    title: "Апартаменты NiceLoft",
    image_url: "/img/cards/02.jpg",
    images: [
    "/img/cards/01.jpg",
    "/img/cards/2-01.jpg",
    "/img/cards/2-02.jpg"
    ],
    price: 20000000,
    has_pool: false,
    rooms: 6,
    has_service: true
  },
  {
    id: 3,
    title: "Апартаменты LoftStudio",
    image_url: "/img/cards/03.jpg", 
    images: [
    "/img/cards/01.jpg",
    "/img/cards/3-01.jpg",
    "/img/cards/3-02.jpg"
    ],
    price: 30000000,
    has_pool: true,
    rooms: 7,
    has_service: false
  },
  {
    id: 4,
    title: "Loft Квартира Престиж",
    image_url: "/img/cards/04.jpg",
    images: [
    "/img/cards/01.jpg",
    "/img/cards/4-01.jpg",
    "/img/cards/4-02.jpg"
    ],
    price: 40000000,
    has_pool: true,
    rooms: 8,
    has_service: true
  }
];

export default function Catalog() {
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [apartments, setApartments] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    fetchApartments();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserFavorites();
    }
  }, [user]);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  }

  async function fetchApartments() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('apartments')
        .select('*');
      
      if (error) throw error;
      setApartments(data || []);
    } catch (error) {
      console.error('Error fetching apartments:', error.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchUserFavorites() {
  try {
    const { data, error } = await supabase
      .from('user_favorites')  // Изменили название таблицы
      .select('apartment_id')
      .eq('user_id', user.id);
    
    if (!error && data) {
      setUserFavorites(data.map(item => item.apartment_id));
    }
  } catch (error) {
    console.error('Error fetching favorites:', error);
  }
}

  const handleToggleFavorite = useCallback(async (apartmentId) => {
  if (!user) {
    alert('Для добавления в избранное необходимо авторизоваться');
    return;
  }

  try {
    const isFavorite = userFavorites.includes(apartmentId);
    
    if (isFavorite) {
      const { error } = await supabase
        .from('user_favorites')  // Изменили название таблицы
        .delete()
        .eq('user_id', user.id)
        .eq('apartment_id', apartmentId);
      
      if (!error) {
        setUserFavorites(prev => prev.filter(id => id !== apartmentId));
      }
    } else {
      const { error } = await supabase
        .from('user_favorites')  // Изменили название таблицы
        .upsert({
          user_id: user.id,
          apartment_id: apartmentId
        });
      
      if (!error) {
        setUserFavorites(prev => [...prev, apartmentId]);
      }
    }
  } catch (error) {
    console.error('Error updating favorites:', error);
    alert(`Ошибка: ${error.message}`);
  }
}, [user, userFavorites]);


  if (loading) return <div>Loading apartments...</div>;

  return (
    <>
      <SmallHeader />
      <div className="container">
        <div className="apartments__title">
          <h2 className="title-2 text-center m-11">Наши квартиры</h2>
        </div>
        <div className="apartments__cards">
          {apartments.map(apartment => (
            <ApartmentCard
              key={apartment.id}
              apartment={apartment}
              isSelected={userFavorites.includes(apartment.id)}
              onSelect={(id) => handleToggleFavorite(id)}
              onDetailsClick={(apartment) => setSelectedApartment(apartment)}
            />
          ))}
        </div>
      </div>

      {selectedApartment && (
        <ApartmentModal
          apartment={selectedApartment}
          onClose={() => setSelectedApartment(null)}
          isSelected={userFavorites.includes(selectedApartment.id)}
          onSelect={() => handleToggleFavorite(selectedApartment.id)}
        />
      )}

      <Footer />
    </>
  );
}

function ApartmentModal({ apartment, onClose, isSelected, onSelect }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = apartment.images 
    ? [...apartment.images] 
    : apartment.image_url 
      ? [apartment.image_url] 
      : ["../public/img/cards/01.jpg"];

  const nextImage = (e) => {
    e.stopPropagation();
    console.log('Next image clicked', currentImageIndex);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    console.log('Prev image clicked', currentImageIndex);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={`modal-overlay ${apartment ? 'active' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#D4C17F" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        <div className="modal-grid">
          {/* Блок с каруселью */}
          <div className="modal-carousel">
            <div className="carousel-container">
              <img 
                src={images[currentImageIndex]} 
                alt={`${apartment.title} - фото ${currentImageIndex + 1}`} 
                className="carousel-image"
                onError={(e) => {
                  e.target.src = "/img/cards/01.jpg";
                }}
              />
              
              {images.length > 1 && (
                <>
                  <button className="carousel-button prev" onClick={prevImage}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <button className="carousel-button next" onClick={nextImage}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  
                  <div className="carousel-indicators">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Блок с информацией */}
          <div className="modal-info">
            <h2 className="modal-title">{apartment.title}</h2>
            <p className="modal-price">{apartment.price.toLocaleString('ru-RU')} ₽</p>
            
            <div className="modal-features">
              <div className="feature-item">
                <span className="feature-label">Комнат:</span>
                <span className="feature-value">{apartment.rooms}</span>
              </div>
              <div className="feature-item">
                <span className="feature-label">Бассейн:</span>
                <span className="feature-value">{apartment.has_pool ? '✓' : '✗'}</span>
              </div>
              <div className="feature-item">
                <span className="feature-label">Обслуживание:</span>
                <span className="feature-value">{apartment.has_service ? '✓' : '✗'}</span>
              </div>
            </div>
            
            <button
              className={`modal-favorite-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => {
                onSelect();
                if (!isSelected) onClose();
              }}
            >
              {isSelected ? 'Удалить из избранного' : 'Добавить в избранное'}
              <svg width="20" height="20" viewBox="0 0 20 20" fill={isSelected ? "#D4C17F" : "none"} xmlns="http://www.w3.org/2000/svg">
                <path d="M10 15L5 10L6.5 8.5L10 12L13.5 8.5L15 10L10 15Z" fill={isSelected ? "#D4C17F" : "white"}/>
                <path d="M10 5L15 10L13.5 11.5L10 8L6.5 11.5L5 10L10 5Z" fill={isSelected ? "#D4C17F" : "white"}/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
          <div className="footer__grid">
            <div className="footer__logo">
              <a href="#">
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
  );
}
