const rootSelector = "[data-js-tabs]";

class Tabs {
  selectors = {
    root: rootSelector,
    button: "[data-js-tabs-button]",
    content: "[data-js-tabs-content]",
    arrow: "[data-js-tabs-arrow]",
  };

  stateClasses = {
    isActive: "is-active",
  };

  stateAttributes = {
    ariaSelected: "aria-selected",
    tabIndex: "tabindex",
  };

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button);
    this.contentElements = this.rootElement.querySelectorAll(this.selectors.content);
    this.arrowElements = this.rootElement.querySelectorAll(this.selectors.arrow);
    this.arrowLeft = this.arrowElements[0];
    this.arrowRight = this.arrowElements[1];
    this.state = {
      activeTabIndex: [...this.buttonElements].findIndex((buttonElement) => {
        buttonElement.classList.contains(this.stateClasses.isActive);
      }),
    };
    this.limitTabsIndex = this.buttonElements.length - 1;
    this.bindEvents();
  }

  bindEvents() {
    this.buttonElements.forEach((buttonElement, index) => {
      buttonElement.addEventListener("click", () => this.onButtonClick(index));
    });

    this.arrowElements.forEach((arrowElement) => {
      arrowElement.addEventListener("click", this.onArrowClick);
    });
  }

  onButtonClick = (buttonIndex) => {
    this.state.activeTabIndex = buttonIndex;
    this.updateUI();
  };

  onArrowClick = (event) => {
    const tabsSelectorInner = ".tabs__body-inner";
    const tabsInner = this.rootElement.querySelector(tabsSelectorInner);
    const tabsInnerWidth = tabsInner.offsetWidth;

    if (event.target === this.arrowRight || event.target.closest(".tabs__arrow--right")) {

      if ( tabsInnerWidth === 1272 || tabsInnerWidth === 774) {
        tabsInner.scrollBy({ left: 570 });
        return
      }
      if (tabsInnerWidth === 520) {
        tabsInner.scrollBy({ left: 270 });
        return;
      }
      if (tabsInnerWidth === 300) {
        tabsInner.scrollBy({ left: 300 });
        return;
      }

      tabsInner.scrollBy({ left: 300 });
    }
    if (event.target === this.arrowLeft || event.target.closest(".tabs__arrow--left")) {

      if ( tabsInnerWidth === 1272 || tabsInnerWidth === 774) {
        tabsInner.scrollBy({ left: -570 });
        return
      }

      if (tabsInnerWidth === 520) {
        tabsInner.scrollBy({ left: -270 });
        return;
      }
      if (tabsInnerWidth === 300) {
        tabsInner.scrollBy({ left: -300 });
        return;
      }

      tabsInner.scrollBy({ left: -300 });
    }
  };

  updateUI = () => {
    const { activeTabIndex } = this.state;

    this.buttonElements.forEach((buttonElement, index) => {
      const isActive = index === activeTabIndex;

      buttonElement.classList.toggle(this.stateClasses.isActive, isActive);
      buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString());
      buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? "0" : "-1");
    });

    this.contentElements.forEach((contentElement, index) => {
      const id = contentElement.id;
      if (id === `tabpanel-${activeTabIndex + 1}`) {
        contentElement.classList.add(this.stateClasses.isActive);
      } else if ((activeTabIndex === 3 && id === "tabpanel-4") || (activeTabIndex === 3 && index === 7)) {
        contentElement.classList.add(this.stateClasses.isActive);
      } else {
        contentElement.classList.remove(this.stateClasses.isActive);
      }
    });
  };
}

export default class TabsCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new Tabs(element);
    });
  }
}
