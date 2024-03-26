//https://codepen.io/Yulia-Verbylo/pen/NWmKPaX (creator of the code)

const wiperTrack = document.querySelector(".wiper-track");
const wipes = Array.from(wiperTrack.children);
const wipePrevBtn = document.querySelector(".wiper-button__right");
const wipeNextBtn = document.querySelector(".wiper-button__left");
const wipeWidth = wipes[0].getBoundingClientRect().width;

const arrowsBehaviour = (wipePrevBtn, wipeNextBtn, index) => {
  if (index === 0) {
    wipePrevBtn.classList.add("is-hidden");
    wipeNextBtn.classList.remove("is-hidden");
  } else if (index === wipes.length-1) {
    wipePrevBtn.classList.remove("is-hidden");
    wipeNextBtn.classList.add("is-hidden");
  } else {
    wipePrevBtn.classList.remove("is-hidden");
    wipeNextBtn.classList.remove("is-hidden");
  }
};

const wipeSlide = (wiperTrack, activeSlide, nextSlide, targetIndex) => {
  wiperTrack.style.transform =
    "translateX(-" + (wipeWidth + 24) * (targetIndex - 1) + "px)";
  activeSlide.classList.remove("active-swipe");
  nextSlide.classList.add("active-swipe");
};

wipeNextBtn.addEventListener("click", (e) => {
  const activeSlide = wiperTrack.querySelector(".active-swipe");
  const nextSlide = activeSlide.nextElementSibling;
  const targetIndex = wipes.findIndex((slide) => slide === nextSlide);
  wipeSlide(wiperTrack, activeSlide, nextSlide, targetIndex);
  arrowsBehaviour(wipePrevBtn, wipeNextBtn, targetIndex);
});
wipePrevBtn.addEventListener("click", (e) => {
  const activeSlide = wiperTrack.querySelector(".active-swipe");
  const nextSlide = activeSlide.previousElementSibling;
  const targetIndex = wipes.findIndex((slide) => slide === nextSlide);
  wipeSlide(wiperTrack, activeSlide, nextSlide, targetIndex);
  arrowsBehaviour(wipePrevBtn, wipeNextBtn, targetIndex);
});

// Fonction pour passer à la diapositive suivante
const goToNextSlide = () => {
  const activeSlide = wiperTrack.querySelector(".active-swipe");
  const nextSlide = activeSlide.nextElementSibling || wipes[0]; // Revenir à la première diapositive si la suivante n'existe pas
  const targetIndex = wipes.findIndex((slide) => slide === nextSlide);
  wipeSlide(wiperTrack, activeSlide, nextSlide, targetIndex);
  arrowsBehaviour(wipePrevBtn, wipeNextBtn, targetIndex);
};

// // Fonction pour démarrer le diaporama automatique ancienne fonction
// const startAutoSlider = () => {
//   setInterval(goToNextSlide, 4000); // Appel à goToNextSlide toutes les 4 secondes
// };

// Appeler la fonction pour démarrer le diaporama automatique

const startAutoSlider = () => {
  const secondWiperItem = wiperTrack.querySelector(".wiper-item:nth-child(2)"); // Sélectionne le deuxième élément avec la classe "wiper-item"
  secondWiperItem.classList.add("active-swipe"); // Ajoute la classe "active-swipe" au deuxième élément
  setInterval(goToNextSlide, 4000); // Appel à goToNextSlide toutes les 4 secondes
};

startAutoSlider();