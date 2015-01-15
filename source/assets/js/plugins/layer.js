/**
 *  @name layer
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'layer';
  //css3 animation events
  var animationEvents = 'animationend webkitAnimationEnd MSAnimationEnd oanimationend';
  //detect browser support css3 animation or not
  var isCss3 = Modernizr && Modernizr.cssanimations;
  //debounce duration to decrease/avoid slow performance when resizing window (responsive)
  var debounceDuration = 0;

  function getInternetExplorerVersion()
  // Returns the version of Internet Explorer or a -1
  // (indicating the use of another browser).
  {
    var rv = -1; // Return value assumes failure.
    if (navigator.appName === 'Microsoft Internet Explorer') {
      var ua = navigator.userAgent;
      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) !== null) {
        rv = parseFloat( RegExp.$1 );
      }
    }
    return rv;
  }

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      /*
      in case you are using an older version of IE (7 - 9),
      we have to increase the debouceDuration because of slow performace
      when you resize your window (responsive ability)
      */
      var ieVersion = getInternetExplorerVersion();
      if(ieVersion > -1 && ieVersion < 10.0) {
        debounceDuration = 150;
      }

      //add class .iemobile to html to detect IEMobile
      if(navigator.userAgent.match(/IEMobile/g)) {
        $('html').addClass('iemobile');
      }

      var that = this;

      //create id attribute if layer doesn't specify an id
      if(!that.element.attr('id')) {
        var newId = Math.random();
        newId = newId.toString().substring(newId.toString().indexOf('.') + 1);
        that.element.attr('id', newId);
      }

      //overide option again if user specified option iside data-layer-option attribute
      if(that.element.data('layer-option')) {
        that.options = $.extend({}, that.options, that.element.data('layer-option'));
      }

      //create overlay
      that.createOverlay();

      //add custom class into layer
      if(that.options.customClass) {
        that.element.addClass(that.options.customClass);
      }

      //define elements to use
      that.btnClose = that.element.find('[data-layer-close]');
      that.layerHeader = that.element.find('.layer-header');
      that.layerContent = that.element.find('.layer-content');
      that.layerContentWrap = that.element.find('.layer-content-wrap');
      that.layerFooter = that.element.find('.layer-footer');
      that.layerInner = that.element.children('.inner');

      if(!that.layerHeader.length) {
        that.element.addClass('no-header');
      }

      if(!that.layerFooter.length) {
        that.element.removeClass('no-footer');
      }

      //Bind close action to close button
      that.btnClose
      .off('click.close-layer')
      .on('click.close-layer', function(e) {
        e.preventDefault();
        that.close();
      });

      //Bind open action to trigger
      $('[data-trigger-' + pluginName + ']')
      .off('click.open-layer')
      .on('click.open-layer', function(e) {
        e.preventDefault();
        that.open();

        if('pushState' in history) {
          history.pushState({
            popup: '#' + that.element.attr('id')
          }, document.title, '#' + that.element.attr('id'));
        }
      });

      //overider css3 animation duration
      //parse again to make sure the format of value was valid
      if(isCss3 && that.options.useCss3) {
        that.options.animateDuration = parseInt(that.options.animateDuration, 10);
        that.element.css({
          'animation-duration': that.options.animateDuration + 'ms',
          '-webkit-animation-duration': that.options.animateDuration + 'ms',
          '-moz-animation-duration': that.options.animateDuration + 'ms',
          '-o-animation-duration': that.options.animateDuration + 'ms'
        });

        that.options.overlayAnimateDuration = parseInt(that.options.overlayAnimateDuration, 10);
        that.backdrop.css({
          'animation-duration': that.options.overlayAnimateDuration + 'ms',
          '-webkit-animation-duration': that.options.overlayAnimateDuration + 'ms',
          '-moz-animation-duration': that.options.overlayAnimateDuration + 'ms',
          '-o-animation-duration': that.options.overlayAnimateDuration + 'ms'
        });
      }

      //close on Esc key
      if(that.options.closeOnEsc) {
        $(document).keyup(function(e) {
          var key = e.keyCode || e.which;
          if(key === 27) {
            e.preventDefault();
            that.close();
          }
        });
      }
    },
    setPosition: function() {
      var that = this;
      var maxHeight = that.options.maxHeight ? that.options.maxHeight : $(window).height();
      var width = that.options.width;
      var padding = $(window).width() > that.options.mobileBreakpoint ? that.options.desktopViewPadding : that.options.mobileViewPadding;

      //Check for popup size to fit screen
      //first, check width of layer
      //width of layer <= window width - (view padding option * 2)
      if(width + (padding * 2) > $(window).width()) {
        width = $(window).width() - (padding * 2);
      }

      //horizontal center align layer
      that.element.css({
        'position': that.options.position,
        'left': '50%',
        'width': width,
        'margin-left': -(width / 2)
      });

      /*
      if scroll inside layer content then
      - set max Height (option 'maxHeight' or window height if maxHeight > window height)
      - set content height

      if scroll whole layer then no need to set height of layer
      - set height for backdrop element
      */
      if(that.options.scroll === 'content' || that.options.scroll !== 'popup') {
        //set max height for layer
        //heigh of layer <= window - (view padding option * 2)
        if(maxHeight + (padding * 2) >= $(window).height()) {
          maxHeight = $(window).height() - (padding * 2);
        }

        that.element.css({
          'max-height': maxHeight
        });

        //reset content height before calculating
        that.layerContentWrap.css('height', '');

        var elementHeight = that.element.height();

        //vertical align layer
        that.element.css({
          'top': '50%',
          'margin-top': -(elementHeight / 2)
        });

        //set content wrapper height
        that.layerContentWrap.height(elementHeight - parseInt(that.layerInner.css('padding-top'), 10) - parseInt(that.layerInner.css('padding-bottom'), 10));

        that.backdrop.height($(window).height());
      }
      else if(that.options.scroll === 'popup') {
        /*
          scroll whole popup in viewport
          then position of layer must be `relative`
          and reset margin-top and height css values

          backdrop element should be large enough to contain whole layer
          so backdrop height = layer height + (padding option * 2)
        */
        that.element.css({
          'position': 'relative',
          'top': padding,
          'margin-top': '',
          'height': ''
        });

        that.backdrop.height(that.element.height() + (padding * 2));

      }
    },
    open: function() {
      var that = this;

      //if freezeBody is specified or scroll whole popup then body will be overflow-hidden
      if(that.options.freezeBody || that.options.scroll === 'popup') {
        $('body').addClass('no-overflow').data('scrollTop', $('body').scrollTop());
      }

      //show overlay
      //use css3 animation if enabled
      //or jquery fade animation

      //show overlay first
      if(that.options.useCss3 && isCss3) {
        that.overlay.show(0);
        that.backdrop
        .show(0)
        .addClass('animated fadeInOverlay')
        .off(animationEvents)
        .on(animationEvents, function () {
          that.backdrop
          .removeClass('animated fadeInOverlay')
          .off(animationEvents);
        });
      }
      else {
        that.backdrop.fadeIn(that.options.overlayAnimateDuration);
      }

      //trigger beforeOpen event
      that.element.trigger('beforeOpen');

      //show popup
      if(that.options.useCss3 && isCss3) {
        that.element
        .show(0)
        .addClass('animated ' + that.options.animationIn)
        .off(animationEvents)
        .on(animationEvents, function() {
          that.element
          .removeClass('animated ' + that.options.animationIn)
          .off(animationEvents)

          //trigger afterOpen event
          .trigger('afterOpen');
        });
      }
      else {
        that.element.fadeIn(that.options.animateDuration, function() {
          //trigger afterOpen event
          that.element.trigger('afterOpen');
        });
      }
      that.setPosition();

      //resize popup when resizing window viewport
      var timeoutSetposition;
      $(window).off('resize.set-layer-position').on('resize.set-layer-position', function() {
        if(timeoutSetposition) {
          clearTimeout(timeoutSetposition);
        }
        timeoutSetposition = setTimeout(function() {
          that.setPosition();
        }, debounceDuration);
      });
    },
    close: function(state) {
      var that = this;

      if(typeof(state) === 'undefined') {
        if('pushState' in history) {
          history.go(-1);
        }
      }
      else if (state === 'popping') {
        return;
      }

      if($('body').is('.no-overflow')) {
        $('body').removeClass('no-overflow').scrollTop($('body').data('scrollTop'));
      }

      //hide overlay
      if(that.overlay.is(':visible')) {
        if(that.options.useCss3 && isCss3) {
          that.backdrop
          .addClass('animated fadeOutOverlay')
          .off(animationEvents)
          .on(animationEvents, function() {
            that.backdrop
            .hide(0)
            .off(animationEvents)
            .removeClass('animated fadeOutOverlay');

            that.overlay.hide(0);
          });
        }
        else {
          that.backdrop.fadeOut(that.options.overlayAnimateDuration, function() {
            that.overlay.hide(0);
          });
        }
      }

      //trigger beforeClose event
      that.element.trigger('beforeClose');

      if(that.options.useCss3 && isCss3) {
        that.element
        .addClass('animated ' + that.options.animationOut)
        .off(animationEvents).on(animationEvents, function() {
          that.element
          .hide()
          .off(animationEvents)
          .removeClass('animated ' + that.options.animationOut)
          .trigger('afterClose'); //trigger afterClose event
        });
      }
      else {
        that.element.fadeOut(that.options.animateDuration, function() {
          that.element.trigger('afterClose'); //trigger afterClose event
        });
      }

      $(window).off('resize.set-layer-position'); //off window resize event
    },
    createOverlay: function() {
      /*
      this function to create separate overlay for each popup
      and the backdrop (fake overlay to bind close event)
      */
      var that = this;
      var overlay = $('<div data-layer-overlay="true"><div class="layer-backdrop"></div></div>');

      that.overlay = overlay.appendTo('body');
      that.backdrop = that.overlay.find('.layer-backdrop');
      that.overlay.append(that.element);
      if(that.options.overlayClass) {
        that.overlay.addClass(that.options.overlayClass);
      }
      if(that.options.closeOnClickOverlay) {
        that.backdrop.off('click.close-layer').on('click.close-layer', function () {
          that.close();
        });
      }
    },
    destroy: function() {
      // deinitialize
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {
    useCss3: true,
    freezeBody: true,
    overlayClass: 'overlay',
    overlayAnimateDuration: 400,
    animateDuration: 400,
    animationIn: 'fadeIn',
    animationOut: 'fadeOut',
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
  };

  $.fn[pluginName].hideAll = function() {
    $('[data-' + pluginName + ']:visible').layer('close', 'popping');
  };

  if('pushState' in history) {
    history.replaceState({
      popup: 'no-popup'
    }, document.title, document.location.href);

    window.addEventListener('popstate', function(event) {
      $.fn[pluginName].hideAll();
      if(event.state.popup) {
        if(event.state.popup !== 'no-popup') {
          $(event.state.popup).layer('open');
        }
      }
    });
  }

}(jQuery, window));
