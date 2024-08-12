# `rsp-img`

JS that extends the img tag to use `srcset` according to the image's actual rendered size, rather than the viewport.

## tl;dr

Load this JS on a web page, done.

## Demo

https://gigantic-three-sparrow.glitch.me/

## What is this?

Responsive images on the web are difficult, cumbersome, and widely misunderstood. What I think most of us would like is an image tag that uses the `srcset` attribute to determine the most appropriate available src based on the size the image is currently being displayed at.

This is unfortunately not really how it works today. Maybe it can improve in future if the `sizes` attributes can support container queries.

This will degrade gracefully in browsers that do not support web components as well, falling back to standard `src`, `srcset` and `sizes` behaviour.

## Features

- Less than 1kb
- Progressive enhancement for standard `img` tags
- Accounts for device pixel ratio
- Uses `ResizeObserver` and `requestAnimationFrame` for optimal performance

## Usage

Include the `rsp-img.js` file in your bundle or directly in your web page e.g.

```html
<script src="rsp-img.min.js" async></script>
```

### Further Optimisation

If you're quietly confident most visitors will have JS enabled, then the following options may be of interest:

- Set the `src` of your images to the smallest available option, or a placeholder as only the `srcset` options are used as candidates for display. If there's any delay loading the JS then only the smallest image will start to be downloaded
- Set the `srcset` attribute as `data-srcset` instead. This will prevent the browser from automatically inferring and trying to download a larger size before the web component kicks in.
