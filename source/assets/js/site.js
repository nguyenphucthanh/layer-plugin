/**
 * @name Site
 * @description Define global variables and functions
 * @version 1.0
 */
var Site = (function($, window, undefined) {

  function initPopup() {
    $('#layer-1').layer();

    $('#layer-2').layer({
    	scroll: 'popup'
    });

    $('#layer-3').layer();

    $('#layer-4').layer();

    $('#layer-5').layer();

    $('#layer-6').layer();

    $('#layer-7').layer({
    	forceFullHeight: true
    });

    $('#layer-8').layer({
      scroll: 'popup'
    });

    $('#layer-9').layer({
      scroll: 'popup',
      forceFullHeight: true
    });

    $('#layer-10, #layer-11').layer();
  }

  return {
    initPopup: initPopup
  };
})(jQuery, window);

jQuery(function() {
  Site.initPopup();
});
