export default class CardToggle {
  selectors = {
      card: '.list__item',
      description: '.focus-info__description',
  }

  stateClasses = {
      isActive: 'is-active',
  }

  constructor() {
      this.cards = document.querySelectorAll(this.selectors.card);
      this.bindEvents();
  }

  toggleCard = (event) => {
      const card = event.currentTarget;
      card.classList.toggle(this.stateClasses.isActive);
  }

  bindEvents() {
      this.cards.forEach((card) => {
          card.addEventListener('click', this.toggleCard);
      });
  }
}
