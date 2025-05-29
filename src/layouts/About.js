import { useState } from 'react';

function About() {
  const [activeModal, setActiveModal] = useState(null);

  const benefitsData = [
    {
      id: 1,
      icon: "./img/benefits/bench.svg",
      shortText: "Рядом исторические парки и скверы",
      description: "Жилой комплекс расположен в окружении нескольких исторических парков и скверов, включая знаменитый Городской сад XIX века и Парк Победы. В пешей доступности находится живописное озеро с оборудованной набережной для прогулок."
    },
    {
      id: 2,
      icon: "./img/benefits/building.svg",
      shortText: "Полностью обустроенный",
      description: "Комплекс полностью готов для комфортного проживания. На территории есть все необходимое: супермаркет, аптека, детский сад и фитнес-центр. Для пенсионеров предусмотрены специальные условия и дополнительные сервисы."
    },
    {
      id: 3,
      icon: "./img/benefits/fountain.svg",
      shortText: "10 фонтанов на территории",
      description: "На территории жилого комплекса расположены 10 уникальных фонтанов с художественной подсветкой. Центральный фонтан имеет площадь 200 кв.м. и является местом проведения летних мероприятий."
    },
    {
      id: 4,
      icon: "./img/benefits/bicycle.svg",
      shortText: "6 км велодорожек",
      description: "Для любителей активного отдыха предусмотрена сеть велодорожек общей протяженностью 6 км, соединяющая все корпуса комплекса. Есть пункты проката велосипедов и специальные парковки."
    }
  ];

  const openModal = (id) => {
    setActiveModal(id);
    document.body.classList.add('no-scroll');
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.classList.remove('no-scroll');
  };

  return (
    <>
      <div className="benefits">
        <h2 className="visually-hidden">Преимущества ЖК</h2>
        <div className="container container--sm">
          <div className="benefits__row">
            {benefitsData.map((item) => (
              <div 
                className="benefits__item" 
                key={item.id}
                onClick={() => openModal(item.id)}
              >
                <img
                  src={item.icon}
                  alt=""
                  className="benefits__item-img benefits__item-clickable"
                />
                <p className="benefits__item-text">
                  {item.shortText}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Window */}
      {activeModal && (
        <div className="benefits-modal-overlay" onClick={closeModal}>
          <div className="benefits-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="benefits-modal-close" onClick={closeModal}>
              &times;
            </button>
            <div className="benefits-modal-body">
              <img 
                src={benefitsData.find(item => item.id === activeModal).icon} 
                alt="" 
                className="benefits-modal-icon"
              />
              <h3 className="benefits-modal-title">
                {benefitsData.find(item => item.id === activeModal).shortText}
              </h3>
              <p className="benefits-modal-description">
                {benefitsData.find(item => item.id === activeModal).description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default About;