import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/ProfilePage.css';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [favoriteApartments, setFavoriteApartments] = useState([]);
  const [loading, setLoading] = useState({
    profile: true,
    apartments: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: '',
    full_name: '',
    phone: ''
  });
  const navigate = useNavigate();

  // Получение данных пользователя
  const fetchUserData = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, profile: true }));
      
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        navigate('/auth');
        return;
      }

      setUser(user);

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') throw profileError;

      const profile = profileData || {
        id: user.id,
        username: user.email.split('@')[0],
        full_name: '',
        phone: ''
      };

      setProfile(profile);
      setEditData({
        username: profile.username,
        full_name: profile.full_name,
        phone: profile.phone
      });
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  }, [navigate]);

  // Получение избранных квартир
  const fetchFavoriteApartments = useCallback(async () => {
    if (!user?.id) return;

    try {
      setLoading(prev => ({ ...prev, apartments: true }));
      
      // 1. Получаем ID избранных квартир
      const { data: favorites, error: favError } = await supabase
        .from('user_favorites')
        .select('apartment_id')
        .eq('user_id', user.id);

      if (favError) throw favError;
      if (!favorites || favorites.length === 0) {
        setFavoriteApartments([]);
        return;
      }

      // 2. Получаем полные данные квартир
      const { data: apartments, error: aptError } = await supabase
        .from('apartments')
        .select('*')
        .in('id', favorites.map(f => f.apartment_id));

      if (aptError) throw aptError;
      
      setFavoriteApartments(apartments || []);
    } catch (error) {
      console.error('Ошибка загрузки избранных квартир:', error);
    } finally {
      setLoading(prev => ({ ...prev, apartments: false }));
    }
  }, [user]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (user) {
      fetchFavoriteApartments();
    }
  }, [user, fetchFavoriteApartments]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(prev => ({ ...prev, profile: true }));
      
      const updates = {
        ...editData,
        id: user.id,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('profiles')
        .upsert(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      setProfile(data);
      setIsEditing(false);
      alert('Данные успешно сохранены!');
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert(`Ошибка: ${error.message}`);
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const toggleFavorite = async (apartmentId) => {
    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('apartment_id', apartmentId);
      
      if (error) throw error;
      
      setFavoriteApartments(prev => 
        prev.filter(apartment => apartment.id !== apartmentId)
      );
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  if (loading.profile) {
    return <div className="loading">Загрузка профиля...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <Link to="/" className="home-link">← На главную</Link>
        <h2>Мой профиль</h2>
        <button onClick={signOut} className="logout-button">
          Выйти
        </button>
      </div>
      
      <div className="profile-section">
        <div className="section-header">
          <h3>Личные данные</h3>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)} 
              className="edit-button"
            >
              Редактировать
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(false)} 
              className="cancel-button"
            >
              Отмена
            </button>
          )}
        </div>
        
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="edit-form">
            <div className="form-group">
              <label>Имя пользователя:</label>
              <input
                type="text"
                name="username"
                value={editData.username}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Полное имя:</label>
              <input
                type="text"
                name="full_name"
                value={editData.full_name}
                onChange={handleEditChange}
              />
            </div>
            <div className="form-group">
              <label>Телефон:</label>
              <input
                type="tel"
                name="phone"
                value={editData.phone}
                onChange={handleEditChange}
                pattern="[0-9]{10,15}"
                title="Номер телефона (10-15 цифр)"
              />
            </div>
            <button type="submit" className="save-button">
              Сохранить
            </button>
          </form>
        ) : (
          <div className="profile-info">
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Имя пользователя:</strong> {profile?.username || 'Не указано'}</p>
            <p><strong>Полное имя:</strong> {profile?.full_name || 'Не указано'}</p>
            <p><strong>Телефон:</strong> {profile?.phone || 'Не указано'}</p>
          </div>
        )}
      </div>
      
      <div className="apartments-section">
        <h3>Мои квартиры</h3>
        {loading.apartments ? (
          <div className="loading">Загрузка списка квартир...</div>
        ) : favoriteApartments.length === 0 ? (
          <p className="no-apartments">Вы пока не добавили квартиры в избранное</p>
        ) : (
          <div className="apartments-grid">
            {favoriteApartments.map(apartment => (
              <div key={apartment.id} className="apartment-card">
                <img 
                  src={apartment.src || '/default-apartment.jpg'} 
                  alt={apartment.title}
                  className="apartment-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-apartment.jpg';
                  }}
                />
                <div className="apartment-info">
                  <h4>{apartment.title}</h4>
                  <p className="price">{apartment.price.toLocaleString()} ₽</p>
                  <div className="apartment-features">
                    <span>Комнат: {apartment.rooms}</span>
                    <span>Бассейн: {apartment.has_pool ? '✓' : '✗'}</span>
                    <span>Обслуживание: {apartment.has_service ? '✓' : '✗'}</span>
                  </div>
                </div>
                <button 
                  onClick={() => toggleFavorite(apartment.id)}
                  className="favorite-button active"
                >
                  ★ Удалить из избранного
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;