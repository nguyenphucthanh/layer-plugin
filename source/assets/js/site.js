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
  }

  return {
    initPopup: initPopup
  };
})(jQuery, window);

jQuery(function() {
  Site.initPopup();
});
