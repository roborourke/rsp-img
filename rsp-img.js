const ri = node => {
  if (!node.srcset && !node.dataset.srcset) {
      return;
  }

  const srcset = node.srcset || node.dataset.srcset;
  node.srcset = '';

  // Make a list of srcs from largest to smallest.
  const srcs = srcset.split(',').map(src => {
      const [url = '', descriptor = ''] = src.trim().split(' ');
      let size = parseFloat(descriptor);
      if (descriptor?.indexOf('x')>=0) {
          size = Math.floor((node.width || node.clientWidth || 1) * size);
      }
      return {
          url: url.trim(),
          size,
      };
  })
  .sort((a,b) => a.size < b.size ? 1 : (a.size > b.size ? -1 : 0));

  // Use the largest size as the default.
  let currentSrc = srcs[0].url;

  node.ri = new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
          for (const src of srcs) {
              if (entries[0].contentRect.width * devicePixelRatio <= src.size){
                  currentSrc = src.url;
              }
          }
          node.src = currentSrc;
      });
  });

  node.ri.observe(node);
}

// Create a new instance of MutationObserver
(new MutationObserver((mutationsList, observer) => {
    // Iterate over the mutations
    for (let mutation of mutationsList) {
        // Check if nodes were added
        if (mutation.type === 'childList') {
            // Iterate over the added nodes
            for (let node of mutation.addedNodes) {
                // Check if the node is an <img> tag
                if (node.nodeName === 'IMG' && !node.ri) {
                    ri(node);
                }
            }
            for (let node of mutation.removedNodes) {
                if (node.nodeName === 'IMG' && node.ri) {
                    node.ri.disconnect();
                }
            }
        }
    }
})).observe(document.documentElement, { childList: true, subtree: true });
document.querySelectorAll('img').forEach(ri);
