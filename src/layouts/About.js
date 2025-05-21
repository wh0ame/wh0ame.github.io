function About() {
  return(
    <>
    <div className="benefits">
      <h2 className="visually-hidden">Преимущества ЖК</h2>
      <div className="container container--sm">
        <div className="benefits__row">
          <div className="benefits__item">
            <img
              src="./img/benefits/bench.svg"
              alt=""
              className="benefits__item-img"
            />
            <p className="benefits__item-text">
              Рядом исторические парки&nbsp;и&nbsp;скверы
            </p>
          </div>
          <div className="benefits__item">
            <img
              src="./img/benefits/building.svg"
              alt=""
              className="benefits__item-img"
            />
            <p className="benefits__item-text">Полностью обустроенный</p>
          </div>
          <div className="benefits__item">
            <img
              src="./img/benefits/fountain.svg"
              alt=""
              className="benefits__item-img"
            />
            <p className="benefits__item-text">10 фонтанов на территории</p>
          </div>
          <div className="benefits__item">
            <img
              src="./img/benefits/bicycle.svg"
              alt=""
              className="benefits__item-img"
            />
            <p className="benefits__item-text">6 км велодорожек</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default About;