import React from 'react';

export default function ApartmentCard({ apartment, isSelected, onSelect, onDetailsClick }) {
  const handleDetailsClick = (e) => {
    e.stopPropagation();
    console.log('Details clicked:', apartment.id);
    onDetailsClick(apartment);
  };

  const handleSelectClick = async (e) => {
    e.stopPropagation();
    console.log('Favorite button clicked:', apartment.id);
    try {
      await onSelect(apartment.id);
    } catch (error) {
      console.error('Error handling favorite:', error);
    }
  };

  return (
    <div className={`card ${isSelected ? 'selected' : ''}`}>
      {isSelected && <div className="favorite-badge">★</div>}
      <img 
        className="card__img" 
        src={apartment.src || '/default-apartment.jpg'} 
        alt={apartment.title}
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = '/default-apartment.jpg';
        }}
        onClick={handleDetailsClick}
      />
      <div className="card__content">
        <h3 className="card__title">{apartment.title}</h3>
        <p className="card__price">{apartment.price.toLocaleString()} ₽</p>
        
        <div className="card__features">
          <span className="card__feature">Комнат: {apartment.rooms}</span>
          <span className="card__feature">Бассейн: {apartment.has_pool ? '✓' : '✗'}</span>
          <span className="card__feature">Обслуживание: {apartment.has_service ? '✓' : '✗'}</span>
        </div>
        
        <div className="card__actions">
          <button 
            className="btn-details"
            onClick={handleDetailsClick}
          >
            Подробнее
          </button>
          <button
            className={`btn-select ${isSelected ? 'selected' : ''}`}
            onClick={handleSelectClick}
          >
            {isSelected ? 'В избранном' : 'В избранное'}
          </button>
        </div>
      </div>
    </div>
  );
}