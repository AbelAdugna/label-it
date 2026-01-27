const screens = {
  start: document.getElementById("screen-start"),
  tutorial: document.getElementById("screen-tutorial"),
  levels: document.getElementById("screen-levels"),
  game: document.getElementById("screen-game"),
};

let currentScreen = "start";

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.add("hidden"));

  screens[name].classList.remove("hidden");
  currentScreen = name;
}

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
  audioControls.classList.remove("hidden"); 
  showScreen("tutorial");
  bgm?.play().catch(() => {});
});

const bgm = document.getElementById("bgm");
const audioControls = document.getElementById("audio-controls");

audioControls.addEventListener("click", () => {
    if (bgm.paused) {
      bgm.play().catch(() => {});
      audioControls.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    } else {
      bgm.pause();
      audioControls.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
});

const nextTutorialBtn = document.getElementById("next");
nextTutorialBtn.addEventListener("click", () => {
  showScreen("levels");
});

const backToTutorialBtn = document.getElementById("backToTutorialBtn");
backToTutorialBtn.addEventListener("click", () => {
  showScreen("tutorial");
});

const LEVELS = {
  1: {
    title: "Wood Plane",
    image: "Images/unlabeled-wood-plane.jpg",
    parts: [
      { id: "front-knob", label: "Front Knob", top: "42%", left: "20%" },
      { id: "handle", label: "Handle", top: "27%", left: "88%" },
      { id: "lever-cap", label: "Lever Cap", top: "15%", left: "49%" },
      { id: "blade", label: "Blade", top: "33%", left: "33%" },
      { id: "chip-breaker", label: "Chip Breaker", top: "31%", left: "46%" },
      { id: "sole", label: "Sole", top: "83%", left: "59%" },
      { id: "mouth", label: "Mouth", top: "86%", left: "14%" },
    ],
  },
  2: {
    title: "Nail Cutter",
    image: "Images/nail_cutter.jpg",
    parts: [
      { id: "front-knob", label: "Front Knob", top: "42%", left: "20%" },
      { id: "handle", label: "Handle", top: "27%", left: "88%" },
      { id: "lever-cap", label: "Lever Cap", top: "15%", left: "49%" },
      { id: "blade", label: "Blade", top: "33%", left: "33%" },
      { id: "chip-breaker", label: "Chip Breaker", top: "31%", left: "46%" },
      { id: "sole", label: "Sole", top: "83%", left: "59%" },
      { id: "mouth", label: "Mouth", top: "86%", left: "14%" },
    ],
  },
  3: {
    title: "Wood Plane",
    image: "Images/unlabeled-wood-plane.jpg",
    parts: [
      { id: "front-knob", label: "Front Knob", top: "42%", left: "20%" },
      { id: "handle", label: "Handle", top: "27%", left: "88%" },
      { id: "lever-cap", label: "Lever Cap", top: "15%", left: "49%" },
      { id: "blade", label: "Blade", top: "33%", left: "33%" },
      { id: "chip-breaker", label: "Chip Breaker", top: "31%", left: "46%" },
      { id: "sole", label: "Sole", top: "83%", left: "59%" },
      { id: "mouth", label: "Mouth", top: "86%", left: "14%" },
    ],
  },
  4: {
    title: "Nail Cutter",
    image: "Images/nail_cutter.jpg",
    parts: [
      { id: "front-knob", label: "Front Knob", top: "42%", left: "20%" },
      { id: "handle", label: "Handle", top: "27%", left: "88%" },
      { id: "lever-cap", label: "Lever Cap", top: "15%", left: "49%" },
      { id: "blade", label: "Blade", top: "33%", left: "33%" },
      { id: "chip-breaker", label: "Chip Breaker", top: "31%", left: "46%" },
      { id: "sole", label: "Sole", top: "83%", left: "59%" },
      { id: "mouth", label: "Mouth", top: "86%", left: "14%" },
    ],
  },
  5: {
    title: "Wood Plane",
    image: "Images/unlabeled-wood-plane.jpg",
    parts: [
      { id: "front-knob", label: "Front Knob", top: "42%", left: "20%" },
      { id: "handle", label: "Handle", top: "27%", left: "88%" },
      { id: "lever-cap", label: "Lever Cap", top: "15%", left: "49%" },
      { id: "blade", label: "Blade", top: "33%", left: "33%" },
      { id: "chip-breaker", label: "Chip Breaker", top: "31%", left: "46%" },
      { id: "sole", label: "Sole", top: "83%", left: "59%" },
      { id: "mouth", label: "Mouth", top: "86%", left: "14%" },
    ],
  },
  6: {
    title: "Nail Cutter",
    image: "Images/nail_cutter.jpg",
    parts: [
      { id: "front-knob", label: "Front Knob", top: "42%", left: "20%" },
      { id: "handle", label: "Handle", top: "27%", left: "88%" },
      { id: "lever-cap", label: "Lever Cap", top: "15%", left: "49%" },
      { id: "blade", label: "Blade", top: "33%", left: "33%" },
      { id: "chip-breaker", label: "Chip Breaker", top: "31%", left: "46%" },
      { id: "sole", label: "Sole", top: "83%", left: "59%" },
      { id: "mouth", label: "Mouth", top: "86%", left: "14%" },
    ],
  },
};

const labelsContainer = document.getElementById("labelsContainer");
const imageWrapper = document.getElementById("imageWrapper");
const scoreDisplay = document.getElementById("scoreDisplay");
const checkBtn = document.getElementById("checkBtn");
const resetBtn = document.getElementById("resetBtn");
const backBtn = document.getElementById("backBtn");
const levelBtns = document.querySelectorAll(".level-btn");
const nextLvlBtn = document.getElementById("nextLvlBtn");

let draggables = [];
let dropZones = [];
let placedAnswers = {};
let currentLevelId = Number(1);

function loadLevel(levelId) {
  currentLevelId = levelId;
  const level = LEVELS[levelId];
  if (!level) return;

  placedAnswers = {};
  scoreDisplay.textContent = "";

  imageWrapper.querySelector("img").src = level.image;
  document.getElementById("assembly-header").textContent = level.title;

  buildLabels(level);
  buildDropZones(level);

  addDragEvents();
  addDropZoneEvents();

  showScreen("game");
}

function buildLabels(level) {
  labelsContainer.innerHTML = "";

  level.parts.forEach((part) => {
    const p = document.createElement("p");
    p.className = "draggable hoverEffect";
    p.draggable = true;
    p.dataset.part = part.id;
    p.textContent = part.label;
    labelsContainer.appendChild(p);
  });
}

function buildDropZones(level) {
  imageWrapper.querySelectorAll(".drop-zone").forEach((z) => z.remove());

  level.parts.forEach((part) => {
    const zone = document.createElement("div");
    zone.className = "drop-zone";
    zone.dataset.part = part.id;
    zone.style.top = part.top;
    zone.style.left = part.left;
    imageWrapper.appendChild(zone);
  });
}

function addDragEvents() {
  draggables = document.querySelectorAll(".draggable");

  draggables.forEach((label) => {
    label.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", label.dataset.part);
    });
  });
}

