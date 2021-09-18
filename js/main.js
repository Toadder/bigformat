function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

function _removeClass(array, removedClass) {
  for (let el of array) el.classList.remove(removedClass);
}

function _addClass(array, addedClass) {
  for (let el of array) el.classList.add(addedClass);
}

function ymap() {
  let sectionMap = document.querySelector(".map");

  function ymapInit() {
    if (typeof ymaps === "undefined") return;
    let ymap = document.getElementById("ymap");

    ymaps.ready(function () {
      let map = new ymaps.Map("ymap", {
        center: [55.9823072874419,92.89464922321378],
        zoom: 16,
        controls: ["zoomControl"],
        behaviors: ["drag"],
      });

      // Placemark
      let placemark = new ymaps.Placemark(
        [55.98332756875584,92.89800849999992],
        {
          // Hint
          hintContent: "BIGFORMAT",
        },
        {
          iconLayout: "default#image",
          iconImageHref: "img/marker.svg",
          iconImageSize: [75, 92],
          iconImageOffset: [-40, -95],
        }
      );

      function onResizeMap() {
        if (window.innerWidth < "767") {
          //Set New center
          map.setCenter([55.98365058108414,92.89771761825823]);
        } else if (window.innerWidth < "992") {
          map.setCenter([55.9836064830893,92.89366217029631]);
        } else {
          map.setCenter([55.9823072874419,92.89464922321378]);
        }
      }
      onResizeMap();

      map.geoObjects.add(placemark);

      window.onresize = function () {
        onResizeMap();
      };
    });
  }

  window.addEventListener("scroll", checkYmapInit);
  checkYmapInit();

  function checkYmapInit() {
    let sectionMapTop = sectionMap.getBoundingClientRect().top;
    let scrollTop = window.pageYOffset;
    let sectionMapOffsetTop = sectionMapTop + scrollTop;

    if (scrollTop + window.innerHeight > sectionMapOffsetTop) {
      ymapLoad();
      window.removeEventListener("scroll", checkYmapInit);
    }
  }

  function ymapLoad() {
    let script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
    document.body.appendChild(script);
    script.onload = ymapInit;
  }
}

var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

function formAddError(el) {
  el.classList.add("_error");
  el.parentElement.classList.add("_error");
}

function formRemoveError(el) {
  el.classList.remove("_error");
  el.parentElement.classList.remove("_error");
}

function emailTest(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(input.value);
}

function popup() {
  const popupLinks = document.querySelectorAll(".popup-link");
  const body = document.querySelector("body");
  const lockPadding = document.querySelectorAll(".lock-padding");
  let unlock = true;
  const timeout = 800;

  if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
        const popupName = popupLink.getAttribute("href").replace("#", "");
        const currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);
        e.preventDefault();
      });
    }
  }

  const popupCloseIcon = document.querySelectorAll(".close-popup");
  if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener("click", function (e) {
        popupClose(el.closest(".popup"));
        e.preventDefault();
      });
    }
  }

  function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
      const popupActive = document.querySelector(".popup._open");
      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }
      currentPopup.classList.add("_open");
      currentPopup.addEventListener("click", function (e) {
        if (!e.target.closest(".popup__content")) {
          popupClose(e.target.closest(".popup"));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove("_open");
      if (doUnlock) {
        bodyUnlock();
      }
    }
  }

  function bodyLock() {
    const lockPaddingValue =
      window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add("_lock");

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnlock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = "0px";
        }
      }
      body.style.paddingRight = "0px";
      body.classList.remove("_lock");
    }, timeout);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  document.addEventListener("keydown", function (e) {
    if (e.which === 27) {
      const popupActive = document.querySelector(".popup._open");
      popupClose(popupActive);
    }
  });
}

// Phone mask
function phoneMask() {
  let phoneInputs = document.querySelectorAll("input[data-tel-input]");

  for (let phoneInput of phoneInputs) {
    phoneInput.addEventListener("keydown", onPhoneKeyDown);
    phoneInput.addEventListener("input", onPhoneInput, false);
    phoneInput.addEventListener("paste", onPhonePaste, false);
  }

  function getInputNumbersValue(input) {
    // Return stripped input value — just numbers
    return input.value.replace(/\D/g, "");
  }

  function onPhonePaste(e) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input);
    let pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      let pastedText = pasted.getData("Text");
      if (/\D/g.test(pastedText)) {
        // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
        // formatting will be in onPhoneInput handler
        input.value = inputNumbersValue;
        return;
      }
    }
  }

  function onPhoneInput(e) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input),
      selectionStart = input.selectionStart,
      formattedInputValue = "";

    if (!inputNumbersValue) {
      return (input.value = "");
    }

    if (input.value.length != selectionStart) {
      // Editing in the middle of input, not last symbol
      if (e.data && /\D/g.test(e.data)) {
        // Attempt to input non-numeric symbol
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == "9")
        inputNumbersValue = "7" + inputNumbersValue;
      let firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
      formattedInputValue = input.value = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
  }

  function onPhoneKeyDown(e) {
    // Clear input after remove last symbol
    let inputValue = e.target.value.replace(/\D/g, "");
    if (e.keyCode == 8 && inputValue.length == 1) {
      e.target.value = "";
    }
  }
}




