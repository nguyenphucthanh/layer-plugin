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
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'layer';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;

      //create overlay
      that.createOverlay();

      //move popup to body
      that.element.appendTo('body');

      //add custom class
      if(that.options.customClass) {
        that.element.addClass(that.options.customClass);
      }

      that.btnClose = that.element.find('[data-layer-close]');
      that.layerHeader = that.element.find('.layer-header');
      that.layerContent = that.element.find('.layer-content');
      that.layerFooter = that.element.find('.layer-footer');

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
      });
    },
    setPosition: function() {
      var that = this;
      that.element.css({
        'position': that.options.position,
        'left': '50%',
        'width': that.options.width,
        'margin-left': -(that.options.width / 2)
      });

      /*
      if scroll inside layer content then
      - set max Height (option 'maxHeight' or window height if maxHeight > window height)
      - set content height
      */
      if(that.options.scroll === 'content') {
        //set max height for layer
        if(that.options.maxHeight) {
          if(that.options.maxHeight >= $(window).height()) {
            that.options.maxHeight = $(window).height();
          }
        }
        else {
          that.options.maxHeight = $(window).height();
        }

        that.element.css({
          'max-height': that.options.maxHeight
        });

        //vertical align layer
        that.element.css({
          'top': '50%',
          'margin-top': -(that.element.height() / 2)
        });

        //set content wrapper height
        that.layerContent
        .height(that.element.height() - that.layerHeader.height() - that.layerFooter.height())
        .css({
          'overflow': 'auto'
        });
      }
    },
    open: function() {
      var that = this;
      //show overlay
      if(that.options.useOverlay) {
        that.overlay.fadeIn(that.options.overlayAnimateDuration);
      }

      //show popup
      that.setPosition();
      that.element.fadeIn(that.options.animateDuration);
    },
    close: function() {
      var that = this;
      //hide overlay
      if(that.overlay.is(':visible')) {
        that.overlay.fadeOut(that.options.overlayAnimateDuration);
      }

      that.element.fadeOut(that.options.animateDuration);
    },
    createOverlay: function() {
      var that = this;
      if(!$('[data-layer-overlay]').length) {
        $('body').append('<div data-layer-overlay="true"></div>');
      }

      that.overlay = $('[data-layer-overlay]');
      if(that.options.overlayClass) {
        that.overlay.addClass(that.options.overlayClass);
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
    useOverlay: true,
    overlayClass: 'overlay',
    overlayAnimateDuration: 400,
    animateDuration: 400,
    customClass: '',
    position: 'fixed',
    width: 640,
    maxHeight: 640,
    scroll: 'content'
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({
    });
  });

}(jQuery, window));
