function Cta(){
  return(
    <>
    <div className="cta">
      <div className="container">
      <div className="cta__title">
        <h2 className="title-2">Хотите посмотреть?</h2>
      </div>
      <div className="cta__wrapper">
        <div className="cta__text">
          <p>
            ЖК LoftHouse – это проект бизнес-класса, расположенный в центре
            города, на Наб. реки Фонтанки 10-15. Комплекс предлагает своим
            жильцам квартиры площадью от 40 до 170 кв. м. В здании будет три
            секции, в которых разместится всего 56 квартир.
          </p>
        </div>
        <form action="" className="cta__form form">
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
          <p className="form__privacy form__privacy--bottom">
            *Мы никому не передаем ваши данные. <br />И не сохраняем ваш номер
            в базу.
          </p>
          <button type="submit" className="form__btn">
            Посмотреть район
          </button>
        </form>
      </div>
      </div>
  </div>
  </>
  )
}

export default Cta;