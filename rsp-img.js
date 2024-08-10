class RSPImg extends HTMLImageElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.srcset && !this.dataset.srcset) {
      return;
    }

    const srcset = this.srcset || this.dataset.srcset;
    this.srcset = '';

    // Make a list of srcs from largest to smallest.
    const srcs = srcset.split(',').map(src => {
      const [url = '', descriptor = ''] = src.trim().split(' ');
      let size = parseFloat(descriptor);
      if (descriptor?.indexOf('x')>=0) {
        size = Math.floor((this.width || this.clientWidth || 1) * size);
      }
      return {
        url: url.trim(),
        size,
      };
    })
    .sort((a,b) => a.size < b.size ? 1 : (a.size > b.size ? -1 : 0));

    // Use the largest size as the default.
    let currentSrc = srcs[0].url;

    this.resizeObserver = new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        for (const src of srcs) {
          if (entries[0].devicePixelContentBoxSize[0].inlineSize <= src.size){
            currentSrc = src.url;
          }
        }
        this.src = currentSrc;
      });
    });

    this.resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this.resizeObserver && this.resizeObserver.disconnect();
  }
}

customElements.define('rsp-img', RSPImg, {extends:'img'});
