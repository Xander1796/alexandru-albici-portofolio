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

let heroSectionObserverCallback = function (entries) {
  let [entry] = entries;
  if (entry.intersectionRatio > 0) {
    heroSection.classList.remove("hero-section-margin");
    nav.classList.remove("nav-fixed");
    nav.classList.remove("theme-dark-nav-fixed");
  } else {
    heroSection.classList.add("hero-section-margin");

    nav.classList.add("nav-fixed");
    if (
      entry.isIntersecting === false &&
      !nav.classList.contains("theme-white-nav-fixed")
    ) {
      nav.classList.remove("theme-white-nav-fixed");
      nav.classList.add("theme-dark-nav-fixed");
    }
  }
};

const observeHeroSection = new IntersectionObserver(
  heroSectionObserverCallback,
  {
    root: null,
    threshold: 0,
  }
);

observeHeroSection.observe(heroSection);

const observeProjectSection = new IntersectionObserver(
  (entries) => {
    let [entry] = entries;

    if (entry.intersectionRatio === 0 && entry.isIntersecting === false) {
      nav.classList.add("theme-white-nav-fixed");
      nav.classList.remove("theme-dark-nav-fixed");
    } else if (
      entry.isIntersecting === true &&
      nav.classList.contains("nav-fixed")
    ) {
      nav.classList.add("theme-dark-nav-fixed");
      nav.classList.remove("theme-white-nav-fixed");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "80px",
  }
);

observeProjectSection.observe(document.querySelector(".projects-section"));

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
      if (body.querySelector(".message-sent"))
        body.querySelector(".message-sent").remove();
      clearTimeout(messageSentTimeoutFunction);

      const messageSent = document.createElement("div");
      messageSent.classList.add("message-sent");
      messageSent.textContent = "Message Sent!";
      body.appendChild(messageSent);

      document.querySelectorAll("input").forEach((input) => (input.value = ""));
      document.querySelector("textarea").value = "";

      messageSentTimeoutFunction = setTimeout(() => {
        if (body.querySelector(".message-sent"))
          body.querySelector(".message-sent").remove();
      }, 4000);
    })
    .catch((error) => alert(error));
};

form.addEventListener("submit", handleSubmit);
