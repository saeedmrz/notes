import anime from "animejs/lib/anime.es.js";
import { noteSelects, notesBlock, cardInner } from "./constants";

const animateNote = (card) => {
  const cardRect = card.getBoundingClientRect();
  const notes: NodeListOf<HTMLElement> = document.querySelectorAll(".note");
  const noteRect = document.querySelector(".note")!.getBoundingClientRect();
  const tl = anime.timeline();

  tl.add({
    targets: card,
    duration: 1000,
    easing: "easeInOutSine",
    translateX: 155,
    translateY: (cardRect.top - noteRect.top) * -1,
  })
    .add(
      {
        targets: ".note",
        translateX: [0, noteRect.width + 50],
        duration: 2000,
        delay: 600,
      },
      "-=1000"
    )
    .add(
      {
        targets: card,
        borderRadius: 24,
        duration: 1000,
        width: 300,
        height: 310,
        scaleY: {
          value: [0, 1],
          duration: 2000,
        },
        complete: function () {
          card.className = "note";
          card.style.pointerEvents = "auto";
          noteSelects.forEach((el) => (el.style.pointerEvents = "auto"));
          card.innerHTML = cardInner;
          notes.forEach((nt) => {
            nt.classList.add("note-transform");
          });
          notesBlock.prepend(card);
          card.style.transform = "translate(0,0)";
        },
      },
      "-=1500"
    );
};

// Add new card using dots
export const animateDot = () => {
  noteSelects.forEach((el: HTMLElement) => {
    el.addEventListener("click", () => {
      noteSelects.forEach((el) => (el.style.pointerEvents = "none"));
      const notes: NodeListOf<HTMLElement> = document.querySelectorAll(".note");
      const dotRect = el.getBoundingClientRect();
      const elStyle = getComputedStyle(el);

      const newDot = document.createElement("div");
      newDot.style.width = `${dotRect.width}px`;
      newDot.style.height = `${dotRect.height}px`;
      newDot.style.background = elStyle.background;
      newDot.style.pointerEvents = "none";

      el.prepend(newDot);

      notes.forEach((nt) => {
        nt.classList.remove("note-transform");
      });

      animateNote(newDot);
    });
  });
};
