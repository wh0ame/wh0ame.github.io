export default class CardToggle {
  selectors = {
    card: ".list__item",
    description: ".focus-info__description",
  };

  stateClasses = {
    isActive: "is-active",
  };

  constructor() {
    this.cards = document.querySelectorAll(this.selectors.card);
    this.bindEvents();
    this.bindResizeEvent();
  }

  toggleCard = (event) => {
    const card = event.currentTarget;
    card.classList.toggle(this.stateClasses.isActive);
  };

  isActive = (event) => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1440) {
      this.toggleCard(event);
    }
  };

  resetActiveCards = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1440) {
      this.cards.forEach((card) => {
        card.classList.remove(this.stateClasses.isActive);
      });
    }
  };

  bindEvents() {
    this.cards.forEach((card) => {
      card.addEventListener("click", this.isActive);
    });
  }

  bindResizeEvent() {
    window.addEventListener("resize", this.resetActiveCards);
  }
}
