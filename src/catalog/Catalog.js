import React, { useState, useEffect, useCallback  } from 'react';
import { supabase } from '../supabaseClient';
import SmallHeader from '../layouts/SmallHeader';
import ApartmentCard from './ApartmentCard';
import './Catalog.css';

const apartmentsData = [
  {
    id: 1,
    title: "Пентхаус Utopia House",
    image_url: "/img/cards/01.jpg",
    price: 10000000,
    has_pool: false,
    rooms: 5,
    has_service: false
  },
  {
    id: 2,
    title: "Апартаменты NiceLoft",
    image_url: "/img/cards/02.jpg",
    price: 20000000,
    has_pool: false,
    rooms: 6,
    has_service: true
  },
  {
    id: 3,
    title: "Апартаменты LoftStudio",
    image_url: "/img/cards/03.jpg", 
    price: 30000000,
    has_pool: true,
    rooms: 7,
    has_service: false
  },
  {
    id: 4,
    title: "Loft Квартира Престиж",
    image_url: "/img/cards/04.jpg",
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
              onSelect={() => handleToggleFavorite(apartment.id)}
              onDetailsClick={() => setSelectedApartment(apartment)}
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
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-grid">
          <div className="modal-image">
            <img src={apartment.src} alt={apartment.title} />
          </div>
          
          <div className="modal-info">
            <h3>{apartment.title}</h3>
            <p className="modal-price">{apartment.price.toLocaleString()} ₽</p>
            
            <div className="modal-features">
              <p>Комнат: {apartment.rooms}</p>
              <p>Бассейн: {apartment.has_pool ? '✓' : '✗'}</p>
              <p>Обслуживание: {apartment.has_service ? '✓' : '✗'}</p>
            </div>
            
            <button
              className={`modal-select-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => {
                onSelect(apartment.id);
                onClose();
              }}
            >
              {isSelected ? 'Удалить из избранного' : 'Добавить в избранное'}
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