let absolute = () => {$(document).ready(function(){  
  
    $('.js-tabs').on('click', '.js-tabs__switch:not(.active)', function (e) {
      e.preventDefault();
  
      //remember scroll position
      var initialScrollPos = $(window).scrollTop();
  
      $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('.js-tabs').find('.js-tabs__content').removeClass('active').eq($(this).index()).addClass('active');
  
      
  
      var tabsInput = $(this).closest('.js-tabs').find('.js-tabs-value');
      tabsInput.val($(this).text());
  
  
      // prevent scroll jumping when tab change
      window.scrollTo(0, initialScrollPos);
    });
  
  
    // animations
      var animatedElements = $(".js-animated");
      $(window).on('scroll resize', function() {
          checkIfInView(animatedElements);
      });
      $(window).trigger('scroll');
  
    // Add animate class (in-view) on scroll
    function checkIfInView($animationElements) {
      const windowHeight = $(window).height();
      const windowTopPosition = $(window).scrollTop();
      const windowBottomPosition = (windowTopPosition + windowHeight);
  
      $.each($animationElements, function() {
        const $element = $(this);
        const elementHeight = $element.outerHeight();
        const elementTopPosition = $element.offset().top;
        const elementBottomPosition = (elementTopPosition + elementHeight);
  
        // Check to see if this current container is within viewport
        if ((elementBottomPosition >= windowTopPosition) &&
            (elementTopPosition <= windowBottomPosition)) {
          $element.addClass('in-view');
        } else {
          // Del animate class when element is out of screen
          // $element.removeClass('in-view');
        }
      });
    }
    
  
  });
  
}

export default absolute