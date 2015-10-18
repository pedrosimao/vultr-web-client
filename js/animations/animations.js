
vultrWebClient.animation('.expand', [function() {
  return {
    addClass: function(element, className, doneFn) {
      // Slide the Machine More container up when ng-hide is added
      if(className == 'ng-hide') {
        jQuery(element).animate({
          'height': 0 + 'px'
        }, 300);
      }
    },
    removeClass: function(element, className, doneFn) {
      // Slide the Machine More container down when ng-hide is removed
      if(className == 'ng-hide') {
        var $el = jQuery(element);
        $el.animate({
          'height': $el.find('.inner').innerHeight() + 'px'
        }, {
          duration: 300,
          complete: function() {
            $el.css('height', 'auto');
          }
        });
      }
    },
  };
}]);
