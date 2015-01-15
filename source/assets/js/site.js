/**
 * @name Site
 * @description Define global variables and functions
 * @version 1.0
 */
var Site = (function($, window, undefined) {

  function initPopup() {
    //basic layer
    $('#layer-1').layer({
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
