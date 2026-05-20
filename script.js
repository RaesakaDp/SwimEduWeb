// ========================================
// SWIMEDU MODERN SCRIPT FINAL VERSION
// CLEAN + SAFE + OPTIMIZED
// ========================================


// ========================================
// MODERN DARK MODE
// ========================================

const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {

  document.body.classList.toggle(
    "dark",
    theme === "dark"
  );

  if (themeToggle) {
    themeToggle.checked = theme === "dark";
  }

  localStorage.setItem("theme", theme);
}

// load saved theme
const savedTheme =
  localStorage.getItem("theme") || "light";

setTheme(savedTheme);

// toggle event
if (themeToggle) {

  themeToggle.addEventListener("change", () => {

    const newTheme =
      themeToggle.checked ? "dark" : "light";

    setTheme(newTheme);

  });

}


// ========================================
// MOBILE MENU TOGGLE
// ========================================

function toggleMenu(btn) {

  const navMenu =
    document.getElementById("nav-menu");

  if (!navMenu) return;

  navMenu.classList.toggle("active");

  if (btn) {
    btn.classList.toggle("active");
  }
}

// auto close mobile menu
document.querySelectorAll(".nav-link")
.forEach(link => {

  link.addEventListener("click", () => {

    document
      .getElementById("nav-menu")
      ?.classList.remove("active");

    document
      .querySelector(".menu-toggle")
      ?.classList.remove("active");

  });

});


// ========================================
// APPLE STYLE ACTIVE NAVIGATION
// ========================================

const navLinks =
  document.querySelectorAll(".nav-link");

const sections =
  document.querySelectorAll("section, header");

const indicator =
  document.querySelector(".nav-indicator");

// move indicator
function moveIndicator(link) {

  if (!indicator || !link) return;

  indicator.style.width =
    `${link.offsetWidth}px`;

  indicator.style.transform =
    `translateX(${link.offsetLeft}px)`;
}

// active link
function setActiveLink(id) {

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (
      link.getAttribute("href") === `#${id}`
    ) {

      link.classList.add("active");

      moveIndicator(link);
    }

  });

}

// intersection observer
const observer = new IntersectionObserver(

  entries => {

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

// observe all sections
sections.forEach(section => {

  if (section.id) {
    observer.observe(section);
  }

});

// initial load
window.addEventListener("load", () => {

  const activeLink =
    document.querySelector(".nav-link.active");

  if (activeLink) {
    moveIndicator(activeLink);
  }

});

// resize fix
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

}, { passive: true });


// ========================================
// REVEAL ANIMATION
// ========================================

const revealElements = document.querySelectorAll(
  ".card, .gallery-item, .video-card, .quiz-box, .materi-card"
);

const revealObserver = new IntersectionObserver(

  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

      }

    });

  },

  {
    threshold: 0.15
  }

);

revealElements.forEach(el => {
  revealObserver.observe(el);
});


// ========================================
// DUOLINGO QUIZ SYSTEM
// ========================================

let skor = 0;
let nomorSoal = 0;

const soalQuiz = [

  {
    pertanyaan:
      "Apa fungsi teknik pernapasan dalam renang gaya bebas?",

    jawaban: {
      a: "Menjaga ritme dan daya tahan",
      b: "Mempercepat lompatan",
      c: "Mengurangi gerakan kaki",
      d: "Membantu start"
    },

    benar: "a"
  },

  {
    pertanyaan:
      "Gerakan kaki pada gaya bebas disebut?",

    jawaban: {
      a: "Scissor kick",
      b: "Flutter kick",
      c: "Frog kick",
      d: "Butterfly kick"
    },

    benar: "b"
  },

  {
    pertanyaan:
      "Posisi tubuh saat gaya bebas sebaiknya?",

    jawaban: {
      a: "Vertikal",
      b: "Miring",
      c: "Horizontal",
      d: "Membungkuk"
    },

    benar: "c"
  },

  {
    pertanyaan:
      "Tujuan pemanasan sebelum berenang adalah?",

    jawaban: {
      a: "Membuat cepat lelah",
      b: "Mencegah cedera",
      c: "Mengurangi napas",
      d: "Memperlambat gerakan"
    },

    benar: "b"
  },

  {
    pertanyaan:
      "Alat bantu keselamatan saat belajar renang adalah?",

    jawaban: {
      a: "Pelampung",
      b: "Topi",
      c: "Sepatu",
      d: "Sarung tangan"
    },

    benar: "a"
  },

  {
    pertanyaan:
      "Pernapasan gaya bebas dilakukan ke arah?",

    jawaban: {
      a: "Bawah",
      b: "Depan",
      c: "Samping",
      d: "Atas"
    },

    benar: "c"
  },

  {
    pertanyaan:
      "Renang dapat meningkatkan?",

    jawaban: {
      a: "Kebugaran tubuh",
      b: "Rasa takut air",
      c: "Cedera",
      d: "Kemalasan"
    },

    benar: "a"
  },

  {
    pertanyaan:
      "Bagian tubuh utama untuk dorongan gaya bebas adalah?",

    jawaban: {
      a: "Kaki dan tangan",
      b: "Leher",
      c: "Pinggang",
      d: "Punggung"
    },

    benar: "a"
  },

  {
    pertanyaan:
      "Sikap kepala saat berenang gaya bebas adalah?",

    jawaban: {
      a: "Selalu ke atas",
      b: "Menghadap dasar kolam",
      c: "Menoleh belakang",
      d: "Miring penuh"
    },

    benar: "b"
  },

  {
    pertanyaan:
      "Manfaat latihan renang secara rutin adalah?",

    jawaban: {
      a: "Menurunkan stamina",
      b: "Membuat tubuh lemah",
      c: "Meningkatkan kesehatan jantung",
      d: "Mengurangi koordinasi"
    },

    benar: "c"
  }

];


