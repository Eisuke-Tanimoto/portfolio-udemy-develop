class ScrollObserver {
  constructor(els, cb , options) {
      this.els = document.querySelectorAll(els);
      const defaultOptions = {
              root: null,
              rootMargin: "0px",
              threshold: 0,
              once : true
      };
      this.cb = cb;
      this.options = Object.assign(defaultOptions, options);
      // optionsをマージすることによって、あとからoptionsの引数に新たなoption要素が入ってきても対応できる

      this.once = this.options.once;
      this._init();
  }

  _init() {
      const callback = function (entries, observer) {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  // const ta = new TextAnimation(entry.target);
                  // ta.animate();

                  this.cb(entry.target, true);
                  // entry.isIntersectingがtrueを返した場合にテキストアニメを発火。監視しているelsがIntersectionObserveの監視メソッドに引っかかった場合
                  if(this.once) {
                      observer.unobserve(entry.target);
                  }
              } else {
                  this.cb(entry.target, false);
              }
          });
      };

      this.io = new IntersectionObserver(callback.bind(this), this.options);
      this.io.POLL_INTERVAL = 100;
      this.els.forEach(el => this.io.observe(el));
  }
  destroy() {
      this.io.disconnect();
  }
}

// 今回の設計では、スクロールの監視（ScrollObserver）と監視対象の要素が画面領域内に入った際に実行される処理（cb）は分けたいのですね。

// なので、IntersectionObserverに渡すコールバック（callback）と画面領域内に入った際に実行される処理（cb）を分けています。

// IntersectionObserverは便利なのですが、こちらに登録したコールバックのentriesにはobserveで監視しているすべての監視対象が配列になって渡ってくる（entriesのことです。）ので、ちょっと使いづらいですね。

// また、実際にDOMが格納されているのはentry.targetなので、この点でもちょっと使いづらいですね。

// なので、そのような処理はcallbackの方で記述しておいて、cbでは画面内に入ってきた要素(el)と交差しているかしていないか（isIntersecting）を引数としてとることによって、より扱いやすいコールバック（cb）をScrollObserverを使用する際に記述できるようにしています。