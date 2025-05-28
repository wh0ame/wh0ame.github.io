function Apartments() {
  return(
    <section className="apartments"> {/* Изменили здесь */}
      <div className="container"> {/* Используем существующий container */}
        <div className="apartments__title">
          <h2 className="title-2">Наши квартиры</h2>
        </div>
        
        <div className="apartments-grid-2x2">
          {/* Карточка 1 */}
          <div className="apartment-card">
            <div className="card-media">
              <img
                src="./img/cards/01.jpg"
                alt="Пентхаус 'Loft Олимп'"
                className="card-image"
              />
              <div className="card-overlay"></div>
            </div>
            <h3 className="card-title">Пентхаус "Loft Олимп"</h3>
          </div>

          {/* Карточка 2 */}
          <div className="apartment-card">
            <div className="card-media">
              <img
                src="./img/cards/02.jpg"
                alt="Апартаменты 'Nice Loft'"
                className="card-image"
              />
              <div className="card-overlay"></div>
            </div>
            <h3 className="card-title">Апартаменты "Nice Loft"</h3>
          </div>

          {/* Карточка 3 */}
          <div className="apartment-card">
            <div className="card-media">
              <img
                src="./img/cards/03.jpg"
                alt="Апартаменты 'Loft Studio'"
                className="card-image"
              />
              <div className="card-overlay"></div>
            </div>
            <h3 className="card-title">Апартаменты "Loft Studio"</h3>
          </div>

          {/* Карточка 4 */}
          <div className="apartment-card">
            <div className="card-media">
              <img
                src="./img/cards/04.jpg"
                alt="Loft квартира 'Престиж'"
                className="card-image"
              />
              <div className="card-overlay"></div>
            </div>
            <h3 className="card-title">Loft квартира "Престиж"</h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Apartments;