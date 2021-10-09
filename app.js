'use strict';

const aboutSliderControls = document.querySelector('.about-slider-controls');
const aboutSliderTitle = document.querySelectorAll('.about-slider-title');
const aboutSliderIndicator = document.querySelectorAll('.about-slider-indicator');
const aboutSliderArrowRight = document.querySelector('.about-slider-arrow-right');
const aboutSliderArrowLeft = document.querySelector('.about-slider-arrow-left');
const aboutSlide = document.querySelectorAll('.about-slide');
const contactFormButton = document.querySelector('#contact-form-button');

// ABOUT SECTION SLIDER

let slideActive = 0;

aboutSliderControls.addEventListener('click', function(e) {
  if(e.target.classList.contains('about-slider-indicator-inactive') || e.target === aboutSliderArrowLeft || e.target === aboutSliderArrowRight) {
      
    aboutSlide[slideActive].classList.remove('about-slide-active');
    aboutSliderTitle[slideActive].classList.remove('about-slider-title-active');
    aboutSliderIndicator[slideActive].classList.remove('about-slider-indicator-active');
    aboutSliderIndicator[slideActive].classList.add('about-slider-indicator-inactive');

    if(e.target === aboutSliderArrowLeft) slideActive--;
    if(e.target === aboutSliderArrowRight) slideActive++;

    if(e.target.classList.contains('about-slider-indicator-inactive')) slideActive = Number(e.target.dataset.slide);

    if(slideActive === 0) {
        aboutSliderArrowRight.classList.remove('about-slider-arrow-inactive');
        aboutSliderArrowLeft.classList.add('about-slider-arrow-inactive');
    } else if(slideActive > 0) {
        aboutSliderArrowLeft.classList.remove('about-slider-arrow-inactive');
    }

    if(slideActive >= 0 && slideActive < aboutSliderIndicator.length - 1) {
        aboutSliderArrowRight.classList.remove('about-slider-arrow-inactive');
    } else if(slideActive === aboutSliderIndicator.length - 1) {
        aboutSliderArrowRight.classList.add('about-slider-arrow-inactive');
    }

    aboutSlide[slideActive].classList.add('about-slide-active');
    aboutSliderTitle[slideActive].classList.add('about-slider-title-active');
    aboutSliderIndicator[slideActive].classList.add('about-slider-indicator-active');
  };
});




