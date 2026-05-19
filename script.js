javascript
// =========================
// DARK MODE
// =========================

function darkMode() {
  document.body.classList.toggle('dark');
}


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

const url = 'pdf/ebook-renang.pdf';

let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false,
    pageNumIsPending = null,
    scale = 1.3,
    canvas = document.querySelector('#pdf-render'),
    ctx = canvas.getContext('2d');

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

function prevPage() {

  if(pageNum <= 1) {
    return;
  }

  pageNum--;
  queueRenderPage(pageNum);
}

function nextPage() {

  if(pageNum >= pdfDoc.numPages) {
    return;
  }

  pageNum++;
  queueRenderPage(pageNum);
}

function zoomIn() {
  scale += 0.2;
  renderPage(pageNum);
}

function zoomOut() {

  if(scale <= 0.6) return;

  scale -= 0.2;
  renderPage(pageNum);
}
