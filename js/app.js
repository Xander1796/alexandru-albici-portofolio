"use strict";

import { projectsInfo } from "./projectsInfo.js";

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

const goUpFunction = () => {
  if (window.scrollY > 400 && window.innerWidth > 950) {
    goUpButton.classList.remove("hidden");
  } else {
    goUpButton.classList.add("hidden");
  }
};

window.addEventListener("DOMContentLoaded", function () {
  if (window.scrollY < 400) {
    goUpButton.classList.add("hidden");
  }
});

window.addEventListener("scroll", goUpFunction);
window.addEventListener("resize", goUpFunction);

heroSectionAnimElement.forEach((anim, i) => {
  anim.style.animation = `hero-section-anim .3s cubic-bezier(.61,.09,.54,.97) ${
    0.2 * i
  }s forwards`;
  anim.style.animationIterationCount = "1";
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("nav-menu-open")) {
    navLinks.classList.remove("nav-menu-open");
    menuButton.classList.remove("open");
  }
});

//GO UP BUTTON

goUpButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
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

const imgControls = document.querySelectorAll(
  ".featured-project-img-controls button"
);

imgControls.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    const targetedImgWrapper = btn.closest(".featured-project-img-wrapper");
    const targetedImgWrapperName = targetedImgWrapper.dataset.name;
    const targetedBtnIndex = btn.dataset.index;

    const projectIndex = projectsInfo.findIndex(
      (item) => item.projectName === targetedImgWrapperName
    );

    targetedImgWrapper.querySelector(".featured-project-img").src =
      projectsInfo[projectIndex].imgRoutes[targetedBtnIndex];
    targetedImgWrapper
      .querySelectorAll(".featured-project-img-controls button")
      .forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");
  });
});
