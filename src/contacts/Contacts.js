import './contact.css';
import Footer from '../layouts/Footer';
import SmallHeader from '../layouts/SmallHeader';
import { Link } from 'react-router-dom'

export default function Contacts(){
    return(
        <>
        <SmallHeader />
            <div className="forma">
  <div className="form-at">
    <div className="validate-input-at w-50" data-validate="Обязательное поле">
      <input
        className="input-at"
        type="text"
        name="name-at"
        placeholder="Ваше имя"
      />
      <span className="focus-input-at" />
    </div>
    <div className="validate-input-at w-50" data-validate="Обязательное поле">
      <input
        className="input-at"
        type="text"
        name="email-at"
        placeholder="Ваш телефон или email"
      />
      <span className="focus-input-at" />
    </div>
    <div className="validate-input-at" data-validate="Обязательное поле">
      <textarea
        className="input-at"
        name="message-at"
        placeholder="Ваше сообщение"
        defaultValue={""}
      />
      <span className="focus-input-at" />
    </div>
    <input
      defaultChecked="checked"
      className="input-at"
      id="checkbox-at"
      type="checkbox"
      name="checkbox-at"
      onchange="document.getElementById('submit-at').disabled = !this.checked;"
    />
    <label htmlFor="checkbox-at">
      Настоящим подтверждаю, что я ознакомлен и согласен с{" "}
      <Link to="/agreement">пользовательским соглашением</Link>
    </label>
    <input type="hidden" name="subject-at" defaultValue="Тема формы" />
    <button id="submit-at" className="form-at-btn">
      Отправить
    </button>
  </div>
  <div className="result-at" />
</div>
        <Footer />
    </>
    )
}