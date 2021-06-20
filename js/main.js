$(function () {
  window.onload = function () {
    // Получаем все элементы с дата-атрибутом data-bg
    let images = document.querySelectorAll("[data-bg]");
    // Проходимся по каждому
    for (let i = 0; i < images.length; i++) {
      // Получаем значение каждого дата-атрибута
      let image = images[i].getAttribute("data-bg");
      // Каждому найденному элементу задаем свойство background-image с изображение формата jpg
      images[i].style.backgroundImage = "url(" + image + ")";
    }

    // Проверяем, является ли браузер посетителя сайта Firefox и получаем его версию
    let isitFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
    let firefoxVer = isitFirefox ? parseInt(isitFirefox[1]) : 0;

    // Если есть поддержка Webp или браузер Firefox версии больше или равно 65
    if (canUseWebp() || firefoxVer >= 65) {
      // Делаем все то же самое что и для jpg, но уже для изображений формата Webp
      let imagesWebp = document.querySelectorAll("[data-bg-webp]");
      for (let i = 0; i < imagesWebp.length; i++) {
        let imageWebp = imagesWebp[i].getAttribute("data-bg-webp");
        imagesWebp[i].style.backgroundImage = "url(" + imageWebp + ")";
      }
    }
  };

  var lazyLoadInstance = new LazyLoad({});

  $(".customer__inner").slick({
    prevArrow:
      '<button class="customer__arrow-left" ><img src="images/arrow-slider-right.png" alt=""></button>',
    nextArrow:
      '<button class="customer__arrow-right" ><img src="images/arrow-slider-left.png" alt=""></button>',
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,
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
        },
      },
      {
        breakpoint: 700,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $(".customer__card-btn ").click(function () {
    $(this).toggleClass("active");
    $(this).prev(".customer__card-text").toggleClass("active");
    if (!$(this).data("status")) {
      $(this).data("status", true).html("Закрыть");
    } else {
      $(this).data("status", false).html("Читать весь отзыв");
    }
  });

  $(".customer__card-text").each(function (indx, el) {
    var b = $(el),
      max = el.scrollHeight;
    a = b.next(".customer__card-btn");
    if (max <= 98) a.addClass("noy");
  });

  $(".services__inner").slick({
    // dots: true
    prevArrow:
      '<button class="services__arrow-left" ><img src="images/arrow-slider-right.png" alt=""></button>',
    nextArrow:
      '<button class="services__arrow-right" ><img src="images/arrow-slider-left.png" alt=""></button>',
    autoplaySpeed: 4000,
    infinite: false,
    fade: true,
    responsive: [
      {
        breakpoint: 650,
        settings: {
          arrows: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          arrows: false,
        },
      },
    ],
  });

  $(".services__inner").on(
    "beforeChange",
    function (event, slick, currentSlide, nextSlide) {
      $("#external-buttons a.active").removeClass("active");
      $("#external-buttons a").eq(nextSlide).addClass("active");
    }
  );

  $("#external-buttons a").on("click", function (e) {
    e.preventDefault();
    $("#external-buttons a.active").removeClass("active");
    $(this).addClass("active");
    var targetSlide = $(this).data("target");
    $(".services__inner").slick("slickGoTo", targetSlide);
  }); //click()

  $(".header__burger").on("click", function () {
    $(".header__burger, .header__nav").toggleClass("active");
    $("body").toggleClass("no-scroll");
  });

  $(".nav__link").on("click", function () {
    $(".header__burger, .header__nav").removeClass("active");
    $("body").removeClass("no-scroll");
  });

  $(".header__tel-link").on("click", function () {
    $(".header__burger, .header__nav").removeClass("active");
    $("body").removeClass("no-scroll");
  });

  var sectionContacts = document.querySelector(".contacts");
  var ymapInit = function () {
    ymaps.ready(function () {
      var myMap = new ymaps.Map(
          "map",
          {
            center: [59.893304, 30.316722],
            zoom: 14,
          },
          {
            searchControlProvider: "yandex#search",
          }
        ),
        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),
        myPlacemark = new ymaps.Placemark(
          myMap.getCenter(),
          {
            hintContent: "Московский проспект, 97",
          },
          {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: "default#image",
            // Своё изображение иконки метки.
            iconImageHref: "images/care.png",
            // Размеры метки.
            iconImageSize: [54, 72],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-10, -38],
          }
        );
      myMap.geoObjects.add(myPlacemark);
      myMap.behaviors.disable("scrollZoom");
    });
  };

  var ymapLoad = function () {
    var script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=RU";
    document.body.appendChild(script);
    script.addEventListener("load", ymapInit);
  };
  var checkYamapInit = function () {
    var sectionContactsTop = sectionContacts.getBoundingClientRect().top;
    var scrollTop = window.pageYOffset;
    var sectionContactsOffsetTop = scrollTop + sectionContactsTop;

    if (scrollTop + window.innerHeight > sectionContactsOffsetTop) {
      ymapLoad();
      window.removeEventListener("scroll", checkYamapInit);
    }
  };
  window.addEventListener("scroll", checkYamapInit);
  checkYamapInit();

  $(".input-tel").inputmask("+7(999)999-9999");

  $(".form").each(function () {
    $(this).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },

        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Укажите ваше имя",
          minlength: jQuery.validator.format(
            "Ваше  имя  должно  быть  не  менее  2х символов"
          ),
        },
        email: {
          required:
            "Нам нужен ваш адрес электронной почты, чтобы с вами связаться",
          email:
            "Ваш адрес электронной почты должен быть в формате name@domain.com",
        },
        phone: {
          required: "Введите ваш номер телефона.",
        },
      },
      submitHandler: function (form) {
        $(".form-val").addClass("is-active");
        $("body").addClass("no-scroll");
        //очищаем все данные текстовых полей, кроме кнопок
        $("form input").not(":button, :submit").val("");
        $("form input.valid").removeClass("valid");
      },
    });
  });

  $(".appointment__form-form, .header-tel-form, .services__form-form").each(
    function () {
      $(this).validate({
        rules: {
          name: {
            required: true,
            minlength: 2,
          },

          email: {
            required: true,
            email: true,
          },
          phone: {
            required: true,
          },
        },
        messages: {
          name: {
            required: "Укажите ваше имя",
            minlength: jQuery.validator.format(
              "Ваше  имя  должно  быть  не  менее  2х символов"
            ),
          },
          email: {
            required:
              "Нам нужен ваш адрес электронной почты, чтобы с вами связаться",
            email:
              "Ваш адрес электронной почты должен быть в формате name@domain.com",
          },
          phone: {
            required: "Введите ваш номер телефона.",
          },
        },
        submitHandler: function (form) {
          $(".appointment__form, .form-tel, .services__form").removeClass(
            "is-active"
          );
          $(".form-form").addClass("is-active");
          $("body").addClass("no-scroll");
          // очищаем все данные текстовых полей, кроме кнопок
          $("form input").not(":button, :submit").val("");
          $("form input.valid").removeClass("valid");
        },
      });
    }
  );

  $(document).on("click", function (e) {
    // отслеживаем событие клика по веб-документу
    var block = $("form"); // определяем элемент, к которому будем применять условия (можем указывать ID, класс либо любой другой идентификатор элемента)
    if (
      !block.is(e.target) && // проверка условия если клик был не по нашему блоку
      block.has(e.target).length === 0
    ) {
      // проверка условия если клик не по его дочерним элементам
      $("form label.error").remove();
      $("form input.error").removeClass("error");

      $("form input").val("");
      $("form input.valid").removeClass("valid");
    }
  });

  $(".popup").on("click", function (e) {
    // отслеживаем событие клика по веб-документу
    var block = $(".popup__content"); // определяем элемент, к которому будем применять условия (можем указывать ID, класс либо любой другой идентификатор элемента)
    if (
      !block.is(e.target) && // проверка условия если клик был не по нашему блоку
      block.has(e.target).length === 0
    ) {
      // проверка условия если клик не по его дочерним элементам
      $(".popup").removeClass("is-active");
      $("body").removeClass("no-scroll");
    }
  });

  $(".popup-close").on("click", function () {
    $(".popup").removeClass("is-active");
    $("body").removeClass("no-scroll");
  });
  $(this).keydown(function (eventObject) {
    if (eventObject.which == 27) $(".popup").removeClass("is-active");
    $("body").removeClass("no-scroll");
  });

  $(".header__info-btn").on("click", function () {
    $(".appointment__form").addClass("is-active");
  });

  $(".header__btn").on("click", function () {
    $(".form-tel").addClass("is-active");
  });

  $(".services__btn-btn").on("click", function () {
    $(".services__form").addClass("is-active");
  });

  $(document).on("click", ".nav__link", function (e) {
    e.preventDefault();
    var id = $(this).attr("href");
    var top = $(id).offset().top; // получаем координаты блока
    $("body, html").animate({ scrollTop: top }, 1800); // плавно переходим к блоку
  });

  window.onload = function () {
    document.body.classList.add("loaded_hiding");
    window.setTimeout(function () {
      document.body.classList.add("loaded");
      document.body.classList.remove("loaded_hiding");
    }, 500);
  };
});
