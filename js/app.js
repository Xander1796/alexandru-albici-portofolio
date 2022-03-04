"use strict";

import { projectsTech } from "./projectsTech.js";

const body = document.querySelector("body");

const navLinks = document.querySelector(".nav-links");

const heroSectionAnimElement = document.querySelectorAll(
  ".hero-section-anim-element"
);
const menuButton = document.querySelector(".menu-button");
const goUpButton = document.querySelector(".go-up-button");

const allProjectsInfoBtn = document.querySelectorAll(
  ".featured-project-name-wrapper button"
);
const projectInfoTechWrapper = document.querySelector(
  ".featured-project-info-technologies div"
);
const featuredProjectInfoOverlay = document.querySelector(
  ".featured-project-info-overlay"
);

// SETTING A VARIABLE FOR THE VH UNIT

let vh;

window.addEventListener("DOMContentLoaded", function () {
  if (window.scrollY < 400) {
    goUpButton.classList.add("hidden");
  }
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
  anim.style.animation = `hero-section-anim .3s cubic-bezier(.61,.09,.54,.97) ${
    0.2 * i
  }s forwards`;
  anim.style.animationIterationCount = "1";
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    featuredProjectInfoOverlay.classList.contains("visible")
  ) {
    featuredProjectInfoOverlay.classList.remove("visible");
  }

  if (e.key === "Escape" && navLinks.classList.contains("nav-menu-open")) {
    navLinks.classList.remove("nav-menu-open");
    menuButton.classList.remove("open");
  }
});

//GO UP BUTTON

goUpButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    goUpButton.classList.remove("hidden");
  } else {
    goUpButton.classList.add("hidden");
  }
});

//NAV MENU

nav.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("menu-button") ||
    e.target.closest(".nav-link")
  ) {
    navLinks.classList.toggle("nav-menu-open");
    menuButton.classList.toggle("open");
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
      messageSent.classList.add("success");
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

//PROJECT INFORMATION MODAL

allProjectsInfoBtn.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    projectInfoTechWrapper.innerHTML = "";

    const targetedProjectName = e.target.closest(
      ".featured-project-name-wrapper"
    ).dataset.name;

    const projectIndex = projectsTech.findIndex(
      (item) => item.projectName === targetedProjectName
    );

    projectsTech[projectIndex].technologiesUsed.forEach((item) => {
      const tech = document.createElement("span");
      tech.classList.add("tech");
      tech.textContent = item;
      projectInfoTechWrapper.appendChild(tech);
    });

    featuredProjectInfoOverlay.classList.add("visible");
  })
);

featuredProjectInfoOverlay.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("close-modal") ||
    e.target.classList.contains("featured-project-info-overlay")
  ) {
    featuredProjectInfoOverlay.classList.remove("visible");
  }
});
