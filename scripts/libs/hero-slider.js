class HeroSlider {
  constructor(el) {
    this.el = el;
    this.swiper = this._initSwiper();
  }

  _initSwiper() {
    return new Swiper(this.el, {
      // this.elにDOMを代入するようにする('.swiper-container'など)

      // Optional parameters
      // direction: 'vertical',
      loop: true,
      // effect: 'fade',
      grabCursor: true,
      effect: 'coverflow',
      centeredSlides: true,
      // スライドが真ん中に揃えられる
      slidesPerView: 1,
      // 表示されるスライドの最大枚数
      speed: 1000,
      // スライドが動いたときの時間
      breakpoints: {
        1024: {
          slidesPerView:2,
          // 1024px以上になると表示枚数を変化させる。応用可
        }
      },
      // autoplay: {
      //   delay: 4000,
      //   disableOnInteraction: false
      //   // 一度マウスで操作するとオートプレイがデフォルトで切れるが、切れないようにする設定
      // }
    });    
  }
  start(options = {}) {
    // まずoptionsに空のオブジェクトを設定する。この時点では定義がないため。なくてもいけるが、バグ防止のため
    options = Object.assign({
      delay: 4000,
      disableOnInteraction: false
    },options);
    // 入ってきた引数をマージする。直で代入してもいいが、マージした方が、デフォルト値が設定されているので、いちいち引数にそれぞれを書く必要がなくなる

    this.swiper.params.autoplay = options;
    // オブジェクト内の特定の要素が、書き換えられる
    this.swiper.autoplay.start();
    // start()が呼ばれると、autoplayが開始される。
  }
  stop() {
    this.swiper.autoplay.stop();
  }

};
