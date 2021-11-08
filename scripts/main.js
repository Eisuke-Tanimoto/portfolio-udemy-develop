document.addEventListener("DOMContentLoaded", function () {
  const main = new Main();
});

class Main {
  constructor() {
    this.header = document.querySelector(".header");
    this.sides = document.querySelectorAll(".side");
    this._observers = [];
    this._init();
  }

  _init() {
    new MobileMenu();
    Pace.on('done', this._paceDone.bind(this));
    this.hero = new HeroSlider(".swiper-container");
  }

  _paceDone() {
    this._scrollInit();
  }

  set observers(val) {
    this._observers.push(val);
  }

  get observers() {
    return this._observers;
  }

  _navAnimation(el, inview) {
    if (inview) {
      this.header.classList.remove("triggered");
    } else {
      this.header.classList.add("triggered");
    }
  }

  _sideAnimation(el, inview) {
    if (inview) {
      this.sides.forEach(side => side.classList.add("inview"))
    } else {
      this.sides.forEach(side => side.classList.remove("inview"))
    }
  }

  _inviewAnimation(el, inview) {
    if (inview) {
      el.classList.add("inview");
    } else {
      el.classList.remove("inview");
    }
  }

  _textAnimation(el, isIntersectiong) {
    if (isIntersectiong) {
      const ta = new TweenTextAnimation(el);
      ta.animate();
    }
  }

  _inviewLineBlack(el, inview) {
    if (inview) {
      el.classList.add("inview");
    } else {
      el.classList.remove("inview");
    }
  }

  _toggleSlideAnimation(el, inview) {
    if (inview) {
      this.hero.start();
    } else {
      this.hero.stop();
    }
  }

  _scrollInit() {
    this.observers = new ScrollObserver(".nav__trigger", this._navAnimation.bind(this), {once: false});
    this.observers = new ScrollObserver(".cover-slide", this._inviewAnimation);
    this.observers = new ScrollObserver(".tween-animate-title", this._textAnimation, {rootMargin: "-300px 0px" } );
    this.observers = new ScrollObserver(".swiper-container",this._toggleSlideAnimation.bind(this), { once:false });
    this.observers = new ScrollObserver(".travel__title", this._inviewLineBlack);
    this.observers = new ScrollObserver(".appear", this._inviewAnimation);
    this.observers = new ScrollObserver("#main-content", this._sideAnimation.bind(this), {once:false, rootMargin: "-300px 0px"});

  //   this._obeservers.push(
  //     new ScrollObserver(".nav__trigger", this._navAnimation.bind(this), {once:false} )
  }
}