// ========================================
// RENDER QUIZ
// ========================================

function renderQuiz() {

  const quizBox =
    document.querySelector(".quiz-box");

  if (!quizBox) return;

  // selesai
  if (nomorSoal >= soalQuiz.length) {

    quizBox.innerHTML = `

      <div class="quiz-finish">

        <h2>🎉 Quiz Selesai!</h2>

        <p>Skor akhir kamu</p>

        <div class="final-score">
          ${skor}
        </div>

        <button
          class="btn btn-primary"
          onclick="restartQuiz()">

          Ulangi Quiz

        </button>

      </div>

    `;

    return;
  }

  const q = soalQuiz[nomorSoal];

  const progress =
    (nomorSoal / soalQuiz.length) * 100;

  quizBox.innerHTML = `

    <div class="quiz-top">

      <div class="quiz-progress">

        <div
          class="quiz-progress-fill"
          style="width:${progress}%">

        </div>

      </div>

      <span class="quiz-counter">
        ${nomorSoal + 1}/${soalQuiz.length}
      </span>

    </div>

    <h2 class="quiz-question">
      ${q.pertanyaan}
    </h2>

    <div class="quiz-options">

      <button
        data-answer="a"
        onclick="checkAnswer('a')">

        ${q.jawaban.a}

      </button>

      <button
        data-answer="b"
        onclick="checkAnswer('b')">

        ${q.jawaban.b}

      </button>

      <button
        data-answer="c"
        onclick="checkAnswer('c')">

        ${q.jawaban.c}

      </button>

      <button
        data-answer="d"
        onclick="checkAnswer('d')">

        ${q.jawaban.d}

      </button>

    </div>

    <div class="quiz-score">
      ⭐ Skor : ${skor}
    </div>

  `;
}


// ========================================
// CHECK ANSWER
// ========================================

function checkAnswer(jawaban) {

  const benar =
    soalQuiz[nomorSoal].benar;

  const buttons =
    document.querySelectorAll(
      ".quiz-options button"
    );

  buttons.forEach(btn => {
    btn.disabled = true;
  });

  // benar
  if (jawaban === benar) {

    skor += 10;

  }

  // styling jawaban
  buttons.forEach(btn => {

    const answer =
      btn.dataset.answer;

    if (answer === benar) {

      btn.classList.add("correct");

    } else if (answer === jawaban) {

      btn.classList.add("wrong");

    }

  });

  // next question
  setTimeout(() => {

    nomorSoal++;

    renderQuiz();

  }, 1200);

}


// ========================================
// RESTART QUIZ
// ========================================

function restartQuiz() {

  nomorSoal = 0;
  skor = 0;

  renderQuiz();
}


// init quiz
if (document.querySelector(".quiz-box")) {
  renderQuiz();
}


// ========================================
// STOPWATCH
// ========================================

let detik = 0;
let menit = 0;
let interval = null;

function updateTimer() {

  const timerEl =
    document.getElementById("timer");

  if (!timerEl) return;

  detik++;

  if (detik === 60) {

    detik = 0;
    menit++;

  }

  timerEl.innerText =
    `${String(menit).padStart(2, "0")}:${String(detik).padStart(2, "0")}`;

}

function startTimer() {

  if (interval !== null) return;

  interval =
    setInterval(updateTimer, 1000);

}

function stopTimer() {

  clearInterval(interval);

  interval = null;
}

function resetTimer() {

  stopTimer();

  detik = 0;
  menit = 0;

  const timerEl =
    document.getElementById("timer");

  if (timerEl) {

    timerEl.innerText = "00:00";

  }

}


// ========================================
// PDF VIEWER
// ========================================

window.addEventListener("DOMContentLoaded", () => {

  // check pdfjs
  if (typeof pdfjsLib === "undefined") return;

  const url = "pdf/E-Book.pdf";

  const canvas =
    document.getElementById("pdf-render");

  if (!canvas) return;

  const ctx =
    canvas.getContext("2d");

  let pdfDoc = null;
  let pageNum = 1;
  let scale = 1.2;

  // render page
  function renderPage(num) {

    pdfDoc.getPage(num)
    .then(page => {

      const viewport =
        page.getViewport({ scale });

      canvas.height =
        viewport.height;

      canvas.width =
        viewport.width;

      page.render({

        canvasContext: ctx,
        viewport

      });

      document
        .getElementById("page-num")
        .innerText = num;

    });

  }

  // load pdf
  pdfjsLib
    .getDocument(url)
    .promise

    .then(pdf => {

      pdfDoc = pdf;

      document
        .getElementById("page-count")
        .innerText = pdf.numPages;

      renderPage(pageNum);

    });

  // prev
  window.prevPage = function () {

    if (!pdfDoc || pageNum <= 1) return;

    pageNum--;

    renderPage(pageNum);

  };

  // next
  window.nextPage = function () {

    if (
      !pdfDoc ||
      pageNum >= pdfDoc.numPages
    ) return;

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