$(function () {

  $('.customer__inner').slick({
    prevArrow: '<button class="customer__arrow-left" ><img src="images/arrow-slider-left.png" alt=""></button>',
    nextArrow: '<button class="customer__arrow-right" ><img src="images/arrow-slider-right.png" alt=""></button>',
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          arrows: false,
        }
      },
      {
        breakpoint: 700,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },

    ]
  });

  $('.customer__card-btn ').click(function () {
    $(this).toggleClass('active')
    $(this).prev(".customer__card-text").toggleClass('active')
    if (!$(this).data('status')) {
      $(this).data('status', true).html('Закрыть');
    } else {
      $(this).data('status', false).html('Читать весь отзыв');
    }
  });

  $(".customer__card-text").each(function (indx, el) {
    var b = $(el),
      max = el.scrollHeight
    a = b.next(".customer__card-btn")
    if (max <= 98) a.addClass("noy");
  });

  $('.services__inner').slick({
    // dots: true
    prevArrow: '<button class="services__arrow-left" ><img src="images/arrow-slider-right.png" alt=""></button>',
    nextArrow: '<button class="services__arrow-right" ><img src="images/arrow-slider-left.png" alt=""></button>',
    autoplaySpeed: 4000,
    infinite: false,
    fade: true,
    responsive: [
      {
        breakpoint: 650,
        settings: {
          arrows: false,
        }
      },
      {
        breakpoint: 450,
        settings: {
          arrows: false,
        }
      },
    ]
  });

  $('.services__inner').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $('#external-buttons a.active').removeClass('active');
    $('#external-buttons a').eq(nextSlide).addClass('active');
  });


  $('#external-buttons a').on('click', function (e) {
    e.preventDefault();
    $('#external-buttons a.active').removeClass('active');
    $(this).addClass('active');
    var targetSlide = $(this).data('target');
    $('.slick-slider').slick('slickGoTo', targetSlide);
  });//click()



  $('.header__burger').on('click', function () {
    $('.header__burger, .header__nav').toggleClass("active");
    $('body').toggleClass('no-scroll');

  });
  $('.nav__link').on('click', function () {
    $('.header__burger, .header__nav').removeClass("active");
    $('body').removeClass('no-scroll');
  });

  $('.header__tel-link').on('click', function () {
    $('.header__burger, .header__nav').removeClass("active");
    $('body').removeClass('no-scroll');
  });

  $(document).on("click", ".nav__link", function (e) {
    e.preventDefault();
    var id = $(this).attr('href');
    var top = $(id).offset().top; // получаем координаты блока
    $('body, html').animate({ scrollTop: top }, 2800); // плавно переходим к блоку
  });

  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
      center: [59.893304, 30.316722],
      zoom: 14
    }, {
      searchControlProvider: 'yandex#search'
    }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'г. Москва, Преображенская площадь, 8',

      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'images/care.png',
        // Размеры метки.
        iconImageSize: [54, 72],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-10, -38]
      });
    myMap.geoObjects
      .add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
  });

})
