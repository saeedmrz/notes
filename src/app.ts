import { interpret } from "xstate";
import { toggleMachine } from "./scripts/state";

// Anime
import anime from "animejs/lib/anime.es.js";

// Variables
const button: HTMLElement = document.querySelector("#addNote");
const noteSelects: NodeListOf<HTMLElement> = document.querySelectorAll(".selector");
const notesBlock: HTMLElement = document.querySelector(".notes");


const toggleService = interpret(toggleMachine);

const toggle = () => {
  button.addEventListener("click", () => {
    toggleService.send("TOGGLE");
  });
};

const buttonDisabled = (btnStatus: boolean) => {
  if (btnStatus) {
    button.setAttribute("disabled", "");
  } else {
    button.removeAttribute("disabled");
  }
};

const animate = (status: any) => {
  const tl = anime.timeline();
  if (status === "active") {
    buttonDisabled(true);
    tl.add({
      targets: button,
      translateY: [0, -12, 0],
      scale: [1, 0.85, 1],
      rotate: 316,
      duration: 600,
      easing: "easeInOutSine",
    })
      .add(
        {
          targets: ".note-selectors .first",
          translateY: [0, 80],
          duration: 3200,
          scaleY: [1.8, 1],
        },
        "-=400"
      )
      .add(
        {
          targets: ".note-selectors .other",
          translateY: function (el) {
            return [el.getAttribute("data-from"), el.getAttribute("data-to")];
          },
          scaleY: [0, 1],
          duration: 1600,
          opacity: {
            value: 1,
            duration: 10,
          },
          delay: anime.stagger(240),
          complete: function () {
            buttonDisabled(false);
          },
        },
        "-=2600"
      );
  } else if (status === "inactive") {
    buttonDisabled(true);
    tl.add({
      targets: button,
      rotate: 0,
      duration: 600,
      easing: "easeInOutSine",
    }).add(
      {
        targets: ".note-selectors .selector",
        translateY: function (el) {
          return [el.getAttribute("data-to"), 0];
        },
        duration: 400,
        delay: anime.stagger(60),
        easing: "easeInOutSine",
        complete: function () {
          buttonDisabled(false);
        },
      },
      "-=400"
    );
  }
};

const init = () => {
  toggleService
    .onTransition((state) => {
      console.log(state.value);
      animate(state.value);
    })
    .start();
  toggle();
};

init();

const cardInner = `
            <textarea
              type="text"
              placeholder="The beginning of screenless design: UI jobs to be take over by Solution Architect"
            ></textarea>
            <div class="footer">
              <div class="date">
                <span>May 21, 2020</span>
              </div>
              <div class="edit">
                <button>
                <i class="fas fa-edit"></i>
                </button>
              </div>
            </div>   
          
`;



const animateNote = (card) => {
  const cardRect = card.getBoundingClientRect();
  const notes: NodeListOf<HTMLElement> = document.querySelectorAll(".note");
  const noteRect = document.querySelector('.note').getBoundingClientRect();
  const tl = anime.timeline();

  tl.add({
    targets: card,
    duration: 1000,
    easing: "easeInOutSine",
    translateX: 155,
    translateY: (cardRect.top - noteRect.top) * -1,
  }).add({
    targets: '.note',
    translateX: [0,noteRect.width+50],
    duration: 2000,
    delay: 600,
  }, "-=1000")
  .add({
    targets: card,
    borderRadius: 24,
    duration: 1000,
    width:  300,
    height: 310,
    scaleY: {
      value: [0,1],
      duration: 2000,
    },
    complete: function () {
      card.className = "note";
      card.innerHTML = cardInner;
      notes.forEach(nt=> {
      nt.classList.add('note-transform');
    })
     notesBlock.prepend(card);
     card.style.transform = "translate(0,0)";
     
    },
  },"-=1500")
};


noteSelects.forEach((el: HTMLElement) => {
  el.addEventListener("click", () => {
    // notesBlock.insertAdjacentHTML("afterbegin", cardInner);
    const notes: NodeListOf<HTMLElement> = document.querySelectorAll(".note");
    const dotRect = el.getBoundingClientRect();
    const elStyle = getComputedStyle(el);
    const newCard = document.createElement("div");
    newCard.className = "note";

    const newDot = document.createElement("div");
    newDot.style.width = `${dotRect.width}px`;
    newDot.style.height = `${dotRect.height}px`;
    newDot.style.background = elStyle.background;

    el.prepend(newDot);

    notes
    .forEach(nt=> {
      nt.classList.remove('note-transform');
    })
    
    animateNote(newDot);
   
  });
});
