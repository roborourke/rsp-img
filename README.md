# `rsp-img`

JS that updates image's `sizes` attribute according to its currently displayed size.

## Demo

https://gigantic-three-sparrow.glitch.me/

## What is this?

Responsive images on the web are difficult to get right. What I think most of us would like is an image tag that uses the `srcset` attribute to determine the most appropriate available src based on the size the image is currently being displayed at, rather than in relation to the viewport.

This library makes the `sizes` attribute dynamic and tied to an image's current display size, so the browser can make a more informed decision about which image to download from the `srcset`.

## Features

- Less than 500B
- Progressive enhancement for standard `img` tags
- Accounts for device pixel ratio
- Uses `ResizeObserver` and `requestAnimationFrame` for optimal performance

## Usage

Include the `rsp-img.js` file in your bundle or directly in your web page e.g.

```html
<script src="rsp-img.min.js" async></script>
```
