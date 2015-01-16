#Layer jQuery plugin
##Reference
[Animate.less - CSS3 Animation](https://github.com/machito/animate.less)

##HTML
All attributes in below sample are required for initializing.
```html
<div id="layer-1" data-layer="true" class="layer">
  <div class="inner">
    <button data-layer-close="true" class="layer-close"><span>&times;</span></button>
    <h2 class="layer-header">...</h2>
    <div class="layer-content-wrap">
      <div class="layer-content">
        ...
      </div>
    </div>
    <div class="layer-footer">
      <div class="inner">
        ...
      </div>
    </div>
  </div>
</div>
```

##Usage
```js
$('#layer').layer();
```
```js
$('#layer').layer({
	useCss3: true,
  freezeBody: true,
  overlayClass: 'overlay',
  overlayAnimateDuration: false,
  animateDuration: false,
  animationIn: 'bounceInDown',
  animationOut: 'bounceOutUp',
  customClass: '',
  position: 'fixed',
  width: 640,
  maxHeight: 640,
  scroll: 'content',
  mobileBreakpoint: 767,
  desktopViewPadding: 20,
  mobileViewPadding: 0,
  closeOnClickOverlay: true,
  closeOnEsc: true
});
```

##Options
###useCss3 (default: true)
Use css3 for animation or not.
Available value: `true | false`
* true: if browser support css3 animation, entrance and exit effect will use `Animate.less`. If browser doesn't support css3 animation, will use jQuery `fadeIn` and `fadeOut` effect.
* false: use jQuery `fadeIn` and `fadeOut` function.

###freezeBody (default: true)
Freeze body scrolling on layer appearance or not.
Available value: `true | false`
* true: on layer appearance, `body` will add class `no-overflow` which set `overflow: hidden`.
* false: `body` will not add class `no-overflow` on layer appearance.

###overlayClass (default: 'overlay')
Append custom class to overlay element

###overlayAnimateDuration (default: false)
Set animate duration for overlay
Available value: `false | 0 | <number>` (unit: ms)
* false: will use the default animate duration defined in `Animate.less`. If browser doesn't support css3 animation, this option will be set back to `400`.
* 0: animation will be disabled.
* <number>: overwrite css3 animate duration, or set jQuery animate duration if browser doesn't support css3 animation.

###animateDuration (default: false)
Set animate duration for layer
Avalable value: Refer `overlayAnimateDuration`