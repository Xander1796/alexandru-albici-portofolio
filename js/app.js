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
    messageCopied.textContent = 'Copied!'
    messageCopied.insertAdjacentHTML('afterbegin', `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13,20a5.006,5.006,0,0,0,5-5V6.243a3.972,3.972,0,0,0-1.172-2.829L14.586,1.172A3.972,3.972,0,0,0,11.757,0H7A5.006,5.006,0,0,0,2,5V15a5.006,5.006,0,0,0,5,5ZM4,15V5A3,3,0,0,1,7,2s4.919.014,5,.024V4a2,2,0,0,0,2,2h1.976c.01.081.024,9,.024,9a3,3,0,0,1-3,3H7A3,3,0,0,1,4,15ZM22,8V19a5.006,5.006,0,0,1-5,5H8a1,1,0,0,1,0-2h9a3,3,0,0,0,3-3V8a1,1,0,0,1,2,0Z"/></svg>
    `);
    body.prepend(messageCopied);
    
    messageCopiedTimeoutFunction = setTimeout(function() {
      body.querySelector('.message-copied').remove();
    }, 4000);
}));

let navObserverCallback = function(entries) {
  let [entry] = entries;
console.log(entry)
  if(entry.isIntersecting) {
      if(nav.classList.contains('nav-fixed') ) nav.classList.add('remove-nav-fixed');

      setTimeout(function() {
        nav.classList.remove('remove-nav-fixed');
        nav.classList.remove('nav-fixed');
        heroSection.classList.remove('hero-section-margin');
      }, 300);
    } else {
      entry.boundingClientRect.top
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
    navLinks.classList.toggle('ham-menu-overlay');

    setTimeout(() => {
      navLinks.querySelector('ul').classList.toggle('ham-menu-open');
    }, 0);

    body.classList.toggle('stop-scrolling');
  };

  if(e.target.classList.contains('close-ham-button') || e.target.classList.contains('nav-link-target') || e.target.classList.contains('nav-links')) {
    navLinks.classList.remove('ham-menu-open');

    setTimeout(() => {
      navLinks.classList.toggle('ham-menu-overlay');
    }, 200);

    navLinks.querySelector('ul').classList.remove('ham-menu-open');
    body.classList.remove('stop-scrolling');
    body.style.width = 'auto';
  };
});

const navLink = [...document.querySelectorAll('.nav-link')];
let allLink = [...navLink];

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







