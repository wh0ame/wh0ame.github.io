import './contact.css';
import Footer from '../layouts/Footer';
import SmallHeader from '../layouts/SmallHeader';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

export default function Contacts() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    
    // Получаем все обязательные поля формы
    const requiredFields = formRef.current.querySelectorAll('[required]');
    let hasEmptyFields = false;
    
    // Сначала убираем все подсветки ошибок
    requiredFields.forEach(field => {
      field.classList.remove('error-field');
    });
    
    // Проверяем каждое обязательное поле
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('error-field');
        hasEmptyFields = true;
      }
    });
    
    // Если есть незаполненные поля, показываем сообщение и прерываем отправку
    if (hasEmptyFields) {
      alert('Не все поля заполнены');
      return;
    }
    
    // Если все поля заполнены, показываем уведомление об успехе
    setShowSuccess(true);
    
    // Через 3 секунды скрываем уведомление и переходим на главную
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/');
    }, 3000);
  };

  return (
    <>
      <SmallHeader />
      <div className="forma">
        <div className="form-at" ref={formRef}>
          <div className="validate-input-at w-50" data-validate="Обязательное поле">
            <input
              className="input-at"
              type="text"
              name="name-at"
              placeholder="Ваше имя"
              required
            />
            <span className="focus-input-at" />
          </div>
          <div className="validate-input-at w-50" data-validate="Обязательное поле">
            <input
              className="input-at"
              type="text"
              name="email-at"
              placeholder="Ваш телефон или email"
              required
            />
            <span className="focus-input-at" />
          </div>
          <div className="validate-input-at" data-validate="Обязательное поле">
            <textarea
              className="input-at"
              name="message-at"
              placeholder="Ваше сообщение"
              defaultValue={''}
              required
            />
            <span className="focus-input-at" />
          </div>
          <input
            defaultChecked={true}
            className="input-at"
            id="checkbox-at"
            type="checkbox"
            name="checkbox-at"
            required
            onChange={(e) => {
              document.getElementById('submit-at').disabled = !e.target.checked;
            }}
          />
          <label htmlFor="checkbox-at">
            Настоящим подтверждаю, что я ознакомлен и согласен с{' '}
            <Link to="/agreement">пользовательским соглашением</Link>
          </label>
          <input type="hidden" name="subject-at" defaultValue="Тема формы" />
          <button
            id="submit-at"
            className="form-at-btn"
            onClick={handleSubmit}
            disabled={false}
          >
            Отправить
          </button>
        </div>
        <div className="result-at" />
        
        {/* Уведомление об успешной отправке */}
        {showSuccess && (
          <div className="success-notification">
            Данные успешно отправлены!
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}