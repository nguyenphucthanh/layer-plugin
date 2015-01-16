/**
 * @name Site
 * @description Define global variables and functions
 * @version 1.0
 */
var Site = (function($, window, undefined) {

  function initPopup() {
    //basic layer
    $('#layer-1').layer();
  }

  return {
    initPopup: initPopup
  };
})(jQuery, window);

jQuery(function() {
  Site.initPopup();
});
