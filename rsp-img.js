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
    this.sizes = '';
    
    // Make a list of srcs from largest to smallest.
    const srcs = srcset.split(',').map(src=>{
      const img = src.trim().split(' ');
      const unit = (img[1] || '').indexOf('w') >= 0 ? 'w' : 'x';
      let size = Number((img[1] || '').replace(/\D+/g,''));
      if ((img[1] || '').indexOf('x')>0) {
        size = Math.floor((this.width || this.clientWidth || 1) * size);
      }
      return {
        url: (img[0] || '').trim(),
        size,
      };
    })
    .sort(function(a,b){
      return a.size < b.size ? 1 : (a.size > b.size ? -1 : 0);
    });
    
    let currentSrc = srcs[0].url;
    
    this.resizeObserver = new ResizeObserver((entries) => {
      window.requestAnimationFrame(() => {
        for (const entry of entries) {
          for (const src of srcs) {
            if (entry.devicePixelContentBoxSize[0].inlineSize <= src.size){
              currentSrc = src.url;
            }
          }
        }
        if (this.src !== currentSrc) {
          this.src = currentSrc;
        }
      });
    });

    this.resizeObserver.observe(this);
  }
  
  disconnectedCallback() {
    if(this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}

window.customElements.define('rsp-img', RSPImg, {extends:'img'});
