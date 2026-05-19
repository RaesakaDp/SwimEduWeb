// ========================================
// SWIMEDU MODERN SCRIPT CLEAN VERSION
// ========================================


// ========================================
// MODERN DARK MODE
// ========================================

const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");

  if (themeToggle) {
    themeToggle.checked = theme === "dark";
  }

  localStorage.setItem("theme", theme);
}

// load saved theme
const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

// toggle theme
if (themeToggle) {
  themeToggle.addEventListener("change", () => {
    const newTheme = themeToggle.checked ? "dark" : "light";
    setTheme(newTheme);
  });
}


// ========================================
// MOBILE MENU TOGGLE
// ========================================

function toggleMenu(btn) {

  const navMenu = document.getElementById("nav-menu");

  navMenu.classList.toggle("active");

  if (btn) {
    btn.classList.toggle("active");
  }
}

// auto close mobile menu
document.querySelectorAll(".nav-link").forEach(link => {

  link.addEventListener("click", () => {

    document.getElementById("nav-menu")
      .classList.remove("active");

    document.querySelector(".menu-toggle")
      ?.classList.remove("active");
  });

});


// ========================================
// APPLE STYLE ACTIVE NAVIGATION
// ========================================

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section, header");
const indicator = document.querySelector(".nav-indicator");

// move underline indicator
function moveIndicator(link) {

  if (!indicator || !link) return;

  indicator.style.width = `${link.offsetWidth}px`;

  indicator.style.transform =
    `translateX(${link.offsetLeft}px)`;
}

// active link system
function setActiveLink(id) {

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href") === `#${id}`) {

      link.classList.add("active");

      moveIndicator(link);
    }
  });
}

// smooth observer
const observer = new IntersectionObserver(

  (entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        setActiveLink(entry.target.id);
      }
    });

  },

  {
    threshold: 0.55
  }
);

// observe sections
sections.forEach(section => {

  if (section.id) {
    observer.observe(section);
  }

});

// first load
window.addEventListener("load", () => {

  const activeLink =
    document.querySelector(".nav-link.active");

  if (activeLink) {
    moveIndicator(activeLink);
  }

});

// responsive resize
window.addEventListener("resize", () => {

  const activeLink =
    document.querySelector(".nav-link.active");

  if (activeLink) {
    moveIndicator(activeLink);
  }

});


// ========================================
// SCROLL PROGRESS BAR
// ========================================

window.addEventListener("scroll", () => {

  const progress =
    document.getElementById("scroll-progress");

  if (!progress) return;

  const scrollTop =
    document.documentElement.scrollTop;

  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const percent =
    (scrollTop / scrollHeight) * 100;

  progress.style.width = percent + "%";
});


// ========================================
// QUIZ SYSTEM
// ========================================

let skor = 0;
let nomorSoal = 0;

const soalQuiz = [

  {
    pertanyaan:
      "Apa fungsi teknik pernapasan dalam renang gaya bebas?",

    jawaban: {
      a: "Menjaga ritme dan daya tahan berenang",
      b: "Mempercepat lompatan",
      c: "Mengurangi gerakan kaki",
      d: "Mempermudah start"
    },

    benar: "a"
  },

  {
    pertanyaan:
      "Gerakan kaki pada gaya bebas disebut?",

    jawaban: {
      a: "Scissor kick",
      b: "Flutter kick",
      c: "Butterfly kick",
      d: "Frog kick"
    },

    benar: "b"
  },

  {
    pertanyaan:
      "Apa tujuan pemanasan sebelum berenang?",

    jawaban: {
      a: "Melemaskan otot",
      b: "Mengurangi fokus",
      c: "Menghindari cedera",
      d: "Mempercepat lelah"
    },

    benar: "c"
  }

];

// render soal
function renderQuiz() {

  const q = soalQuiz[nomorSoal];

  document.getElementById("question")
    .innerText = q.pertanyaan;

  const buttons =
    document.querySelectorAll(".quiz-option");

  ["a", "b", "c", "d"].forEach((opt, i) => {

    if (buttons[i]) {
      buttons[i].innerText = q.jawaban[opt];
    }

  });
}

// =========================
// QUIZ BUTTON FIX
// GANTI FUNCTION checkAnswer
// =========================

function checkAnswer(jawaban) {

  const buttons = document.querySelectorAll(".quiz-box button");

  buttons.forEach(btn => {
    btn.disabled = true;
  });

  if (jawaban === soalQuiz[nomorSoal].benar) {
    skor += 10;
  }

  document.getElementById("score").innerText =
    "Skor : " + skor;

  setTimeout(() => {

    nomorSoal++;

    if (nomorSoal < soalQuiz.length) {

      renderQuiz();

      buttons.forEach(btn => {
        btn.disabled = false;
      });

    } else {

      document.getElementById("question").innerText =
        "Quiz Selesai 🎉";
    }

  }, 700);
}

// auto render first question
window.addEventListener("DOMContentLoaded", () => {

  if (document.getElementById("question")) {
    renderQuiz();
  }

});


// ========================================
// STOPWATCH
// ========================================

let detik = 0;
let menit = 0;
let interval = null;

function updateTimer() {

  detik++;

  if (detik === 60) {

    detik = 0;
    menit++;

  }

  document.getElementById("timer").innerText =
    `${String(menit).padStart(2, "0")}:${String(detik).padStart(2, "0")}`;
}

function startTimer() {

  if (interval !== null) return;

  interval = setInterval(updateTimer, 1000);
}

function stopTimer() {

  clearInterval(interval);

  interval = null;
}

function resetTimer() {

  stopTimer();

  detik = 0;
  menit = 0;

  document.getElementById("timer")
    .innerText = "00:00";
}


// ========================================
// PDF VIEWER
// ========================================

window.addEventListener("DOMContentLoaded", () => {

  const url = "pdf/E-Book.pdf";

  const canvas =
    document.getElementById("pdf-render");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let pdfDoc = null;
  let pageNum = 1;
  let scale = 1.2;

  function renderPage(num) {

    pdfDoc.getPage(num).then(page => {

      const viewport =
        page.getViewport({ scale });

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      page.render({
        canvasContext: ctx,
        viewport
      });

      document.getElementById("page-num")
        .innerText = num;
    });

  }

  pdfjsLib.getDocument(url).promise.then(pdf => {

    pdfDoc = pdf;

    document.getElementById("page-count")
      .innerText = pdf.numPages;

    renderPage(pageNum);

  });

  // prev page
  window.prevPage = function () {

    if (pageNum <= 1) return;

    pageNum--;

    renderPage(pageNum);
  };

  // next page
  window.nextPage = function () {

    if (pageNum >= pdfDoc.numPages) return;

    pageNum++;

    renderPage(pageNum);
  };

  // zoom in
  window.zoomIn = function () {

    scale += 0.2;

    renderPage(pageNum);
  };

  // zoom out
  window.zoomOut = function () {

    if (scale <= 0.6) return;

    scale -= 0.2;

    renderPage(pageNum);
  };

});