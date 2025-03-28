function Apartments(){
  return(
    <>
    <div className="container">
      <div className="apartments__title">
        <h2 className="title-2">Наши квартиры</h2>
      </div>
      <div className="apartments__cards">
        <a href="#!" className="card">
          <img
            className="card__img"
            src="./img/cards/01.jpg"
            alt="Пентхаус “Loft Олимп”"
          />
          <h3 className="card__title">Пентхаус “Loft Олимп”</h3>
        </a>
        <a href="#!" className="card">
          <img
            className="card__img"
            src="./img/cards/02.jpg"
            alt="Пентхаус “Loft Олимп”"
          />
          <h3 className="card__title">Апартаменты “Nice Loft”</h3>
        </a>
        <a href="#!" className="card">
          <img
            className="card__img"
            src="./img/cards/03.jpg"
            alt="Пентхаус “Loft Олимп”"
          />
          <h3 className="card__title">Апартаменты “Loft Studio”</h3>
        </a>
        <a href="#!" className="card">
          <img
            className="card__img"
            src="./img/cards/04.jpg"
            alt="Пентхаус “Loft Олимп”"
          />
          <h3 className="card__title">Loft квартира “Престиж”</h3>
        </a>
      </div>
    </div>
    </>
  )
}

export default Apartments;