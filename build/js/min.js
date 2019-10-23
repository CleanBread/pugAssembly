(function () {
    'use strict';

    var activate = function activate(blockMain, blockItem, className) {
      var addedClass = className || 'active';
      var block = document.querySelector("[data-block=\"".concat(blockMain, "\"]")),
          categoryItems = block.querySelectorAll("[data-item=\"".concat(blockItem, "\"]"));
      categoryItems.forEach(function (element) {
        element.addEventListener('click', function (evt) {
          evt.stopPropagation();
          var actived = block.querySelectorAll("[data-item=\"".concat(blockItem, "\"].active"));
          element.classList.add(addedClass);
          actived.forEach(function (item) {
            item.classList.remove(addedClass);
          });
        });
      });
    };

    var opened = function opened(item, btnDataClass, className, toggle, once, overflow) {
      var addedClass = className || 'opened';
      var block = document.querySelectorAll(item);
      block.forEach(function (element) {
        if (toggle) {
          var btn = element.querySelector("[data-btn=\"".concat(btnDataClass, "\"]")) || element;
          btn.addEventListener('click', function (evt) {
            evt.stopPropagation();

            if (once) {
              var actived = document.querySelectorAll("".concat(item, ".").concat(className));
              actived.forEach(function (item) {
                item.classList.remove(className);
              });
            }

            element.classList.toggle(addedClass);
          });
        } else {
          var openBtn = element.querySelector("[data-btn-open=\"".concat(btnDataClass, "\"]")) || element,
              closeBtns = element.querySelectorAll("[data-btn-close=\"".concat(btnDataClass, "\"]"));
          openBtn.addEventListener('click', function (evt) {
            evt.stopPropagation();
            element.classList.add(addedClass);

            if (overflow) {
              document.body.style.overflow = 'hidden';
            }
          });
          closeBtns.forEach(function (item) {
            item.addEventListener('click', function (evt) {
              evt.stopPropagation();
              element.classList.remove(addedClass);
              document.body.style.overflow = 'auto';
            });
          });
        }
      });
    };

    var absolute = function absolute() {
      $(document).ready(function () {
        $('.js-tabs').on('click', '.js-tabs__switch:not(.active)', function (e) {
          e.preventDefault(); //remember scroll position

          var initialScrollPos = $(window).scrollTop();
          $(this).addClass('active').siblings().removeClass('active').closest('.js-tabs').find('.js-tabs__content').removeClass('active').eq($(this).index()).addClass('active');
          var tabsInput = $(this).closest('.js-tabs').find('.js-tabs-value');
          tabsInput.val($(this).text()); // prevent scroll jumping when tab change

          window.scrollTo(0, initialScrollPos);
        }); // animations

        var animatedElements = $(".js-animated");
        $(window).on('scroll resize', function () {
          checkIfInView(animatedElements);
        });
        $(window).trigger('scroll'); // Add animate class (in-view) on scroll

        function checkIfInView($animationElements) {
          var windowHeight = $(window).height();
          var windowTopPosition = $(window).scrollTop();
          var windowBottomPosition = windowTopPosition + windowHeight;
          $.each($animationElements, function () {
            var $element = $(this);
            var elementHeight = $element.outerHeight();
            var elementTopPosition = $element.offset().top;
            var elementBottomPosition = elementTopPosition + elementHeight; // Check to see if this current container is within viewport

            if (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition) {
              $element.addClass('in-view');
            }
          });
        }
      });
    };

    var increaseNumb = function increaseNumb() {
      var infBlock = document.querySelector('[data-block="numbers"]');
      var numbers;

      if (infBlock) {
        numbers = infBlock.querySelectorAll('.js-number');
      }

      var setValue = function setValue(elem, value, shift, speed) {
        var interval = false;
        interval = setInterval(function () {
          if (elem.innerHTML * 1 + shift >= value) {
            elem.innerHTML = value;
            clearInterval(interval);
          } else {
            elem.innerHTML = elem.innerHTML * 1 + shift;
          }
        }, speed);
      };

      numbers.forEach(function (item, i) {
        var numb = item.getAttribute('data-number');
        setValue(item, numb, 1, numb > 100 ? 5 : 80);
      });
    };

    (function () {
      absolute();
      opened('[data-block="partners"]', 'morePartners');
      activate('listFirst', 'listFirst');
    })();

    (function () {
      var box = document.querySelector('[data-block="numbers"]');
      var config = {
        threshold: 0.5
      };
      var observer = new IntersectionObserver(function (entries, self) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            increaseNumb();
            self.unobserve(entry.target);
          }
        });
      }, config);
      observer.observe(box);
    })();

}());
