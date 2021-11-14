'use strict';

const body = document.querySelector('body');
const copyButton = document.querySelectorAll('.copy-button');
const hoverExternalLinkIcon = document.querySelector('.hover-external-link-icon');
const wave = document.querySelector('.section-wave-delimitator-svg');
const nav = document.querySelector('nav');
const navLinks = document.querySelector('.nav-links');
const navLinkUnderlinePath = document.querySelectorAll('.nav-link-underline-path');
const heroSectionAnimElement = document.querySelectorAll('.hero-section-anim-element');
const menuButton = document.querySelector('.menu-button');
const closeMenuButton = document.querySelector('.close-menu-button');
const projectsLinks = document.querySelectorAll('.hover-external-link');
const heroSection = document.querySelector('.hero-section');
const featuredProject = document.querySelectorAll('.featured-project');
const featuredProjectName = document.querySelectorAll('.featured-project-name');
const mailSvg = document.querySelector('#mail-svg')
const contactSvgMail = document.querySelector('#contact-svg-mail');
const contactSvgPath = document.querySelector('#contact-svg-path');

// window.addEventListener('scroll', function() { 
//     let distanceFromTop = body.getBoundingClientRect().top;
//     wave.style.transform = `translateX(${distanceFromTop}px)`;
// });

heroSectionAnimElement.forEach((anim, i) => {
  anim.style.animation = `hero-section-anim .4s ${.2 * i}s cubic-bezier(.61,.09,.54,.97) forwards`;
});

projectsLinks.forEach((link) => {
    link.addEventListener('mousemove', function(e) {
      let pageX = e.pageX;
      let pageY = e.pageY;
     
      hoverExternalLinkIcon.classList.add('hover-external-link-icon-visible');

      hoverExternalLinkIcon.style.left = `${pageX}px`;
      hoverExternalLinkIcon.style.top = `${pageY - 110}px`;
    });
});

projectsLinks.forEach((link) => {
    link.addEventListener('mouseleave', function() {
        hoverExternalLinkIcon.classList.remove('hover-external-link-icon-visible');
    });
});

let messageCopiedTimeoutFunction;

copyButton.forEach(button => button.addEventListener('click', async function() {
    await navigator.clipboard.writeText(button.parentElement.dataset.copy);

    if(body.querySelector('.message-copied')) {
      clearTimeout(messageCopiedTimeoutFunction);
      body.querySelector('.message-copied').remove();
    };

    const messageCopied = document.createElement('div');
    messageCopied.classList.add('message-copied');
    messageCopied.insertAdjacentHTML('afterbegin', `
    <img src="svgs/copy-icon.svg" alt=""> Copied to clipboard!
    `);
    body.prepend(messageCopied);
    
    messageCopiedTimeoutFunction = setTimeout(function() {
      body.querySelector('.message-copied').remove();
    }, 4000);
}));

let navObserverCallback = function(entries) {
  let [entry] = entries;
console.log(entry)
  if(nav.classList.contains('nav-fixed')) {
      nav.classList.add('remove-nav-fixed');
      setTimeout(function() {
        nav.classList.remove('remove-nav-fixed');
        nav.classList.remove('nav-fixed');
        heroSection.classList.remove('hero-section-margin');
      }, 300);
    } else if(Math.sign(entry.boundingClientRect.top) === -1) {
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
    body.classList.add('stop-scrolling');
  };

  if(e.target.classList.contains('close-ham-button') || e.target.classList.contains('nav-link-target')) {
    navLinks.classList.remove('ham-menu-open');
    body.classList.remove('stop-scrolling');
    body.style.width = 'auto';
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

let featuredProjectNameObserver = new IntersectionObserver(function(entries) {
  let [entry] = entries;

  if(entry.isIntersecting) {
    entry.target.parentElement.classList.add('featured-project-name-wrapper-active');
    entry.target.parentElement.classList.add('featured-project-name-wrapper-active');
    entry.target.classList.add('featured-project-name-active');
  };

}, {root:null, threshold: 1});

featuredProjectName.forEach(name => featuredProjectNameObserver.observe(name));

let featuredProjectObserver = new IntersectionObserver(function(entries) {
  let [entry] = entries;
  
  if(entry.isIntersecting) entry.target.classList.add('featured-project-active');

}, {root: null, threshold: [.3, .4]});

featuredProject.forEach(project => featuredProjectObserver.observe(project));

const contactSvgObserver = new IntersectionObserver(function(entries) {
  let [entry] = entries;

  if(entry.isIntersecting) {
    contactSvgPath.style.animation = 'contact-svg-path 1.3s ease forwards';
    contactSvgMail.style.animation = 'contact-svg-mail 0.7s 0.9s ease forwards';
  };
}, {root: null, threshold: .75});

contactSvgObserver.observe(mailSvg);

document.addEventListener('keydown', function(e) {
  if(e.key === 'Escape' && navLinks.classList.contains('ham-menu-open')) navLinks.classList.remove('ham-menu-open');
});




