javascript
// =========================
// DARK MODE
// =========================

function darkMode() {
  document.body.classList.toggle('dark');
}

function toggleMenu() {
  document.getElementById("nav-menu").classList.toggle("active");
}

// =========================
// NAVBAR MOBILE TOGGLE
// =========================

function toggleMenu() {
  document.getElementById("nav-menu").classList.toggle("active");
}


// auto close ketika klik menu (mobile UX)
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("nav-menu").classList.remove("active");
  });
});

// =========================
// ANIMATED MENU TOGGLE
// =========================

function toggleMenu(btn) {
  document.getElementById("nav-menu").classList.toggle("active");
  btn.classList.toggle("active");
}

// auto close menu + reset icon
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("nav-menu").classList.remove("active");

    const btn = document.querySelector(".menu-toggle");
    if (btn) btn.classList.remove("active");
  });
});

// =========================
// SCROLL PROGRESS BAR
// =========================

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollTop / scrollHeight) * 100;

  document.getElementById("scroll-progress").style.width = scrolled + "%";
});


// =========================
// ACTIVE MENU SCROLL
// =========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;

    if (pageYOffset >= sectionTop - 80) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

});


// =========================
// QUIZ INTERAKTIF
// =========================

let skor = 0;

const soalQuiz = [
  {
    pertanyaan: 'Apa fungsi teknik pernapasan dalam renang gaya bebas?',
    benar: 'a'
  },
  {
    pertanyaan: 'Gerakan kaki pada gaya bebas disebut?',
    benar: 'b'
  },
  {
    pertanyaan: 'Apa tujuan pemanasan sebelum berenang?',
    benar: 'c'
  }
];

let nomorSoal = 0;

function checkAnswer(jawaban) {

  if (jawaban === soalQuiz[nomorSoal].benar) {

    skor += 10;

    alert('Jawaban Benar 🎉');

  } else {

    alert('Jawaban Salah 😅');
  }

  document.getElementById('score').innerHTML =
    'Skor : ' + skor;

  nomorSoal++;

  if (nomorSoal < soalQuiz.length) {

    document.getElementById('question').innerHTML =
      soalQuiz[nomorSoal].pertanyaan;

  } else {

    document.getElementById('question').innerHTML =
      'Quiz Selesai 🎉';
  }
}


// =========================
// POPUP MATERI
// =========================

function showMateri(materi) {
  alert('Anda membuka materi: ' + materi);
}


// =========================
// STOPWATCH
// =========================

let detik = 0;
let menit = 0;
let interval;

function updateTimer() {

  detik++;

  if (detik == 60) {
    detik = 0;
    menit++;
  }

  let formatMenit = menit < 10 ? '0' + menit : menit;
  let formatDetik = detik < 10 ? '0' + detik : detik;

  document.getElementById('timer').innerHTML =
    formatMenit + ':' + formatDetik;
}

function startTimer() {
  interval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

function resetTimer() {

  clearInterval(interval);

  detik = 0;
  menit = 0;

  document.getElementById('timer').innerHTML = '00:00';
}

// =========================
// PDF VIEWER MODERN
// =========================

window.addEventListener("DOMContentLoaded", () => {

  const url = 'pdf/ebook-renang.pdf';

  let pdfDoc = null,
      pageNum = 1,
      pageIsRendering = false,
      pageNumIsPending = null,
      scale = 1.3;

  const canvas = document.querySelector('#pdf-render');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const renderPage = num => {

    pageIsRendering = true;

    pdfDoc.getPage(num).then(page => {

      const viewport = page.getViewport({ scale });

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderCtx = {
        canvasContext: ctx,
        viewport
      };

      page.render(renderCtx).promise.then(() => {

        pageIsRendering = false;

        if(pageNumIsPending !== null) {
          renderPage(pageNumIsPending);
          pageNumIsPending = null;
        }
      });

      document.querySelector('#page-num').textContent = num;
    });
  };

  const queueRenderPage = num => {

    if(pageIsRendering) {
      pageNumIsPending = num;
    } else {
      renderPage(num);
    }
  };

  window.prevPage = function() {

    if(pageNum <= 1) return;

    pageNum--;
    queueRenderPage(pageNum);
  }

  window.nextPage = function() {

    if(pageNum >= pdfDoc.numPages) return;

    pageNum++;
    queueRenderPage(pageNum);
  }

  window.zoomIn = function() {

    scale += 0.2;
    renderPage(pageNum);
  }

  window.zoomOut = function() {

    if(scale <= 0.6) return;

    scale -= 0.2;
    renderPage(pageNum);
  }

  pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {

    pdfDoc = pdfDoc_;

    document.querySelector('#page-count').textContent =
      pdfDoc.numPages;

    renderPage(pageNum);
  });

});