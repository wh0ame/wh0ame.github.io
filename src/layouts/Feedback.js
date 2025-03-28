function Feedback(){
  return(
    <>
    <div className="feedback">
      <div className="container">
        <div className="feedback__title">
          <h2 className="title-2">Есть вопросы?</h2>
        </div>
        <form className="feedback__form form">
          <p className="form__privacy form__privacy--bottom">
            *Мы никому не передаем ваши данные. <br />И не сохраняем ваш номер в
            базу.
          </p>
          <input
            type="text"
            className="form__input"
            placeholder="Ваше имя"
            autoComplete="off"
          />
          <input
            data-tel-input=""
            type="text"
            className="form__input"
            placeholder="Ваш телефон"
            autoComplete="off"
          />
          <button type="submit" className="form__btn italic">
            Отправить
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Feedback;