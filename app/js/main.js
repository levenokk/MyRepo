$(function () {

    $('.slider__wrapper-inner').slick({
        nextArrow: '<a href="#" class="slider-next"><i class="fas fa-chevron-right"></i></a>',
        prevArrow: '<a href="#" class="slider-prev"><i class="fas fa-chevron-left"></i></a>',
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
    });

    $('.our-clients-slider__inner').slick({
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
    });

    let prevThis;

    $('.toggle__title-wrapper').on('click', function () {
        if (this === prevThis) return;

        for (let i of $('.toggle__title-wrapper').closest('.toggle-item').find('.toggle__content')) {
            if ($(i).hasClass('active')) {
                $(i).removeClass('active').slideToggle();
                $('.toggle__title-wrapper').removeClass('active');
            }
        }

        $(this).toggleClass('active').closest('.toggle-item').find('.toggle__content').addClass('active').slideToggle()
        prevThis = this;
    })

    $('.load-article').on('click', function () {
        $('.post:first-child').clone(true).appendTo('.blog__block').css({ opacity: 0 }).animate({ opacity: 1 }, 500);
    });

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > $(this).height()) {
            $('.up-arrow').addClass('active');
        } else {
            $('.up-arrow').removeClass('active');
        }

    })

    $('.nav__btn').on('click', function () {
        $('.header__nav').slideToggle();
    })
});
