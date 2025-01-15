export default class Header {
    selectors = {
        root: '[data-js-header]',
        overlay: '[data-js-header-overlay]',
        burgerButton: '[data-js-header-burger-button]',
        contactLink: '.header__contact-us-link',
        menuLink: '.header__menu-link',
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root);
        this.overlayElement = this.rootElement.querySelector(this.selectors.overlay);
        this.burgerButtonElement = document.querySelector(this.selectors.burgerButton);
        this.contactLinkElement = this.rootElement.querySelector(this.selectors.contactLink);
        this.menuLinkElement = this.rootElement.querySelectorAll(this.selectors.menuLink);
        this.bindEvents();
    }

    onBurgerButtonClick = () => {
        this.burgerButtonElement.classList.toggle(this.stateClasses.isActive);
        this.overlayElement.classList.toggle(this.stateClasses.isActive);
        document.documentElement.classList.toggle(this.stateClasses.isLock);
    }
    
    closeMenu = () => {
        if (!this.burgerButtonElement.classList.contains(this.stateClasses.isActive)) {
            return
        }
        
        this.burgerButtonElement.classList.remove(this.stateClasses.isActive);
        this.overlayElement.classList.remove(this.stateClasses.isActive);
        document.documentElement.classList.remove(this.stateClasses.isLock);
    }

    bindEvents() {
        this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick);

        this.menuLinkElement.forEach((link) => link.addEventListener('click', this.closeMenu));
        this.contactLinkElement.addEventListener('click', this.closeMenu);
    }

}