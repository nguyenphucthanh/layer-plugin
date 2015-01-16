#Layer jQuery plugin with Responsive
##Reference
[Animate.less - CSS3 Animation](https://github.com/machito/animate.less)

##Required files for plugins
* layer.js
* plugin.less
* animate.less

##HTML
All attributes in below sample are required for initializing. You don't need to create overlay element, plugin will create an overlay to wrap your layer, create a backdrop for special event and move the whole block to body.

```html
<a data-trigger-layer="#layer-1">Open layer</a>
```

```html
<div id="layer-1" data-layer="true" class="layer">
	<div class="inner">
		<button data-layer-close="true" class="layer-close"><span>&times;</span></button>
		<!--layer header can be removed-->
		<h2 class="layer-header">Layer title</h2>

		<div class="layer-content-wrap">
			<div class="layer-content">
				Layer content
			</div>
		</div>

		<!--layer footer can be removed-->
		<div class="layer-footer">
			<div class="inner">
				Layer footer
			</div>
		</div>
	</div>
</div>
```

Config layer using data attribute. These options will overwrite options on javascript initializing

```html
<div id="layer-1" data-layer="true" class="layer" data-layer-option="{ \"width\" : 800 , \"scroll\" : \"content\" }">
	...
</div>
```

##Usage
```js
$('#layer').layer();
```
```js
$('#layer').layer({
	useCss3: true,
	overlayClass: 'overlay',
	overlayAnimateDuration: false,
	animateDuration: false,
	animationIn: 'bounceInDown',
	animationOut: 'bounceOutUp',
	mobileAnimationIn: 'bounceInLeft',
	mobileAnimationOut: 'bounceOutLeft',
	customClass: '',
	position: 'fixed',
	width: 640,
	maxHeight: 640,
	scroll: 'content',
	mobileBreakpoint: 767,
	desktopViewPadding: 20,
	mobileViewPadding: 0,
	closeOnClickOverlay: true,
	closeOnEsc: true,
	forceFullHeight: false
});
```

##Options
###useCss3 (default: true)
Use css3 for animation or not.

Available value: `true | false`
* true: if browser support css3 animation, entrance and exit effect will use `Animate.less`. If browser doesn't support css3 animation, will use jQuery `fadeIn` and `fadeOut` effect.
* false: use jQuery `fadeIn` and `fadeOut` function.

###overlayClass (default: 'overlay')
Append custom class to overlay element.

###customClass: (default: '')
Append custom class to layer element.

###overlayAnimateDuration (default: false)
Set animate duration for overlay

Available value: `false | 0 | <number>` (unit: ms)

* false: will use the default animate duration defined in `Animate.less`. If browser doesn't support css3 animation, this option will be set back to `400`.
* 0: animation will be disabled.
* <number>: overwrite css3 animate duration, or set jQuery animate duration if browser doesn't support css3 animation.

###animateDuration (default: false)
Set animate duration for layer

Avalable value: Refer `overlayAnimateDuration`

###animationIn (default: 'bounceInDown')
Define animation type for layer appearance.

Available value: Refer `Animate.less`, you can use any effect in `Fading entrances`, `Bouncing entrances` and `Rotating entrances`.

On browsers which doesn't support css3 animation, this option will be set back to jQuery `fadeIn`.

###animationOut: (default: 'bounceOutUp')
Define animation type for layer closing.

Available value: Refer `Animate.less`, you can use any effect in `Fading exits`, `Bouncing exits` and `Rotating exits`.

On browsers which doesn't support css3 animation, this option will be set back to jQuery `fadeOut`.

###mobileAnimationIn (default: 'bounceInLeft')
Like `animationIn` but for viewport under `mobileBreakpoint`

###mobileAnimationOut (default: 'bounceOutLeft')
Like `animationOut` but for viewport under `mobileBreakpoint`

###position (default: 'fixed')
Set css position for layer element.

Available value: `fixed | absolute`

If you set `scroll` option as `popup`, the `position` will be set to `absolute`.

###width (default: 640)
Set width for layer. By default, max width of layer will never reach out window width.

###maxHeight (default: 640)
Set maximum height for layer. If window height is smaller than `maxHeight` then layer's height will never reach out window height. This option will be disabled when you set `scroll` option as `popup`.

###scroll (default: 'content')
Set scroll type for layer.

Available value: `content | popup`

* content: with `maxHeight` option, layer's height will never reach window height. So the content of layer will scroll inside layer.
* popup: layer will show all content without scrolling, but the whole popup will scroll. It means layer's height can reach out window viewport.

###mobileBreakpoint (default: 767)
Set viewport break point for mobile device.

###desktopViewPadding (default: 20)
This is the space between layer edge to window edge on desktop (which is viewport's width that larger than `mobileBreakpoint` value).

`layer size + padding <= window size`

###mobileViewPadding (default: 0)
Like `desktopViewPadding` option but available for viewport under 'mobileBreakpoint'.

###closeOnClickOverlay (default: true)
Available value: `true | false`

Enable closing layer when clicking on overlay

###closeOnEsc (default: true)
Available value: `true | false`

Enable closing layer when pressing `Esc` key.

###forceFullHeight (default: false)
Available value: `true | false`

* true: force layer height to full screen if the content is shorter than window size. This option will disable `maxHeight`.

* false: leave the height auto

##HTML5 History API
At first, you have to define ID for your layer element, or plugin will create a random id for layer if you forget to do so.

On layer appearance, the address will append `#layer-id`. Then you can use browser navigator (back/previous) to show hide layer. This is huge feature, especially on mobile device, we can use hardware back button to close layer.

##MISC
1. Overlay animate keyframes is not in `Animate.less`. It's in plugin.less. Those keyframes are cloned from `Animate.less` `fadeIn` and `fadeOut`.