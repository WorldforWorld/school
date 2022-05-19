$(window).scroll(function() {
  if ($(this).scrollTop() > 100) {
      if ($('#upbutton').is(':hidden')) {
          $('#upbutton').css({opacity : 1}).fadeIn('slow');
      }
  } else { $('#upbutton').stop(true, false).fadeOut('fast'); }
});
$('#upbutton').click(function() {
    $('html, body').stop().animate({scrollTop : 0}, 800);
});
/* -------------------------------------------------- */
document.addEventListener("touchstart", function(){}, true);
var modal = $('.modal'),
message = $('.message'),
error = $('.error'),
modalBtn = $('.header__list__goin__title'),
closelBtn = $('.modal__close'),
closelMessageBtn = $('.message__close'),
closelErrorBtn = $('.error__close'),
modalHidden = $('.modal__dialog');
modalHiddenMessage = $('.message__dialog');
modalHiddenError = $('.error__dialog');

modalBtn.on('click', function () {
modal.toggleClass('modal--visible');
});
closelBtn.on('click', function () {
modal.toggleClass('modal--visible');
});
closelMessageBtn.on('click', function () {
message.toggleClass('message--visible');
});
closelErrorBtn.on('click', function () {
  error.toggleClass('error--visible');
});
/* --------------------------------- */

/* --------------------------------- */
jQuery(function($){
  modal.mouseup(function (e){ // событие клика по веб-документу
    if (!modalHidden.is(e.target) && modalHidden.has(e.target).length === 0) { //если клик был не по нашему блоку и не по его дочерним элементам
      modal.toggleClass('modal--visible');// скрываем его
    }
  });
  message.mouseup(function (e){ // событие клика по веб-документу
    if (!modalHiddenMessage.is(e.target) && modalHiddenMessage.has(e.target).length === 0) { //если клик был не по нашему блоку и не по его дочерним элементам
      message.toggleClass('message--visible');// скрываем его
    }
  });
  error.mouseup(function (e){ // событие клика по веб-документу
    if (!modalHiddenError.is(e.target) && modalHiddenError.has(e.target).length === 0) { //если клик был не по нашему блоку и не по его дочерним элементам
      error.toggleClass('error--visible');// скрываем его
    }
  });
});

/* -------------------------------------------------- */
// Валидация формы
$(document).ready(function () {
$('.modal__form').validate({
  errorClass: "invalid",
  rules: {
    // строчное правило
    userPhone: {
      required: true,
      minlength: 2,
      maxlength: 15
    },
    userEmail: {
      required: true,
      minlength: 6,
      maxlength: 15,
      email: false
    },
  }, // сообщения
  errorElement: "div",
  messages: {
    userPhone: {
      required:"Заполните поле",
      minlength: "Логин не короче двух букв"
    },
    userEmail: {
      required: "Заполните поле",
      minlength: "Пароль не короче шести символов"
    }
  },
  submitHandler: function(form) {
    $.ajax({
      type: "POST",
      url: "send.php",
      data: $(form).serialize(),
      success: function (response) {
        message.toggleClass('message--visible');
        let nameMessage = $('.message__text');
        nameMessage.text(nameMessage.text() + ', ' +  $('#modal-user-phone').val());
        $(form)[0].reset();
        modal.removeClass('modal--visible');
      },
      error: function (response) {
        modal.removeClass('modal--visible');
        error.toggleClass('error--visible');
        $(form)[0].reset();
        console.error('Ошибка запроса ' + response);
      }
    });
  }
});
});
/* -------------------------------------------------- */
var lazyloadImages = document.querySelectorAll("img.lazy");    
var lazyloadThrottleTimeout;
function lazyload () {
  if(lazyloadThrottleTimeout) {
    clearTimeout(lazyloadThrottleTimeout);
  }    
  lazyloadThrottleTimeout = setTimeout(function() {
      var scrollTop = window.pageYOffset;
      lazyloadImages.forEach(function(img) {
          if(img.offsetTop < (window.innerHeight + scrollTop)) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
          }
      });
      if(lazyloadImages.length == 0) { 
        document.removeEventListener("scroll", lazyload);
        window.removeEventListener("resize", lazyload);
        window.removeEventListener("orientationChange", lazyload);
      }
  }, 20);
}
document.addEventListener("scroll", lazyload);
window.addEventListener("resize", lazyload);
window.addEventListener("orientationChange", lazyload);

var swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
var swiper1 = new Swiper('.brand__swiper__container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
// Слайдер сервисы платформ
var swiper22 = new Swiper('.services__container', {
  slidesPerView: 'auto',
  slidesPerGroup: 1,
  updateOnWindowResize: true,
  setWrapperSize: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
swiper22.init();
// Слайдер вам так же могут понадобиться
var swiper23 = new Swiper('.services__container--one', {
  slidesPerView: 'auto',
  slidesPerGroup: 1,
  updateOnWindowResize: true,
  setWrapperSize: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
swiper23.init();
// Способ доставки
var curr = $('.product__deliverymethod__first');
$('.product__deliverymethod__nav input[type="radio"]').on('change', function() {
  curr.hide();
  curr = $('.' + $('.product__deliverymethod__nav input[type="radio"]:checked').val() );
  curr.show();
});
// Пагинация
if($( '.catalog__rows' ).hasClass( 'popgoods__rows' )) {
  var items = $('.list-wrapper .list-item');
  var numItems = items.length;
  var perPage = 15;
  items.slice(perPage).hide();
  $('#pagination-container').pagination({
    items: 300,
    itemsOnPage: 10,
    prevText: "&laquo;",
    nextText: "&raquo;",
    onPageClick: function (pageNumber) {
      var showFrom = perPage * (pageNumber - 1);
      var showTo = showFrom + perPage;
      items.hide().slice(showFrom, showTo).show();
    }
  });
}
// Часы
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}
function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');
  function updateClock() {
    var t = getTimeRemaining(endtime);
    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }
  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}
var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000); // for endless timer
if($( '#countdown' ).hasClass( 'timer__wraps' )) {
initializeClock('countdown', deadline);
}

 