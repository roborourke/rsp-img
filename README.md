# `rsp-img`

A web component that extends the img tag to use `srcset` according to the images rendered size.

## tl;dr

Load this web component JS on a web page, then add the attribute `is="rsp-img"` to your `<img>` tags.

## What is this?

Responsive images on the web are difficult, cumbersome, and widely misunderstood. What I think most of us would like is an image tag that uses the `srcset` attribute to determine the most appropriate available src based on the size the image is currently being displayed at.

This is unfortunately not really how it works today. Maybe it can improve in future if the `sizes` attributes can support container queries.

In the meantime however the desired behaviour (this is just my opinion btw) can be achieved using a custom web component to extend the built in `img` tag, using the `is` attribute.

This will degrade gracefully in browsers that do not support web components as well, falling back to standard `src`, `srcset` and `sizes` behaviour.

## Features

- Progressive enhancement for standard `img` tags
- Accounts for device pixel ratio
- Uses `ResizeObserver` and `requestAnimationFrame` for optimal performance

## Usage

Include the `rsp-img.js` file in your bundle or directly in your web page e.g.

```html
<script src="rsp-img.js" async></script>
```

Then, simply add `is="rsp-img"` to your images:

```html
<img
  is="rsp-img"
  width="800"
  height="600"
  src="https://example.com/image.jpg"
  srcset="https://example.com/image.jpg?w=200 200w, https://example.com/image.jpg?w=400 400w,
    https://example.com/image.jpg?w=800 800w, https://example.com/image.jpg?w=1600 1600w"
/>
```

The `sizes` attribute is not needed or factored in as this implementation is dependent on the size of the image as it is currently displayed rather than the viewport.

The above example will display the `1600w` source by default on a 2x pixel ratio device, then if the image is sized down to 400px wide it will show the `800w` source, and so on.

### Further Optimisation

If you're quietly confident most visitors will have JS enabled, then the following options may be of interest:

- Set the `src` of your images to the smallest available option, or a placeholder as only the `srcset` options are used as candidates for display. If there's any delay loading the JS then only the smallest image will start to be downloaded
- Set the `srcset` attribute as `data-srcset` instead. This will prevent the browser from automatically inferring and trying to download a larger size before the web component kicks in.
