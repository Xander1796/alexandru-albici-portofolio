'use strict';

const body = document.querySelector('body');
const copyButton = document.querySelectorAll('.copy-button');
const messageCopied = document.querySelector('.message-copied');
const hoverExternalLinkIcon = document.querySelector('.hover-external-link-icon');
const wave = document.querySelector('.section-wave-delimitator-svg');
const nav = document.querySelector('nav');
const navLinks = document.querySelector('.nav-links');
const navLinkUnderlinePath = document.querySelectorAll('.nav-link-underline-path');
const menuButton = document.querySelector('.menu-button');
const closeMenuButton = document.querySelector('.close-menu-button');
const projectsLinks = document.querySelectorAll('.hover-external-link');
const heroSection = document.querySelector('.hero-section');

let scrollDirectionCounter = 0;

window.addEventListener('scroll', function() { 
    let distanceFromTop = body.getBoundingClientRect().top;
    wave.style.transform = `translateX(${distanceFromTop}px)`;
});

projectsLinks.forEach((link) => {
    link.addEventListener('mousemove', function(e) {
      let pageX = e.pageX;
      let pageY = e.pageY;
     
      hoverExternalLinkIcon.classList.add('hover-external-link-icon-visible');

      hoverExternalLinkIcon.style.left = `${pageX}px`;
      hoverExternalLinkIcon.style.top = `${pageY - 115}px`;
    });
});

projectsLinks.forEach((link) => {
    link.addEventListener('mouseleave', function() {
        hoverExternalLinkIcon.classList.remove('hover-external-link-icon-visible');
    });
});


copyButton.forEach(button => button.addEventListener('click', async function() {
    await navigator.clipboard.writeText(button.parentElement.dataset.copy);
    messageCopied.classList.add('message-copied-active');

    setTimeout(function() {
        messageCopied.classList.remove('message-copied-active');
    }, 4000);
}));

let navObserverCallback = function(entries) {
  let [entry] = entries;

  if(entry.isIntersecting)  {
      nav.classList.add('remove-nav-fixed');
      setTimeout(function() {
        nav.classList.remove('remove-nav-fixed');
        nav.classList.remove('nav-fixed');
        heroSection.classList.remove('hero-section-margin')
      }, 300);
    } else {
      nav.classList.add('nav-fixed');
      heroSection.classList.add('hero-section-margin');
  };
};

const navObserver = new IntersectionObserver(navObserverCallback, {
    root: null,
    threshold: 0
});

navObserver.observe(heroSection);

nav.addEventListener('click', function(e) {
  if(e.target.classList.contains('ham-button')) {
    navLinks.classList.add('ham-menu-open');
  };

  if(e.target.classList.contains('close-ham-button') || e.target.classList.contains('nav-link-target')) {
    navLinks.classList.remove('ham-menu-open');
  };
});

const navLink = [...document.querySelectorAll('.nav-link')];
let allLink = [...navLink];

navLink.forEach((link, i) => {
  link.addEventListener('click', function(e) {
    for(const path of navLinkUnderlinePath) {
      path.classList.remove('nav-link-underline-path-active');
      path.classList.add('nav-link-underline-path-inactive');
    }
    let targetedLink = navLink.indexOf(link);
    navLinkUnderlinePath[targetedLink].classList.remove('nav-link-underline-path-inactive');
    navLinkUnderlinePath[targetedLink].classList.add('nav-link-underline-path-active');
  });
});

const navLinkObserverTarget = [...document.querySelectorAll('.nav-link-observer-target')];
let sectObs = function(entries) {
  let [entry] = entries;
  for(const path of navLinkUnderlinePath) {
    path.classList.remove('nav-link-underline-path-active');
    path.classList.add('nav-link-underline-path-inactive');
  }
  let targetedLink = navLinkObserverTarget.indexOf(entry.target);
  navLinkUnderlinePath[targetedLink].classList.remove('nav-link-underline-path-inactive');
  navLinkUnderlinePath[targetedLink].classList.add('nav-link-underline-path-active');
};

let sectionObs = new IntersectionObserver(sectObs, {root: null, threshold: 1});

navLinkObserverTarget.forEach((sect) => sectionObs.observe(sect));

document.addEventListener('keydown', function(e) {
  if(e.key === 'Escape' && navLinks.classList.contains('ham-menu-open')) navLinks.classList.remove('ham-menu-open');
});

