const rootSelector = "[data-js-certificates]";

class CertificatesCarousel {
  selectors = {
    root: rootSelector,
    openButton: "[data-js-certificates-open]",
    modal: "[data-js-certificates-modal]",
    closeButton: "[data-js-certificates-close]",
    slide: "[data-js-certificate-slide]",
    prevButton: "[data-js-certificate-prev]",
    nextButton: "[data-js-certificate-next]",
  };

  stateClasses = {
    isActive: "is-active",
    isOpen: "is-open",
  };

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.openButton = document.querySelector(this.selectors.openButton);
    this.modal = this.rootElement.querySelector(this.selectors.modal);
    this.closeButton = this.modal.querySelector(this.selectors.closeButton);
    this.slideElements = this.modal.querySelectorAll(this.selectors.slide);
    this.prevButton = this.modal.querySelector(this.selectors.prevButton);
    this.nextButton = this.modal.querySelector(this.selectors.nextButton);
    this.state = {
      isOpen: false,
      activeSlideIndex: 0,
    };
    this.totalSlides = this.slideElements.length;
    this.bindEvents();
  }

  bindEvents() {
    this.openButton.addEventListener("click", () => this.openCarousel());
    this.closeButton.addEventListener("click", () => this.closeCarousel());
    this.prevButton.addEventListener("click", () => this.onArrowClick("prev"));
    this.nextButton.addEventListener("click", () => this.onArrowClick("next"));
  }

  openCarousel = () => {
    this.state.isOpen = true;
    this.updateUI();
    document.body.style.overflow = "hidden";
  };

  closeCarousel = () => {
    this.state.isOpen = false;
    this.updateUI();
    document.body.style.overflow = "";
  };

  onArrowClick = (direction) => {
    if (direction === "next") {
      this.state.activeSlideIndex = (this.state.activeSlideIndex + 1) % this.totalSlides;
    } else if (direction === "prev") {
      this.state.activeSlideIndex = (this.state.activeSlideIndex - 1 + this.totalSlides) % this.totalSlides;
    }
    this.updateUI();
  };

  updateUI = () => {
    const { isOpen, activeSlideIndex } = this.state;

    this.modal.classList.toggle(this.stateClasses.isOpen, isOpen);

    this.slideElements.forEach((slideElement, index) => {
      const isActive = index === activeSlideIndex;
      slideElement.classList.toggle(this.stateClasses.isActive, isActive);
      if (isActive) {
        slideElement.parentNode.prepend(slideElement);
      }
    });
  };
}

export default class CertificatesCarouselCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new CertificatesCarousel(element);
    });
  }
}