function addDropZoneEvents() {
  dropZones = document.querySelectorAll(".drop-zone");

  dropZones.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("highlight");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("highlight");
    });

    zone.addEventListener("drop", (e) => {
      zone.classList.remove("highlight");

      const draggedPart = e.dataTransfer.getData("text/plain");
      const correctPart = zone.dataset.part;

      // Remove previous placement of this part
      for (let key in placedAnswers) {
        if (placedAnswers[key] === draggedPart) {
          delete placedAnswers[key];
          const oldZone = document.querySelector(
            `.drop-zone[data-part="${key}"]`
          );
          if (oldZone) {
            oldZone.textContent = "";
            oldZone.classList.remove("filled");
          }
        }
      }

      zone.textContent = draggedPart.replace("-", " ");
      zone.classList.add("filled");
      placedAnswers[correctPart] = draggedPart;
    });
  });
}

checkBtn.addEventListener("click", () => {
  let correctCount = 0;
  draggables.forEach((label) => {
    // checkBtn.disabled = true;
    label.draggable = false;
    label.classList.remove("hoverEffect");
    label.classList.add("greyed-out");
  });

  dropZones.forEach((zone) => {
    const correctPart = zone.dataset.part;
    const placedPart = placedAnswers[correctPart];

    zone.classList.remove("correct", "incorrect");

    if (!placedPart) {
      zone.classList.add("incorrect");
      return;
    }

    if (placedPart === correctPart) {
      zone.classList.add("correct");
      correctCount++;
    } else {
      zone.classList.add("incorrect");
    }
  });

  scoreDisplay.textContent = `Score: ${correctCount} / ${dropZones.length}`;

  if (correctCount === dropZones.length) {
    scoreDisplay.textContent += "\nWell done! You labeled all parts correctly.";
    if (LEVELS[currentLevelId + 1]) {
      nextLvlBtn.classList.remove("hidden");
    }
  } else {
    scoreDisplay.textContent += "\nSome labels are incorrect. Try again!";
  }
});

levelBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const levelId = Number(btn.dataset.level);
    loadLevel(levelId);
  });
});

resetBtn.addEventListener("click", () => {
  loadLevel(currentLevelId);
});

backBtn.addEventListener("click", () => {
  showScreen("levels");
});

nextLvlBtn.addEventListener("click", () => {
  const nextLevelId = currentLevelId + 1;
  if (LEVELS[nextLevelId]) {
    loadLevel(nextLevelId);
    nextLvlBtn.classList.add("hidden");
    levelBtns.forEach((btn) => {
      if (Number(btn.dataset.level) === nextLevelId) {
        btn.disabled = false;
      }
    });
  }
});
