/* ======================================================
   Label-IT — Main Game Logic
   ------------------------------------------------------
   This file controls:
   - Screen navigation (start, tutorial, levels, game)
   - Level loading and setup
   - Drag and drop logic
   - Scoring and progression
   ====================================================== */


/* ============================================================================
   SCREEN MANAGEMENT
   Handles which part of the UI is currently visible to the player.
============================================================================ */

const screens = {
  start: document.getElementById("screen-start"),
  tutorial: document.getElementById("screen-tutorial"),
  levels: document.getElementById("screen-levels"),
  game: document.getElementById("screen-game"),
};

let currentScreen = "start";

/**
 * Shows one screen and hides all others.
 */
function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.add("hidden"));
  screens[name].classList.remove("hidden");
  currentScreen = name;
}


/* ============================================================================
   AUDIO + START BUTTON FLOW
============================================================================ */

const startBtn = document.getElementById("startBtn");
const bgm = document.getElementById("bgm");
const audioControls = document.getElementById("audio-controls");

/**
 * Begins tutorial, enables audio button, and plays music.
 */
startBtn.addEventListener("click", () => {
  audioControls.classList.remove("hidden");
  showScreen("tutorial");
  bgm?.play().catch(() => {});
});

/**
 * Toggles background music on/off and updates icon.
 */
audioControls.addEventListener("click", () => {
  if (bgm.paused) {
    bgm.play().catch(() => {});
    audioControls.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  } else {
    bgm.pause();
    audioControls.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  }
});

/** Moves from tutorial → level selection */
document.getElementById("next").addEventListener("click", () => {
  showScreen("levels");
});

/** Returns from level select → tutorial */
document.getElementById("backToTutorialBtn").addEventListener("click", () => {
  showScreen("tutorial");
});


/* ============================================================================
   LEVEL DATA
   Defines each level’s title, image, and label positions.
   All values remain explicit as originally authored.
============================================================================ */

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


/* ============================================================================
   DOM REFERENCES
============================================================================ */

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
let currentLevelId = 1;


/* ============================================================================
   LEVEL INITIALIZATION
   Builds labels, places drop zones, and resets progress.
============================================================================ */

/**
 * Loads a level by ID and prepares all UI components.
 */
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

/** Builds the draggable label elements for the current level. */
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

/** Places the drop zones for a level based on configured coordinates. */
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


/* ============================================================================
   DRAG + DROP INTERACTIONS
============================================================================ */

/** Enables dragging behavior for draggable labels. */
function addDragEvents() {
  draggables = document.querySelectorAll(".draggable");

  draggables.forEach((label) => {
    label.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", label.dataset.part);
    });
  });
}

/** Enables drop-zone highlighting, placement logic, and state tracking. */
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

      // Remove previous placement of this part (prevent duplicates)
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

      // Apply new placement
      zone.textContent = draggedPart.replace("-", " ");
      zone.classList.add("filled");
      placedAnswers[correctPart] = draggedPart;
    });
  });
}


/* ============================================================================
   SCORING + ANSWER VALIDATION
============================================================================ */

/**
 * Evaluates player answers, locks labels, displays score,
 * and reveals "Next Level" if fully correct.
 */
checkBtn.addEventListener("click", () => {
  let correctCount = 0;

  // Disable labels after scoring
  draggables.forEach((label) => {
    label.draggable = false;
    label.classList.remove("hoverEffect");
    label.classList.add("greyed-out");
  });

  // Evaluate each drop zone
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

  // Score summary
  scoreDisplay.textContent = `Score: ${correctCount} / ${dropZones.length}`;

  if (correctCount === dropZones.length) {
    scoreDisplay.textContent +=
      "\nWell done! You labeled all parts correctly.";

    // Unlock next level if available
    if (LEVELS[currentLevelId + 1]) {
      nextLvlBtn.classList.remove("hidden");
    }
  } else {
    scoreDisplay.textContent +=
      "\nSome labels are incorrect. Try again!";
  }
});


/* ============================================================================
   NAVIGATION + LEVEL PROGRESSION
============================================================================ */

/** Allows player to choose a level from the level-select screen. */
levelBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const levelId = Number(btn.dataset.level);
    loadLevel(levelId);
  });
});

/** Resets and reloads the current level. */
resetBtn.addEventListener("click", () => {
  loadLevel(currentLevelId);
});

/** Returns to level selection. */
backBtn.addEventListener("click", () => {
  showScreen("levels");
});

/** Loads next unlocked level and enables its button in UI. */
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