jQuery(document).ready(function($) {
  phoneMask();
  ymap();
  popup();

  if (window.matchMedia("(max-width: 800px)").matches) {
    const bullets = $('.about__bullets');
    $('.about__block').append(bullets);
    $('.about__content').remove(bullets);
  }
  // Steps
  (function() {
    if(!isMobile.any()) {
      $('.item-step__number').mouseenter(function(event) {
          
        if(!$(this).hasClass('_hovered')) {
          const number = +$(this).text();
          const title = $(this).next().text();
          const index = $(this).parent().index() + 1;

          $('.item-step').slice(0, index).find('.item-step__number').addClass('_hovered');
          $('.step__number span').text(number);
          $('.step__title').text(title);
        } 

      });

      $('.item-step__number').mouseleave(function(event) {
        $('.item-step__number').removeClass('_hovered');
        $('.step__number span').text(document.querySelectorAll('.item-step').length);
        $('.step__title').text($('.step__title').data('text'));
      });
    } else {
      window.addEventListener("scroll", checkStepsScroll);
      checkStepsScroll();
    }

    function checkStepsScroll() {
      var blockPosition = $('.step').offset().top,
        windowScrollPosition = $(window).scrollTop() + $('.step').css('padding-top').replace('px', '') * 1.5 + $('.header').outerHeight();

        console.log();
      
      if( blockPosition < windowScrollPosition && blockPosition + $('.step').outerHeight() > windowScrollPosition) {
        stepStart();

        window.removeEventListener('scroll', checkStepsScroll);
      } 

    }

    function stepStart() {
      let steps = document.querySelectorAll('.item-step');
      let i = 0;

      let interval = setInterval(() => {
        if(i >= steps.length) {
          clearInterval(interval);
          setTimeout(() => {$('.step__title').text($('.step__title').data('text'));}, 1500);
        }
        else {
          let step = steps[i];
          let number = +step.querySelector('.item-step__number').innerHTML;
          let title = step.querySelector('.item-step__text').innerHTML;

          step.querySelector('.item-step__number').classList.add('_hovered');
          $('.step__number span').text(number);
          $('.step__title').text(title);

          i++;
        }

      }, 1500);
    }


  })();

  // _Card-popup
  (function() {
    $('._card-popup').click(function(e) {
      const title = $(this).find('._card-popup__title').text();
      const text = $(this).find('._card-popup__text').html();
      const srcImg = $(this).find('._card-popup__img img').attr('src').split('.');

      $('.popup-info__title').text(title);
      $('.popup-info__text').html(text);
      $('.popup-info__img source').attr('srcset', `${srcImg[0]}-big.webp`);
      $('.popup-info__img img').attr('src', `${srcImg[0]}-big.${srcImg[1]}`);

    });
  })();
  
  // Form Validation & Send
  (function() {
    const forms = document.querySelectorAll("form");
    for (var i = 0; i < forms.length; i++) {
      form = forms[i];

      form.addEventListener("submit", formSend);
    }
    async function formSend(e) {
      e.preventDefault();
      let form = e.currentTarget;


      let error = formValidate(form);

      if (error === 0) {
        // ОТПРАВКА ФОРМЫ
      }
    }
    function formValidate(form) {
      let error = 0;
      let formReq = form.querySelectorAll("._req");

      for (var i = 0; i < formReq.length; i++) {
        const input = formReq[i];
        formRemoveError(input);

        if (input.classList.contains("_email")) {
          if (!emailTest(input)) {
            formAddError(input);
            error++;
          }
        } else if(input.getAttribute('type') == 'checkbox' && input.checked === false) {
          formAddError(input);
          error++;
        } else {
          if(input.value == '') {
            formAddError(input);
            error++;
          }
        }
      }

      return error;
    }
  })();

  // Show all --> "Мы предлагаем"
  (function() {
    let count = $(window).width() <= 767 ? 8 : $(window).width() <= 1200 ? 9 : 10;
    $('.card-suggest').slice(0, count).css('display', 'flex');
    let closed = true;
    
    $('.suggest__btn').click(function(e) {
      e.preventDefault();
      
      if(closed) {
        $('.card-suggest:hidden').slice(0).fadeIn().css('display', 'flex');
        $(this).html('Свернуть');
        closed = false;
      } else {
        $('.card-suggest').slice(count).fadeOut().css('display', 'flex');
        $(this).html('Показать все');
        closed = true;
      }
      
    });
  })();

  // Suggest card
  (function () {
    $('.card-suggest').click(function(e) {
      let title = $(this).children('.card-suggest__title').text().toLowerCase();
      $('.special__sale').text($('.special__sale').data('text') + title);
    });
  })();

  // Slider
  (function() {

    const serviceDesign = new Swiper('.card-service__slider._design', {
      allowTouchMove: true,
      speed: 800,
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      observer: true,
      observeParents: true,
      observer: true,
      observeSlideChildren: true,
      navigation: {
          nextEl: '.card-service__next_design',
          prevEl: '.card-service__prev_design',
      },
    });

    const serviceMontage = new Swiper('.card-service__slider._montage', {
      allowTouchMove: true,
      speed: 800,
      loop: true,
      effect: "fade",
      observer: true,
      observeParents: true,
      observer: true,
      fadeEffect: {
        crossFade: true,
      },
      observeSlideChildren: true,
      navigation: {
          nextEl: '.card-service__next._montage',
          prevEl: '.card-service__prev._montage',
      },
    });

    const serviceProduction = new Swiper('.card-service__slider._production', {
      allowTouchMove: true,
      speed: 800,
      loop: true,
      effect: "fade",
      observer: true,
      observeParents: true,
      observer: true,
      fadeEffect: {
        crossFade: true,
      },
      observeSlideChildren: true,
      navigation: {
          nextEl: '.card-service__next._production',
          prevEl: '.card-service__prev._production',
      },
    });

    const aboutSlider = new Swiper('.about__slider', {
      allowTouchMove: true,
      loopPreventsSlide: true,
      slidesPerView: 1,
      speed: 800,
      loop: true,
      autoplay: true,
      delay: 3650,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoHeight: true,
      pagination: {
        el: '.about__bullets',
        type: 'bullets',
        clickable: true,
      },
    });

    const letterSlider = new Swiper('.slider-letter', {
      slidesPerView: 3,
      allowTouchMove: false,
      speed: 600,
      centeredSlides: true,
      loop: true,
      preventClicks: false,
      preventClicksPropagation: false,
      effect: "coverflow",
      coverflowEffect: {
        rotate: 0,
        stretch: 100,
        depth: 200,
        modifier: 3,
        slideShadows: false,
      },

      navigation: {
          nextEl: '.letter__next',
          prevEl: '.letter__prev',
      },

      pagination: {
        el: '.letter__bullets',
        type: 'bullets',
        clickable: true,
      },

      breakpoints: {
        320: {
          slidesPerView: 1,
          centeredSlides: false,
          effect: "slide",
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 3,
          centeredSlides: true,
          effect: "coverflow",
          coverflowEffect: {
            rotate: 0,
            stretch: 100,
            depth: 200,
            modifier: 3,
            slideShadows: false,
          },
        },

      }
    });

  })();

  // Tabs 
  (function() {
    $('.service__tab').click(function() {
      $('.card-service').removeClass('_active');
      $('.service__tab').removeClass('_active');

      $(this).addClass('_active');
      $('.card-service').eq($(this).index()).addClass('_active');
    });
  })();

  // Header
  (function() {
    $('.bottom-header__burger').click(function(e) {
      $('.mobile-header').addClass('_active')
      $('body').addClass('_lock');
    });

    $('.mobile-header__close svg').click(function(e) {
      $('.mobile-header').removeClass('_active')
      $('body').removeClass('_lock');
    });

    $('.top-header__city').click(function(e) {
      $('.top-header__city').next('.top-header__cities').toggleClass('_active');
    });

    document.body.addEventListener('click', function(e) {
      if (!$(e.target).closest(".top-header__location").length) {
        $('.top-header__cities').removeClass('_active');
      }
    });

    $('.top-header__cities-item').click(function(e) {
      const text = $(this).text();
      $('.top-header__cities-item').removeClass('_active');
      $(this).addClass('_active');
      $('.top-header__city .top-header__city-name').text(text);
      $();
    });
  })();

  // Anchor scroll
  (function() {
    let anchorLinks = document.querySelectorAll("a._anchor-scroll");
    if (anchorLinks.length) {
      $("a._anchor-scroll").on("click", function (e) {
        e.preventDefault();
        let anchor = $(this).attr("href");

        $('.mobile-header').removeClass('_active');
        $('body').removeClass('_lock');

        if($(this).data('tab')) {
          let uniqueClass = $(this).data('tab');

          $(`.service__tab`).removeClass('_active');
          $(`.service__tab.${uniqueClass}`).addClass('_active');

          $('.service__card').removeClass('_active');
          $('.service__card').eq($(`.service__tab.${uniqueClass}`).index()).addClass('_active');
        }

        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: $(anchor).offset().top - $(".header").outerHeight(),
            },
            1000
          );
      });
    }
  })();

});



