const ri = node => {
    // Update the sizes attribute on resize.
    node.ri = new ResizeObserver((entries) => {
        requestAnimationFrame(() => {
            node.sizes = `${entries[0].contentRect.width}px`;
        });
    });

    node.ri.observe(node);
  }

  // Create a new instance of MutationObserver
  (new MutationObserver((mutationsList) => {
      // Iterate over the mutations
      for (let mutation of mutationsList) {
          // Check if nodes were added
          if (mutation.type === 'childList') {
              // Iterate over the added nodes
              for (let node of mutation.addedNodes) {
                  if (node.nodeName === 'IMG' && !node.ri && node.srcset) {
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

  // Initialise any images already added to the DOM.
  document.querySelectorAll('img[srcset]').forEach(ri);
