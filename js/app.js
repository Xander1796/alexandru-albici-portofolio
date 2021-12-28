"use strict";

const body = document.querySelector("body");
const copyButton = document.querySelectorAll(".copy-button");
const hoverExternalLinkIcon = document.querySelector(
  ".hover-external-link-icon"
);
const wave = document.querySelector(".section-wave-delimitator-svg");
const nav = document.querySelector("nav");
const navLinks = document.querySelector(".nav-links");
const navLinkUnderlinePath = document.querySelectorAll(
  ".nav-link-underline-path"
);
const heroSectionAnimElement = document.querySelectorAll(
  ".hero-section-anim-element"
);
const menuButton = document.querySelector(".menu-button");
const closeMenuButton = document.querySelector(".close-menu-button");
const projectsLinks = document.querySelectorAll(".hover-external-link");
const heroSection = document.querySelector(".hero-section");
const featuredProject = document.querySelectorAll(".featured-project");
const featuredProjectName = document.querySelectorAll(".featured-project-name");
const mailSvg = document.querySelector("#mail-svg");
const contactSvgMail = document.querySelector("#contact-svg-mail");
const contactSvgPath = document.querySelector("#contact-svg-path");

// SETTING A VARIABLE FOR THE VH UNIT

let vh;

window.addEventListener("DOMContentLoaded", function () {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  let scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty(
    "--scrollbar-width",
    `${scrollBarWidth}px`
  );
});

window.addEventListener("resize", function () {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

heroSectionAnimElement.forEach((anim, i) => {
  anim.style.animation = `hero-section-anim .4s cubic-bezier(.61,.09,.54,.97) ${
    0.2 * i
  }s forwards`;
  anim.style.animationIterationCount = "1";
});

// CREATE MESSAGE COPIED ELEMENT

let messageCopiedTimeoutFunction;

copyButton.forEach((button) =>
  button.addEventListener("click", async function () {
    await navigator.clipboard.writeText(button.dataset.copy);

    clearTimeout(messageCopiedTimeoutFunction);
    button.textContent = "Copied!";

    messageCopiedTimeoutFunction = setTimeout(function () {
      button.textContent = "copy";
    }, 3000);
  })
);

// INTERSECTION OBSERVERS

let navObserverCallback = function (entries) {
  let [entry] = entries;

  if (entry.isIntersecting) {
    if (nav.classList.contains("nav-fixed"))
      nav.classList.add("remove-nav-fixed");

    setTimeout(function () {
      nav.classList.remove("remove-nav-fixed");
      nav.classList.remove("nav-fixed");
      heroSection.classList.remove("hero-section-margin");
    }, 300);
  } else {
    entry.boundingClientRect.top;
    nav.classList.add("nav-fixed");
    heroSection.classList.add("hero-section-margin");
  }
};

const navObserver = new IntersectionObserver(navObserverCallback, {
  root: null,
  threshold: 0,
});

navObserver.observe(heroSection);

nav.addEventListener("click", function (e) {
  if (e.target.classList.contains("ham-button")) {
    navLinks.classList.toggle("ham-menu-overlay");

    setTimeout(() => {
      navLinks.querySelector("ul").classList.toggle("ham-menu-open");
    }, 0);

    body.classList.toggle("stop-scrolling");
  }

  if (
    e.target.classList.contains("close-ham-button") ||
    e.target.classList.contains("nav-link-target") ||
    e.target.classList.contains("nav-links")
  ) {
    navLinks.classList.remove("ham-menu-open");

    setTimeout(() => {
      navLinks.classList.toggle("ham-menu-overlay");
    }, 200);

    navLinks.querySelector("ul").classList.remove("ham-menu-open");
    body.classList.remove("stop-scrolling");
    body.style.width = "auto";
  }
});

const navLink = [...document.querySelectorAll(".nav-link")];
let allLink = [...navLink];

let featuredProjectNameObserver = new IntersectionObserver(
  function (entries) {
    let [entry] = entries;

    if (entry.isIntersecting) {
      entry.target.parentElement.classList.add(
        "featured-project-name-wrapper-active"
      );
      entry.target.parentElement.classList.add(
        "featured-project-name-wrapper-active"
      );
      entry.target.classList.add("featured-project-name-active");
    }
  },
  { root: null, threshold: 1 }
);

featuredProjectName.forEach((name) =>
  featuredProjectNameObserver.observe(name)
);

let featuredProjectObserver = new IntersectionObserver(
  function (entries) {
    let [entry] = entries;

    if (entry.isIntersecting) {
      if (entry.target.classList.contains("featured-project-left")) {
        entry.target.classList.add("featured-project-left-active");
      } else if (entry.target.classList.contains("featured-project-right")) {
        entry.target.classList.add("featured-project-right-active");
      }
    }
  },
  { root: null, threshold: [0.3, 0.4, 0.5] }
);

featuredProject.forEach((project) => featuredProjectObserver.observe(project));

// HANDLE FORM SUBMIT WITH NETLIFY FORMS

const form = document.querySelector("form");

let messageSentTimeoutFunction;

const handleSubmit = (e) => {
  e.preventDefault();

  let myForm = document.querySelector("form");
  let formData = new FormData(myForm);

  fetch(myForm.getAttribute("action"), {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      if (body.querySelector(".message-sent")) body.querySelector(".message-sent").remove();
      clearTimeout(messageSentTimeoutFunction);

      const messageSent = document.createElement("div");
      messageSent.classList.add("message-sent");
      messageSent.textContent = "Message Sent!";
      body.appendChild(messageSent);

      document.querySelectorAll('input').forEach(input => input.value = '');
      document.querySelector('textarea').value = '';

      messageSentTimeoutFunction = setTimeout(() => {
        if (body.querySelector(".message-sent")) body.querySelector(".message-sent").remove();
      }, 4000);
    })
    .catch((error) => alert(error));
};

form.addEventListener("submit", handleSubmit);
