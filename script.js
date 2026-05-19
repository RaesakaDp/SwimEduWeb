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