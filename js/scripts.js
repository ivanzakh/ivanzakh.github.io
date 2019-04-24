(function ($) {

  // Remove no-js class
  $('html').removeClass('no-js');

  // Animate to section when nav is clicked
  $('header a').click(function (e) {

    // Treat as normal link if no-scroll class
    if ($(this).hasClass('no-scroll')) return;

    e.preventDefault();
    var heading = $(this).attr('href');
    var scrollDistance = $(heading).offset().top;

    $('html, body').animate({
      scrollTop: scrollDistance + 'px'
    }, Math.abs(window.pageYOffset - $(heading).offset().top) / 3);

    // Hide the menu once clicked if mobile
    if ($('header').hasClass('active')) {
      $('header, body').removeClass('active');
    }
  });

  // Scroll to top
  $('#to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  });

  // Scroll to first element
  $('#lead-down').on('click', 'span', function () {
    var scrollDistance = $('#lead').next().offset().top;
    // $('html, body').animate({
    //     scrollTop: scrollDistance + 'px'
    // }, 500);
    window.scrollTo({
      top: scrollDistance,
      behavior: "smooth"
    });
  });

  var header = $("header"); // Меню
  var scrollPrev = 0; // Предыдущее значение скролла

  $(window).on('scroll', function () {
    var scrolled = $(window).scrollTop(); // Высота скролла в px
    var firstScrollUp = false; // Параметр начала сколла вверх
    var firstScrollDown = false; // Параметр начала сколла вниз

    // Если скроллим
    if (scrolled > 0) {
      // Если текущее значение скролла > предыдущего, т.е. скроллим вниз
      if (scrolled > scrollPrev) {
        firstScrollUp = false; // Обнуляем параметр начала скролла вверх
        // Если меню видно
        if (scrolled < header.height() + header.offset().top) {
          // Если только начали скроллить вниз
          if (firstScrollDown === false) {
            var topPosition = header.offset().top; // Фиксируем текущую позицию меню
            header.css({
              "top": topPosition + "px"
            });
            firstScrollDown = true;
          }
          // Позиционируем меню абсолютно
          header.css({
            "position": "absolute"
          });
          // Если меню НЕ видно
        } else {
          // Позиционируем меню фиксированно вне экрана
          header.css({
            "position": "fixed",
            "top": "-" + header.height() + "px"
          });
        }

        // Если текущее значение скролла < предыдущего, т.е. скроллим вверх
      } else {
        firstScrollDown = false; // Обнуляем параметр начала скролла вниз
        // Если меню не видно
        if (scrolled > header.offset().top) {
          // Если только начали скроллить вверх
          if (firstScrollUp === false) {
            var topPosition = header.offset().top; // Фиксируем текущую позицию меню
            header.css({
              "top": topPosition + "px"
            });
            firstScrollUp = true;
          }
          // Позиционируем меню абсолютно
          header.css({
            "position": "absolute"
          });
        } else {
          // Убираем все стили
          header.removeAttr("style");
        }
      }
      // Присваеваем текущее значение скролла предыдущему
      scrollPrev = scrolled;
    }
  });

  /*function autoHideHeader() {
    currentTop = $(window).scrollTop();

    checkSimpleNavigation(currentTop);

    previousTop = currentTop;
    scrolling = false;
  }

  function checkSimpleNavigation(currentTop) {
    //there's no secondary nav or secondary nav is below primary nav
    if (previousTop - currentTop > scrollDelta) {
      //if scrolling up...
      mainHeader.removeClass('is-hidden');
    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
      //if scrolling down...
      mainHeader.addClass('is-hidden');
    }
  }*/

  // Create timeline
  $('#experience-timeline').each(function () {

    $this = $(this); // Store reference to this
    $userContent = $this.children('div'); // user content

    // Create each timeline block
    $userContent.each(function () {
      $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
    });

    // Add icons to each block
    $this.find('.vtimeline-point').each(function () {
      $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
    });

    // Add dates to the timeline if exists
    $this.find('.vtimeline-content').each(function () {
      var date = $(this).data('date');
      if (date) { // Prepend if exists
        $(this).parent().prepend('<span class="vtimeline-date">' + date + '</span>');
      }
    });

  });

  // Open mobile menu
  $('#mobile-menu-open').click(function () {
    $('header, body').addClass('active');
  });

  // Close mobile menu
  $('#mobile-menu-close').click(function () {
    $('header, body').removeClass('active');
  });

  // Load additional projects
  $('#view-more-projects').click(function (e) {
    e.preventDefault();
    $(this).fadeOut(300, function () {
      $('#more-projects').fadeIn(300);
    });
  });

  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.getElementById('lead').style.setProperty('--vh', `${vh}px`);

  // We listen to the resize event
  window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.getElementById('lead').style.setProperty('--vh', `${vh}px`);
  });

  particlesJS('lead-overlay', {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 600
        }
      },
      "color": {
        "value": "#000000"
      },
      "shape": {
        "type": "triangle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#000000",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 150,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#ededed",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

  );

})(jQuery);
