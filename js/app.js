"use strict";

const body = document.querySelector("body");
const copyButton = document.querySelectorAll(".copy-button");

const nav = document.querySelector("nav");
const navLinks = document.querySelector(".nav-links");

const heroSectionAnimElement = document.querySelectorAll(
  ".hero-section-anim-element"
);
const menuButton = document.querySelector(".menu-button");
const closeMenuButton = document.querySelector(".close-menu-button");
const projectsLinks = document.querySelectorAll(".hover-external-link");
const heroSection = document.querySelector(".hero-section");
const featuredProject = document.querySelectorAll(".featured-project");
const featuredProjectName = document.querySelectorAll(".featured-project-name");

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
